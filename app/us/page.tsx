import type { Metadata } from "next"
import { Home } from "@/components/home"

// Link used on US applications: defaults to the US resume
export const metadata: Metadata = { alternates: { canonical: "/" } }

export default function Page() {
  return <Home region="us" />
}
