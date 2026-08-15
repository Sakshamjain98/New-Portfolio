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
  openGraph: { title, description, url: "/work/findyourvibe" },
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
            "Event catalog with compound city/category/date indexes, and the atomic ticket-decrement + reservation-hold logic behind checkout.",
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
        "Atomic ticket decrement, not read-then-write",
        "Reservation hold with TTL, no overselling",
        "Idempotent payment webhook, keyed on order ID",
        "Compound city/category/date indexes for search",
      ]}
      complexity={[
        {
          problem:
            "A limited-capacity event can be oversold if two people check out the last available ticket at the same moment — a naive read-then-write on the ticket count races.",
          approach:
            "Ticket count is decremented atomically at the database level on checkout (a conditional update, not a read-then-write), paired with a short reservation hold that expires and releases the ticket back to inventory if payment isn't completed in time.",
        },
        {
          problem:
            "Explore and city pages filter a growing catalog of events by city, category, and date — a full scan gets slower as more events go live.",
          approach:
            "Compound indexes on city, category, and date back the explore and city pages, so filtering stays fast as the event catalog grows instead of degrading with it.",
        },
        {
          problem:
            "Payment webhooks can arrive more than once for the same order — retries, network blips — which would issue duplicate tickets if the handler just acted on every delivery.",
          approach:
            "The webhook handler is keyed on payment/order ID, so a retried delivery confirms the same ticket once instead of issuing a second one.",
        },
      ]}
      flows={[
        {
          title: "Checkout",
          steps: [
            { label: "Explore / search", note: "City, category, vibe" },
            { label: "Event detail" },
            { label: "Reservation hold", note: "TTL, releases if unpaid" },
            { label: "Payment gateway" },
            { label: "Webhook", note: "Idempotent on order ID" },
            { label: "Ticket issued", note: "Confirmation sent" },
          ],
        },
        {
          title: "Last-ticket race",
          steps: [
            { label: "2 buyers, 1 ticket left", note: "Simultaneous checkout" },
            { label: "Atomic decrement", note: "DB-level conditional update" },
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
      stack={["Next.js", "Node.js", "Express", "MongoDB", "Payment Gateway"]}
    />
  )
}
