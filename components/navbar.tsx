"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { CvDownload } from "@/components/cv-controls"
import { ThemeToggle } from "@/components/theme-toggle"
import { profile } from "@/data/content"
import { cn } from "@/lib/utils"

const links = [
  { href: "#about", label: "about" },
  { href: "#projects", label: "projects" },
  { href: "#stack", label: "stack" },
  { href: "#contact", label: "contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        open
          ? "border-border bg-bg/95 backdrop-blur-md"
          : scrolled
            ? "border-border bg-bg/80 backdrop-blur-md"
            : "border-transparent",
      )}
    >
      {/* Three columns on desktop so the links sit in the true centre of the bar */}
      <nav className="mx-auto flex h-16 max-w-[1680px] items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-12">
        <a href="#top" className="font-mono text-base sm:text-lg">
          <span className="font-semibold text-accent">{profile.handle}@wajid</span>
          <span className="text-muted">:~$</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-mono text-base text-muted transition hover:text-fg">
              <span className="text-accent/70">./</span>
              {l.label}
            </a>
          ))}
          <CvDownload compact />
        </div>

        <div className="flex items-center justify-end gap-4">
          {/* Markdown/code-style status flag */}
          <span className="hidden items-center gap-2 font-mono text-sm xl:inline-flex" aria-label="Available for work">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="text-muted">
              .available_for_work <span className="text-fg">==</span>
            </span>
            <span className="font-semibold text-accent">true</span>
          </span>

          {/* One instance for all breakpoints so its state never goes stale */}
          <ThemeToggle />

          <button
            type="button"
            className="-mr-2 p-2 text-muted hover:text-fg lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2.5 font-mono text-base text-muted hover:bg-surface hover:text-fg"
                >
                  <span className="text-accent/70">./</span>
                  {l.label}
                </a>
              ))}
              <p className="mt-2 px-2 font-mono text-sm text-muted">
                .available_for_work <span className="text-fg">==</span>{" "}
                <span className="font-semibold text-accent">true</span>
              </p>
              <CvDownload className="mt-3 self-start" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
