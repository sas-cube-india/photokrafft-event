import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { poppins } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} min-h-screen antialiased bg-white`}>{children}</body>
    </html>
  )
}
