import type { ReactNode } from "react"
import { FileText } from "lucide-react"
import { Reveal, SectionHeading } from "@/components/reveal"
import { certifications, education, experience, profile } from "@/data/content"

/** Markdown syntax marker, shown faintly like an editor's live preview */
function Md({ children }: { children: ReactNode }) {
  return <span className="text-accent/50 select-none">{children}</span>
}

function ResumeMd() {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-bg shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-16px_rgb(0_0_0/0.18)]">
      <figcaption className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5 font-mono text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <FileText className="size-3.5 text-accent" aria-hidden /> resume.md
        </span>
        <span className="rounded border border-border px-1.5 py-0.5 text-[10px]">Markdown</span>
      </figcaption>

      <div className="space-y-6 p-6 sm:p-7">
        <section>
          <h3 className="font-mono text-base font-semibold">
            <Md>## </Md>Education
          </h3>
          <p className="mt-3 font-mono text-sm font-medium">
            <Md>### </Md>
            {education.degree}
          </p>
          <p className="mt-1 text-sm text-muted">
            <Md>**</Md>
            <span className="font-medium text-fg">{education.school}</span>
            <Md>**</Md> · <span className="font-mono text-xs">{education.date}</span>
          </p>
        </section>

        <p className="font-mono text-sm text-accent/40 select-none" aria-hidden>
          ---
        </p>

        <section>
          <h3 className="font-mono text-base font-semibold">
            <Md>## </Md>Experience
          </h3>
          {experience.map((job) => (
            <div key={job.org}>
              <p className="mt-3 font-mono text-sm font-medium">
                <Md>### </Md>
                {job.role}
              </p>
              <p className="mt-1 text-sm text-muted">
                <Md>**</Md>
                <span className="font-medium text-fg">{job.org}</span>
                <Md>**</Md> · {job.team} · <span className="font-mono text-xs">{job.date}</span>
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span className="font-mono text-accent select-none" aria-hidden>
                      -
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <p className="font-mono text-sm text-accent/40 select-none" aria-hidden>
          ---
        </p>

        <section>
          <h3 className="font-mono text-base font-semibold">
            <Md>## </Md>Certifications
          </h3>
          <ul className="mt-3 space-y-3 text-sm leading-relaxed">
            {certifications.map((c) => (
              <li key={c.name}>
                <div className="flex gap-2.5">
                  <span className="font-mono text-accent select-none" aria-hidden>
                    -
                  </span>
                  <span>
                    <Md>**</Md>
                    <span className="font-medium">{c.issuer}</span>
                    <Md>**</Md> <span className="text-muted">·</span>{" "}
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent"
                      >
                        <Md>[</Md>
                        {c.name}
                        <Md>](verify)</Md>
                      </a>
                    ) : (
                      <span className="text-muted">{c.name}</span>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </figure>
  )
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1680px] px-4 py-24 sm:px-6 lg:px-12 lg:pl-20">
      <SectionHeading index="01" label="whoami" title="Who am I" />

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-20 xl:grid-cols-[minmax(0,1fr)_minmax(0,40rem)] xl:gap-32">
        <Reveal className="max-w-2xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p className="text-xl leading-relaxed text-fg sm:text-2xl">{profile.tagline}</p>
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <ResumeMd />
        </Reveal>
      </div>
    </section>
  )
}
