import type { Metadata } from "next"

import { Approach } from "@/components/approach"
import { Capabilities } from "@/components/capabilities"
import { Contact } from "@/components/contact"
import { Hero } from "@/components/hero"
import { PracticeStrip } from "@/components/practice-strip"
import { SelectedWork } from "@/components/selected-work"
import { Stack } from "@/components/stack"
import { getLocation } from "@/lib/location"
import { getWeather } from "@/lib/weather"

const title = "Saksham Jain · Full-stack Web Developer"
const description =
  "Full-stack web developer with 2+ years of experience building and shipping scalable products fast, using Claude Code AI agents throughout the development workflow."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Saksham Jain",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1665,
        height: 983,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
}

export default async function Page(): Promise<React.ReactElement> {
  // Resolve the visitor's location, then their weather — both server-side, so
  // the hero receives ready-to-render, serializable props (no client fetching).
  const location = await getLocation()
  const weather = await getWeather(location)

  return (
    <main className="relative">
      <Hero location={location} weather={weather} />
      <PracticeStrip />
      <SelectedWork />
      <Capabilities />
      <Approach />
      <Stack />
      <Contact />
    </main>
  )
}
