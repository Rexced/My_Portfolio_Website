import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" })

const title = "Saim Wajid | Cloud, DevOps & Security"
const description =
  "Portfolio of Saim Wajid, a CS graduate building and securing cloud infrastructure, SIEM pipelines and self-hosted systems."

export const metadata: Metadata = {
  metadataBase: new URL("https://rexced.github.io/Portfolio"),
  title,
  description,
  openGraph: { title, description, url: "/", siteName: "Saim Wajid", type: "website" },
  twitter: { card: "summary", title, description },
}

// Light by default; a visitor's own choice (saved by the toggle) wins
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The inline script sets data-theme before first paint, so React must not flag the mismatch
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
