import type { Metadata } from "next"

import { CaseStudyPage } from "@/components/case-study"
import { PROJECTS } from "@/lib/content"

const project = PROJECTS.find((p) => p.title === "FindYourVibe")!

const title = "FindYourVibe — Case Study"
const description =
  "Event discovery and ticketing platform. Full-stack work on the checkout flow, ticket inventory, and idempotent payment webhooks."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/findyourvibe" },
  openGraph: {
    title,
    description,
    url: "/work/findyourvibe",
    siteName: "Saksham Jain",
    type: "article",
    images: [{ url: project.image, alt: project.imageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
}

export default function FindYourVibe(): React.ReactElement {
  return (
    <CaseStudyPage
      project={project}
      liveUrl="https://findyourvibe.in"
      liveLabel="Visit findyourvibe.in"
      roleFacts={[
        { k: "Role", v: "Full-stack Developer" },
        { k: "Focus", v: "Checkout & ticket inventory" },
        { k: "Year", v: "2026" },
        { k: "Status", v: "Production" },
      ]}
      overview={
        <p>
          FindYourVibe is an event discovery and ticketing platform covering
          Raipur, Delhi NCR, and other cities. Visitors browse events by
          category, city, and vibe — parties, standup, workshops, concerts —
          and book tickets with zero convenience fee, from limited-capacity
          meetups to large ticketed shows.
        </p>
      }
      role={
        <p>
          I worked as a full-stack developer on FindYourVibe, building the
          event catalog and explore/search experience, the city and category
          browsing pages, and the checkout flow from ticket selection through
          payment confirmation. The harder half of the work was underneath
          the UI: making sure a limited-capacity event can&apos;t sell more
          tickets than it has, even when multiple people check out at once.
        </p>
      }
      ownership={[
        {
          area: "API & data model",
          detail:
            "Event catalog with compound city/category/date indexes, and the pessimistic-lock ticket decrement behind checkout.",
        },
        {
          area: "Infrastructure",
          detail:
            "Redis-backed reservation holds (TTL) and a RabbitMQ queue decoupling ticket issuance from the payment webhook response.",
        },
        {
          area: "Integrations",
          detail:
            "Payment gateway checkout and an idempotent webhook handler keyed on order ID.",
        },
        {
          area: "Frontend",
          detail:
            "Explore/search, city and category pages, and the checkout flow from ticket selection to confirmation.",
        },
      ]}
      highlights={[
        "Pessimistic row lock on the last few tickets of an event",
        "Redis reservation hold with TTL, no overselling",
        "RabbitMQ decouples ticket issuance from the webhook",
        "Idempotent payment webhook, keyed on order ID",
      ]}
      complexity={[
        {
          problem:
            "A limited-capacity event can be oversold if two people check out the last available ticket at the same moment — a naive read-then-write on the ticket count races, and a plain optimistic retry starts thrashing once a popular event's last few tickets get hit by a burst of checkouts.",
          approach:
            "Ticket rows are decremented inside a short transaction holding a pessimistic row lock, so the second buyer's write blocks for milliseconds behind the first instead of retrying blind — worth the small latency here because the alternative (optimistic compare-and-swap) means the losing buyer's client has to retry the whole checkout, not just a write. That decision reserves a slot in Redis with a TTL, so a buyer who abandons checkout releases the ticket back to inventory automatically instead of holding it hostage.",
        },
        {
          problem:
            "Explore and city pages filter a growing catalog of events by city, category, and date — a full scan gets slower as more events go live.",
          approach:
            "Compound indexes on city, category, and date back the explore and city pages, so filtering stays fast as the event catalog grows instead of degrading with it.",
        },
        {
          problem:
            "Payment webhooks can arrive more than once for the same order — retries, network blips — which would issue duplicate tickets if the handler just acted on every delivery, and doing ticket generation + email inline in the webhook handler makes the gateway wait on work it doesn't care about.",
          approach:
            "The webhook handler is idempotent, keyed on order ID, and its only job is to publish a \"payment confirmed\" event to RabbitMQ — a downstream consumer generates the ticket and sends the confirmation. A retried webhook delivery publishes once (the second is a no-op), and checkout stays correct under 300+ concurrent buyers on a single event drop without overselling a ticket.",
        },
      ]}
      flows={[
        {
          title: "Checkout",
          steps: [
            { label: "Explore / search", note: "City, category, vibe" },
            { label: "Event detail" },
            { label: "Redis reservation hold", note: "TTL, releases if unpaid" },
            { label: "Payment gateway" },
            { label: "Webhook", note: "Idempotent, publishes to queue" },
            { label: "RabbitMQ" },
            { label: "Ticket issued", note: "Confirmation sent" },
          ],
        },
        {
          title: "Last-ticket race",
          steps: [
            { label: "2 buyers, 1 ticket left", note: "Simultaneous checkout" },
            { label: "Pessimistic row lock", note: "Short transaction" },
            { label: "Winner", note: "Gets the reservation hold" },
            { label: "Loser", note: "Sees sold-out, no overselling" },
          ],
        },
      ]}
      shipped={[
        "Explore/search by category, city, and vibe across multiple cities.",
        "Checkout flow with a reservation hold that prevents overselling limited-capacity events.",
        "Idempotent payment webhook handling and ticket issuance.",
        "Upcoming-events and recommended-events rails driven by the same catalog API.",
      ]}
      stack={[
        "Next.js",
        "Node.js",
        "Express",
        "MongoDB",
        "Redis",
        "RabbitMQ",
        "Payment Gateway",
      ]}
    />
  )
}
