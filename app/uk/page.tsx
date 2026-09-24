import type { Metadata } from "next"
import { Home } from "@/components/home"

// Link used on UK / Ireland applications: defaults to the UK/IE CV
export const metadata: Metadata = { alternates: { canonical: "/" } }

export default function Page() {
  return <Home region="uk" />
}
