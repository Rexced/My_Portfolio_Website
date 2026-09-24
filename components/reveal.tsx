"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <Reveal className="mb-12">
      <p className="mb-3 font-mono text-xs tracking-[0.25em] text-accent">
        {index} <span className="text-muted">// {label}</span>
      </p>
      <div className="flex items-end gap-6">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        {/* Rule to the edge marks where the section starts */}
        <span className="mb-2.5 hidden h-px flex-1 bg-border-strong sm:block" aria-hidden />
      </div>
    </Reveal>
  )
}
