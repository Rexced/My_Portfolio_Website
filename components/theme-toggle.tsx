"use client"

import { useEffect, useId, useState } from "react"
import { flushSync } from "react-dom"
import { AnimatePresence, motion, useAnimationControls } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

type Theme = "light" | "dark"

// Track inner size 70×34 (h-9 w-[4.5rem] minus border); knob 28px with a 3px inset
const TRAVEL = 36
const knobSpring = { type: "spring", stiffness: 420, damping: 24, mass: 0.9 } as const
// The trailing blob lags behind, so the goo filter stretches a liquid bridge between them
const trailSpring = { type: "spring", stiffness: 170, damping: 20, mass: 1 } as const

/**
 * Knob sits left for dark, right for light. Switching wipes the new theme across
 * the page in the same direction the knob travels (View Transitions API; browsers
 * without it, or reduced motion, just switch instantly).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light")
  // False until the saved theme is synced, so the knob snaps into place instead of animating on load
  const [ready, setReady] = useState(false)
  const squash = useAnimationControls()
  const gooId = `goo-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light")
    const raf = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!reduce) {
      // Squash and stretch like a droplet being pulled
      squash.start({
        scaleX: [1, 1.5, 0.88, 1.06, 1],
        scaleY: [1, 0.76, 1.1, 0.97, 1],
        transition: { duration: 0.65, times: [0, 0.3, 0.6, 0.82, 1], ease: "easeInOut" },
      })
    }

    const apply = () => {
      document.documentElement.dataset.theme = next
      try {
        localStorage.setItem("theme", next)
      } catch {
        // Storage blocked: the switch still works for this visit
      }
      setTheme(next)
    }

    if (!document.startViewTransition || reduce) {
      apply()
      return
    }

    const transition = document.startViewTransition(() => flushSync(apply))
    transition.ready
      .then(() => {
        // dark → light travels left to right; light → dark comes back right to left
        const toLight = next === "light"
        document.documentElement.animate(
          { clipPath: [toLight ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", "inset(0 0 0 0)"] },
          { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
        )
      })
      // The browser skips the animation (e.g. tab hidden); the theme has still been applied
      .catch(() => {})
  }

  const light = theme === "light"
  const x = light ? TRAVEL : 0
  const instant = { duration: 0 }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggle}
      className={cn(
        // Own view-transition layer so the knob animates live above the page wipe
        "theme-toggle relative h-9 w-[4.5rem] shrink-0 rounded-full border border-border-strong bg-surface-2 transition-colors",
        className,
      )}
    >
      <svg className="absolute size-0" aria-hidden>
        <defs>
          <filter id={gooId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Faint icons in the track show where the knob will go */}
      <Moon className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted" aria-hidden />
      <Sun className="absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-muted" aria-hidden />

      {/* Goo layer: knob + lagging droplet merge through the filter */}
      <span className={cn("absolute inset-0", !ready && "opacity-0")} style={{ filter: `url(#${gooId})` }} aria-hidden>
        <motion.span
          className="absolute top-[7px] left-[7px] size-5 rounded-full bg-accent"
          initial={false}
          animate={{ x }}
          transition={ready ? trailSpring : instant}
        />
        <motion.span
          className="absolute top-[3px] left-[3px] size-7"
          initial={false}
          animate={{ x }}
          transition={ready ? knobSpring : instant}
        >
          <motion.span
            animate={squash}
            className="block size-full rounded-full bg-accent"
          />
        </motion.span>
      </span>

      {/* Icon rides on top of the knob, outside the filter so it stays crisp */}
      <motion.span
        className={cn(
          "pointer-events-none absolute top-[3px] left-[3px] flex size-7 items-center justify-center text-bg",
          !ready && "opacity-0",
        )}
        initial={false}
        animate={{ x }}
        transition={ready ? knobSpring : instant}
        aria-hidden
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -120, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 120, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {light ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  )
}
