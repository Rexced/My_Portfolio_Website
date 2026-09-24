"use client"

import { Download } from "lucide-react"
import { useRegion } from "@/components/region-provider"
import { REGION_INFO } from "@/lib/region"
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
    </a>
  )
}

