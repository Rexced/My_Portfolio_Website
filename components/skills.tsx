import { Reveal, SectionHeading } from "@/components/reveal"
import { skills } from "@/data/content"

export function Skills() {
  return (
    <section id="stack" className="mx-auto max-w-[1680px] px-4 pt-16 pb-24 sm:px-6 lg:px-12">
      <SectionHeading index="03" label="stack" title="Tools I use / used" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.05} className="h-full">
            <div className="h-full overflow-hidden rounded-2xl border border-border-strong bg-surface">
              <h3 className="border-b border-border-strong bg-surface-2 px-5 py-3 font-mono text-sm font-medium text-accent">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-2 p-5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border-strong bg-bg px-2.5 py-1 text-sm transition hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

    </section>
  )
}
