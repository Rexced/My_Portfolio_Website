"use client"

import { useState } from "react"
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react"
import { CvDownload, RegionToggle } from "@/components/cv-controls"
import { useRegion } from "@/components/region-provider"
import { Reveal, SectionHeading } from "@/components/reveal"
import { profile } from "@/data/content"
import { REGION_INFO } from "@/lib/region"

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard blocked (e.g. insecure context): the mailto link still works
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="rounded-md border border-border p-2 text-muted transition hover:border-accent hover:text-accent"
    >
      {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
    </button>
  )
}

export function Contact() {
  const { region } = useRegion()
  const info = REGION_INFO[region]

  return (
    <section id="contact" className="mx-auto max-w-[1680px] px-4 py-24 sm:px-6 lg:px-12">
      <SectionHeading index="04" label="contact" title="Let's build something scalable and secure" />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="rounded-2xl border border-border-strong bg-surface p-6 sm:p-8">
          <p className="max-w-md leading-relaxed text-muted">
            Hiring for an Associate Cloud Engineer, Associate DevOps Engineer or Associate Security Analyst? I'm a 2026 CS graduate ready to start, and my inbox is open.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-w-0 items-center gap-2 font-mono text-base break-all text-fg transition hover:text-accent sm:text-lg"
            >
              <Mail className="size-5 shrink-0 text-accent" aria-hidden />
              {profile.email}
            </a>
            <CopyEmail />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2 font-mono text-sm transition hover:border-accent hover:text-accent"
            >
              <Linkedin className="size-4" aria-hidden /> LinkedIn
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2 font-mono text-sm transition hover:border-accent hover:text-accent"
            >
              <Github className="size-4" aria-hidden /> GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col justify-between gap-6 rounded-2xl border border-border-strong bg-surface p-6 sm:p-8">
          <div>
            <p className="font-mono text-xs text-muted">// {info.docName.toLowerCase()}</p>
            <p className="mt-2 leading-relaxed text-muted">
              Tailored versions for Pakistan, US and UK / Ireland applications. Pick the one that fits your team.
            </p>
            <p className="mt-3 font-mono text-xs text-accent-2">{info.availability}</p>
          </div>
          <div className="space-y-4">
            <RegionToggle />
            <CvDownload />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
