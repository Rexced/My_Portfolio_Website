"use client"

import { useState, type ReactNode } from "react"
import { ReactLenis } from "lenis/react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  // Read once on the client; Lenis is created in an effect, so SSR never sees these options
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: !reduced,
        // Handle in-page #links; room for the fixed navbar comes from CSS scroll-margin-top
        anchors: { immediate: reduced },
      }}
    >
      {children}
    </ReactLenis>
  )
}
