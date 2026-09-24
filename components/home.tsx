"use client"

import { MotionConfig } from "framer-motion"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { Projects } from "@/components/projects"
import { RegionProvider } from "@/components/region-provider"
import { Skills } from "@/components/skills"
import { SmoothScroll } from "@/components/smooth-scroll"
import { profile } from "@/data/content"
import type { Region } from "@/lib/region"

export function Home({ region }: { region?: Region }) {
  return (
    <MotionConfig reducedMotion="user">
      <RegionProvider fixed={region}>
        <SmoothScroll>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <footer className="border-t border-border">
            <div className="mx-auto flex max-w-[1680px] flex-wrap justify-between gap-2 px-4 py-8 font-mono text-xs text-muted sm:px-6 lg:px-12">
              <span suppressHydrationWarning>
                © {new Date().getFullYear()} {profile.name}
              </span>
              <span>built with next.js · hosted on github pages</span>
            </div>
          </footer>
        </SmoothScroll>
      </RegionProvider>
    </MotionConfig>
  )
}
