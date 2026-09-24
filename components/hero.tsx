"use client"

import { useEffect, useState, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { CvDownload, RegionToggle } from "@/components/cv-controls"
import { useRegion } from "@/components/region-provider"
import { education, experience, profile, projects } from "@/data/content"
import { REGION_INFO } from "@/lib/region"

const ease = [0.16, 1, 0.3, 1] as const
const GLYPHS = "!<>-_\\/[]{}=+*^?#01"

/** "Decrypts" the text left to right. SSR and reduced motion get the plain text. */
function ScrambleText({ text, duration = 1100 }: { text: string; duration?: number }) {
  const reduce = useReducedMotion()
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (reduce) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const revealed = Math.floor(p * text.length)
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " || i < revealed ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      )
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, duration, reduce])

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{out}</span>
    </>
  )
}

type Step = { cmd: string; out: ReactNode }

const LOGO = String.raw`
    .-------.
   /  .---.  \
   | |     | |
 .-'-'-----'-'-.
 |   [ S W ]   |
 |     _|_     |
 |    |___|    |
 '-------------'`.slice(1)

function useTerminalScript(): Step[] {
  const { region } = useRegion()
  const info: [string, string][] = [
    ["Role", profile.role],
    ["Degree", `BS CS · IBA Karachi · ${education.date.slice(-4)}`],
    ["Exp", `InfoSec Intern @ ${experience[0].org}`],
    ["Cloud", "Azure · AWS · Oracle Cloud"],
    ["Security", "Wazuh · STIX/TAXII · ATT&CK"],
    ["Stack", "Python · FastAPI · Docker · n8n"],
    ["Status", REGION_INFO[region].availability],
  ]

  return [
    { cmd: "whoami", out: <span>{profile.name.toLowerCase()}</span> },
    {
      cmd: "neofetch",
      out: (
        <span className="flex gap-5">
          <span className="hidden whitespace-pre text-accent sm:block">{LOGO}</span>
          <span className="min-w-0 flex-1">
            <span className="block text-accent">
              saim<span className="text-muted">@</span>wajid
            </span>
            <span className="block text-muted">──────────</span>
            {info.map(([k, v]) => (
              <span key={k} className="grid grid-cols-[5rem_1fr] sm:grid-cols-[5.25rem_1fr]">
                <span className="text-accent-2">{k}:</span>
                <span>{v}</span>
              </span>
            ))}
          </span>
        </span>
      ),
    },
    {
      cmd: "ls ~/projects",
      out: (
        <span className="flex flex-wrap gap-x-5">
          {projects.map((p) => (
            <a key={p.slug} href={`#${p.slug}`} className="text-accent-2 underline-offset-4 hover:underline">
              {p.slug}/
            </a>
          ))}
        </span>
      ),
    },
  ]
}

function Terminal() {
  const steps = useTerminalScript()
  const reduce = useReducedMotion()
  // Progress through the script: which command, and how many of its characters are typed
  const [step, setStep] = useState(0)
  const [chars, setChars] = useState(0)

  const done = reduce || step >= steps.length
  const cmd = done ? "" : steps[step].cmd

  useEffect(() => {
    if (done) return
    const timer =
      chars < cmd.length
        ? setTimeout(() => setChars((c) => c + 1), 55 + Math.random() * 45)
        : setTimeout(() => {
            setStep((s) => s + 1)
            setChars(0)
          }, 500)
    return () => clearTimeout(timer)
  }, [done, cmd, chars])

  return (
    <div className="terminal flex min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-surface text-fg shadow-[0_30px_60px_-20px_rgb(0_0_0/0.35)]">
      <div className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-muted">saim@wajid: ~ — zsh</span>
      </div>
      <div
        className="flex min-h-0 flex-col justify-end space-y-3 overflow-hidden p-5 font-mono text-[12px] leading-relaxed sm:text-[13px] lg:min-h-[23rem] lg:justify-start"
        aria-live="off"
      >
        {steps.map((s, i) => {
          if (!done && i > step) return null
          const typing = !done && i === step
          return (
            <div key={s.cmd}>
              <div>
                <span className="text-accent">❯</span> <span className="text-accent-2">~</span>{" "}
                {typing ? s.cmd.slice(0, chars) : s.cmd}
                {typing && <span className="caret" />}
              </div>
              {!typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1.5 text-fg/90"
                >
                  {s.out}
                </motion.div>
              )}
            </div>
          )
        })}
        {done && (
          <div>
            <span className="text-accent">❯</span> <span className="text-accent-2">~</span> <span className="caret" />
          </div>
        )}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    // Below lg the hero is exactly one screen tall (svh = smallest viewport, so browser bars never cover it):
    // the terminal shrinks to fit and the buttons + version switch sit just above the bottom edge.
    <section
      id="top"
      className="flex h-[100svh] flex-col pt-20 pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:block lg:h-auto lg:pt-28 lg:pb-24"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[1680px] flex-1 flex-col px-4 sm:px-6 lg:block lg:px-12">
        <div className="flex min-h-0 flex-1 flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_30rem] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1fr)_34rem]">
          {/* Vertically centred against the terminal column on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="shrink-0"
          >
            <h1 className="font-mono text-[clamp(2.5rem,12vw,3rem)] leading-none font-bold tracking-tight sm:text-[3rem] lg:text-[clamp(3rem,6.4vw,8.75rem)]">
              <ScrambleText text={profile.name} />
            </h1>
            <p className="mt-4 ml-[1.5ch] flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[clamp(0.8rem,4vw,1rem)] text-accent sm:mt-6 sm:gap-x-4 sm:text-2xl xl:text-3xl">
              {profile.titles.map((t, i) => (
                <span key={t} className="flex items-center gap-3 sm:gap-4">
                  {i > 0 && (
                    <span className="text-muted" aria-hidden>
                      /
                    </span>
                  )}
                  {t}
                </span>
              ))}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="flex min-h-0 flex-1 flex-col"
          >
            {/* On very short screens (phones in landscape) a squeezed terminal is just a sliver, so hide it */}
            <div className="flex min-h-0 flex-col [@media(max-height:480px)]:max-lg:hidden">
              <Terminal />
            </div>
            <div className="mt-auto flex shrink-0 flex-col items-center gap-4 pt-5 lg:mt-6 lg:pt-0">
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-bg px-4 py-2.5 font-mono text-sm transition hover:border-accent hover:text-accent"
                >
                  View projects <ArrowDown className="size-4" aria-hidden />
                </a>
                <CvDownload />
              </div>
              <RegionToggle className="justify-center" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
