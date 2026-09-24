import type { Metadata } from "next"
import { Home } from "@/components/home"

// Link used on Pakistan applications: defaults to the PK resume
export const metadata: Metadata = { alternates: { canonical: "/" } }

export default function Page() {
  return <Home region="pk" />
}
