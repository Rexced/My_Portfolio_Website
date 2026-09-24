"use client"

import { Download } from "lucide-react"
import { useRegion } from "@/components/region-provider"
import { REGIONS, REGION_INFO } from "@/lib/region"
import { cn } from "@/lib/utils"

export function CvDownload({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { region } = useRegion()
  const info = REGION_INFO[region]

  return (
    <a
      href={info.file}
      download={info.downloadAs}
      className={cn(
        "inline-flex items-center gap-2 rounded-md bg-accent font-mono font-medium text-bg transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        compact ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm",
        className,
      )}
    >
      <Download className={compact ? "size-3.5" : "size-4"} aria-hidden />
      {compact ? info.docName : `Download ${info.docName}`}
      {!compact && <span className="opacity-70">({info.label})</span>}
    </a>
  )
}

export function RegionToggle({ className }: { className?: string }) {
  const { region, setRegion } = useRegion()

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <span className="font-mono text-sm text-muted">version:</span>
      <div role="group" aria-label="Resume version" className="inline-flex rounded-lg border border-border-strong bg-surface p-1">
        {REGIONS.map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={region === r}
            onClick={() => setRegion(r)}
            className={cn(
              "min-w-[3.25rem] rounded-md px-3.5 py-2 font-mono text-sm transition",
              region === r ? "bg-surface-2 text-accent shadow-[inset_0_0_0_1px_var(--border-strong)]" : "text-muted hover:text-fg",
            )}
          >
            {REGION_INFO[r].label}
          </button>
        ))}
      </div>
    </div>
  )
}
