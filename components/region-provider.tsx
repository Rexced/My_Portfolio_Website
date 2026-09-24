"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { guessRegion, type Region } from "@/lib/region"

type RegionContextValue = { region: Region }

const RegionContext = createContext<RegionContextValue | null>(null)

/**
 * `fixed` comes from the route (/pk, /us, /uk) and wins outright; visitors can't switch versions.
 * Without it, the page renders "pk" and switches to the timezone guess after mount.
 */
export function RegionProvider({ fixed, children }: { fixed?: Region; children: ReactNode }) {
  const [region, setRegion] = useState<Region>(fixed ?? "pk")

  useEffect(() => {
    if (!fixed) setRegion(guessRegion())
  }, [fixed])

  return <RegionContext.Provider value={{ region }}>{children}</RegionContext.Provider>
}

export function useRegion() {
  const ctx = useContext(RegionContext)
  if (!ctx) throw new Error("useRegion must be used inside <RegionProvider>")
  return ctx
}
