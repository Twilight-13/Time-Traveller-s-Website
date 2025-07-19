import type React from "react"
import type { Metadata } from "next"
import { Cinzel } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["serif"],
})

export const metadata: Metadata = {
  title: "Time Traveler's Journal",
  description:
    "Enter a date, unlock the past - Step through the corridors of time and witness history unfold before your eyes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cinzel.className}>{children}</body>
    </html>
  )
}
