"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Reveal, SectionHeading } from "@/components/reveal"
import { projects, type PipelineNode, type Project } from "@/data/content"
import { cn } from "@/lib/utils"

function Pipeline({ nodes }: { nodes: PipelineNode[] }) {
  return (
    <div className="flex flex-col items-stretch md:flex-row md:items-center">
      {nodes.map((n, i) => (
        <div key={n.label} className="contents">
          {i > 0 && (
            <>
              <div className="wire wire-y mx-auto h-6 w-px md:hidden" aria-hidden />
              <div className="wire wire-x hidden h-px w-6 shrink-0 md:block lg:w-8" aria-hidden />
            </>
          )}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i }}
            className="min-w-0 flex-1 rounded-lg border border-border-strong bg-surface px-3 py-2.5 text-center"
          >
            <p className="font-mono text-xs font-medium text-accent">{n.label}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-muted">{n.detail}</p>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const panelId = `${project.slug}-details`

  return (
    <article
      id={project.slug}
      className={cn(
        "overflow-hidden rounded-2xl border bg-surface transition duration-300",
        open
          ? "border-accent/60 shadow-[0_16px_40px_-20px_rgb(0_0_0/0.3)]"
          : "border-border-strong hover:border-accent/40 hover:shadow-[0_16px_40px_-20px_rgb(0_0_0/0.22)]",
      )}
    >
      {/* Header strip marks where each project starts */}
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border-strong bg-surface-2 px-5 py-3 font-mono text-xs text-muted sm:px-7">
        <span>
          <span className="font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span> / {project.subtitle}
        </span>
        <span>{project.date}</span>
      </header>

      {/* DOM order is text → details → metrics, so on phones the details open right under the button.
          On xl the grid puts metrics beside the text and the details in a full-width row below. */}
      <div className="grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="flex flex-col px-5 pt-5 sm:px-7 sm:pt-7 xl:col-start-1 xl:row-start-1 xl:pr-6 xl:pb-7">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{project.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t} className="rounded-md border border-border-strong bg-bg px-2 py-0.5 font-mono text-[11px] text-muted">
                {t}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-3 inline-flex w-fit items-center gap-2 rounded-md border border-accent/40 bg-accent-soft px-3 py-1.5 font-mono text-sm text-accent transition hover:border-accent"
          >
            {/* Both labels share one grid cell, so the button keeps the longer label's width */}
            <span className="grid text-left">
              <span className={cn("col-start-1 row-start-1", open && "invisible")}>architecture &amp; details</span>
              <span className={cn("col-start-1 row-start-1", !open && "invisible")}>hide details</span>
            </span>
            <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} aria-hidden />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden xl:col-span-2 xl:row-start-2"
            >
              {/* Inset panel: the explanation is visibly contained inside the card */}
              <div className="mt-5 border-y border-dashed border-border-strong bg-bg px-5 py-6 sm:mt-7 sm:px-7 xl:mt-0 xl:border-b-0">
                <p className="mb-3 font-mono text-xs text-muted">// how it fits together</p>
                <Pipeline nodes={project.pipeline} />
                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted">
                  {project.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-0.5 font-mono text-accent" aria-hidden>
                        →
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-5 sm:p-7 xl:col-start-2 xl:row-start-1 xl:pl-6">
          <dl className="grid h-fit grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-strong bg-border-strong sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-bg px-4 py-4">
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-mono text-xl font-semibold text-accent sm:text-2xl">{m.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted">{m.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1680px] px-4 py-24 sm:px-6 lg:px-12">
      <SectionHeading index="02" label="projects" title="Things I've built & secured" />
      <div className="space-y-8">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
