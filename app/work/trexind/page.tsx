import type { Metadata } from "next"

import { CaseStudyPage } from "@/components/case-study"
import { PROJECTS } from "@/lib/content"

const project = PROJECTS.find((p) => p.title === "Trexind")!

const title = "Trexind — Case Study"
const description =
  "AI operating system for local businesses. Full-stack work on the restaurant and clinic verticals, the shared booking engine, and WhatsApp automation."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/trexind" },
  openGraph: {
    title,
    description,
    url: "/work/trexind",
    siteName: "Saksham Jain",
    type: "article",
    images: [{ url: project.image, alt: project.imageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
}

export default function Trexind(): React.ReactElement {
  return (
    <CaseStudyPage
      project={project}
      liveUrl="https://trexind.com"
      liveLabel="Visit trexind.com"
      roleFacts={[
        { k: "Role", v: "Full-stack Developer" },
        { k: "Focus", v: "Restaurant & Clinic verticals" },
        { k: "Year", v: "2026" },
        { k: "Status", v: "Production" },
      ]}
      overview={
        <p>
          Trexind is an AI operating system for local businesses. It connects a
          business&apos;s Google Business Profile, reads its reviews and nearby
          competitors, and turns that into a weekly action plan — while also
          running the day-to-day operations (bookings, billing, and WhatsApp
          conversations) the business depends on. The platform ships as one
          dashboard across three verticals: clinics, restaurants, and salons.
        </p>
      }
      role={
        <p>
          I worked as a full-stack developer on Trexind, building out the{" "}
          <strong className="font-medium text-ink">restaurant</strong> and{" "}
          <strong className="font-medium text-ink">clinic</strong> verticals of
          the SaaS on top of the shared platform (auth, billing, GBP sync, and
          the AI review pipeline). On the API side that meant vertical-specific
          data models and endpoints — table/menu management and order flow for
          restaurants, appointment slots and patient records for clinics —
          wired into the same booking, WhatsApp notification, and billing
          engine used across every vertical. On the frontend, I built the
          dashboard views and booking flows for both verticals, matching the
          existing design system so each vertical feels native rather than
          bolted on.
        </p>
      }
      ownership={[
        {
          area: "API & data model",
          detail:
            "Vertical-specific booking payloads (patient records, table/menu orders) modeled as extensions of one shared booking entity, not a fork per vertical.",
        },
        {
          area: "Infrastructure",
          detail:
            "RabbitMQ job queue for GBP sync and AI summary generation, plus a Redis layer caching profile snapshots and rate-limit counters.",
        },
        {
          area: "Integrations",
          detail:
            "WhatsApp Business API webhooks and Google Business Profile sync — both idempotent and rate-limit aware.",
        },
        {
          area: "Frontend",
          detail:
            "Dashboard views and booking flows for the restaurant and clinic verticals, matched to the existing design system.",
        },
      ]}
      highlights={[
        "Idempotent WhatsApp webhooks, keyed on message ID",
        "RabbitMQ queue, per-business rate-limited consumers",
        "Redis cache for GBP snapshots + rate-limit counters",
        "Optimistic locking on booking slots, retry on conflict",
      ]}
      complexity={[
        {
          problem:
            "One dashboard has to serve three verticals — clinics, restaurants, and salons — each built around a different core object (appointment vs. table order vs. service slot) — without forking the codebase per vertical.",
          approach:
            "Modeled a generic booking entity that every vertical extends with its own typed payload (patient record, table/menu order, service selection), so the booking, WhatsApp, and billing engines stay vertical-agnostic and only the extension schema changes.",
        },
        {
          problem:
            "Two customers can hit \"book\" on the same appointment slot or table within milliseconds of each other, especially right after a weekly promo goes out.",
          approach:
            "Booking slots carry a version field — the write that loses the race gets a conflict, not a silent overwrite, and retries against the now-current slot state. Went with optimistic locking over a pessimistic row lock because slot writes are short and contested rarely enough that a lock held across the request isn't worth the latency.",
        },
        {
          problem:
            "Weekly AI summaries and review-reply drafts run against Google Business Profile's rate-limited API for every connected business — one slow or throttled account shouldn't stall the batch for everyone else.",
          approach:
            "GBP sync and summary generation are jobs on a RabbitMQ queue, one consumer per business with its own backoff, so a rate limit on one account delays only that account's job, not the run. The last-synced profile snapshot and per-business rate-limit counters live in Redis, so a retry reads current state without hitting GBP again.",
        },
        {
          problem:
            "WhatsApp delivery retries and duplicate webhook events can double-fire a booking confirmation or a billing charge if handled naively.",
          approach:
            "Made every WhatsApp webhook handler idempotent, keyed on message ID, so a retried delivery updates state once instead of re-triggering booking or billing side effects. The booking engine holds up under 100+ concurrent bookings across verticals in load testing without a double-booked slot.",
        },
      ]}
      flows={[
        {
          title: "Booking & notifications",
          steps: [
            { label: "Vertical dashboard", note: "Restaurant / Clinic UI" },
            { label: "Vertical API", note: "Order or appointment payload" },
            { label: "Booking engine", note: "Shared across verticals" },
            { label: "WhatsApp webhook", note: "Idempotent on message ID" },
            { label: "Customer" },
          ],
        },
        {
          title: "Weekly AI summary",
          steps: [
            { label: "RabbitMQ queue", note: "One job per business" },
            { label: "GBP sync worker", note: "Redis-cached, rate-limited" },
            { label: "Review ingestion" },
            { label: "LLM summarizer", note: "Draft replies + weekly plan" },
            { label: "Owner approval", note: "Approve & post / edit" },
          ],
        },
      ]}
      shipped={[
        "Restaurant vertical — table/menu setup, order tracking, and WhatsApp-driven booking confirmations.",
        "Clinic vertical — appointment scheduling, patient records, and automated visit reminders over WhatsApp.",
        "Shared weekly AI summary and review-reply drafting surfaced identically across both verticals.",
        "Competitor radar and Google Business Profile sync reused by every vertical dashboard.",
      ]}
      stack={[
        "Next.js",
        "Node.js",
        "Express",
        "MongoDB",
        "RabbitMQ",
        "Redis",
        "WhatsApp Business API",
        "Google Business Profile API",
      ]}
    />
  )
}
