import { SERVICES } from "@/lib/services"

/**
 * Engineering notes. Each article answers one question the way a search or AI
 * engine would quote it: a self-contained 40-60 word answer first, then depth.
 * Every claim comes from the shipped case studies (/work/*), nothing else.
 */
export type Section = {
  h: string
  /** 40-60 word direct answer, quotable on its own. */
  answer: string
  body?: readonly string[]
  list?: readonly string[]
}

export type Article = {
  slug: string
  title: string
  /** <title> when the headline is too long for search results (<=60 chars). */
  seoTitle?: string
  description: string
  published: string // ISO date; only change `updated` on real edits
  updated?: string
  answer: string
  project: { title: string; href: string }
  sections: readonly Section[]
  table?: { head: readonly string[]; rows: readonly (readonly string[])[] }
}

export const ARTICLES: readonly Article[] = [
  {
    slug: "stop-two-people-buying-the-last-ticket",
    title: "How do you stop two people buying the last ticket?",
    seoTitle: "How to Stop Two People Buying the Last Ticket",
    description:
      "Prevent overselling in ticket checkout with a pessimistic row lock, a Redis reservation hold with a TTL, and an idempotent payment webhook.",
    published: "2026-10-10",
    answer:
      "Decrement the ticket count inside a short database transaction that holds a pessimistic row lock, and reserve each ticket in Redis with a time-to-live. The second buyer's write waits milliseconds behind the first, then sees sold out. Abandoned checkouts release their reservation automatically when the TTL expires.",
    project: { title: "FindYourVibe", href: "/work/findyourvibe" },
    sections: [
      {
        h: "Why does a read-then-write on the ticket count oversell?",
        answer:
          "Two requests can read the same remaining count of one, both pass the check, and both write a sale. The count was correct when read and stale when written, so one ticket is sold twice. Any read-then-write on shared inventory has this race unless the write is made atomic or locked.",
        body: [
          "A plain optimistic retry fixes the correctness problem but starts thrashing once a popular event's last few tickets are hit by a burst of checkouts: every losing buyer's client has to retry the whole checkout, not just a write.",
        ],
      },
      {
        h: "Why use a pessimistic row lock for the last few tickets?",
        answer:
          "A pessimistic lock makes the second writer wait briefly instead of failing and retrying blind. For one hot row that many buyers want at once, a few milliseconds of waiting is cheaper than whole-checkout retries. The lock is held only for the short transaction that decrements the ticket count.",
      },
      {
        h: "How does a Redis reservation hold keep abandoned checkouts from blocking inventory?",
        answer:
          "When a buyer starts checkout, reserve the ticket in Redis with a TTL. If they pay, the reservation converts to a sale. If they leave, the key expires and the ticket returns to inventory automatically. Nobody can hold a ticket hostage by opening a checkout tab and walking away.",
      },
      {
        h: "What happens when the payment webhook arrives twice?",
        answer:
          "Nothing extra. The webhook handler is idempotent, keyed on order ID, and its only job is to publish a payment-confirmed event to RabbitMQ. A retried delivery finds the order already handled, so a ticket is never issued twice. A downstream consumer generates the ticket and sends the confirmation.",
        body: ["The same pattern is covered step by step in the note on idempotent webhooks."],
      },
      {
        h: "Does this hold up under load?",
        answer:
          "In testing on FindYourVibe, checkout stayed correct under 300+ concurrent buyers on a single event drop, without overselling a ticket. The design choices that made that hold are the row lock on the last tickets, the Redis hold with a TTL, and the idempotent webhook feeding a queue.",
        list: [
          "Pessimistic row lock on the last few tickets of an event",
          "Redis reservation hold with a TTL, so no overselling",
          "RabbitMQ decouples ticket issuance from the webhook response",
          "Idempotent payment webhook keyed on order ID",
        ],
      },
    ],
  },
  {
    slug: "optimistic-vs-pessimistic-locking",
    title: "Optimistic or pessimistic locking: which should a booking or checkout use?",
    seoTitle: "Optimistic vs Pessimistic Locking for Bookings and Checkout",
    description:
      "Choose between optimistic and pessimistic locking by how often two writers hit the same row. Four real cases: tickets, bookings, stock and exam submits.",
    published: "2026-10-10",
    answer:
      "Use pessimistic locking when many users fight over the same row, like the last tickets of one event. Use optimistic locking, a version field, when contention is rare, like bookings or carts spread across many slots and products. Choose by how often two writers realistically hit the same row.",
    project: { title: "Trexind", href: "/work/trexind" },
    table: {
      head: ["Case", "Contention", "Choice", "Why"],
      rows: [
        ["Last tickets of one event (FindYourVibe)", "High: a burst on one row", "Pessimistic row lock", "The loser waits milliseconds instead of retrying the whole checkout"],
        ["Appointment and table slots (Trexind)", "Low: short writes, rarely contested", "Optimistic version field", "A lock held across the request isn't worth the latency"],
        ["Stock across many SKUs (Skyxis)", "Low: carts rarely hit the same row", "Optimistic version field", "A lock for the checkout window costs more than the rare retry"],
        ["Submitting an exam attempt (PS Classes)", "One-off per attempt", "Redis lock on the attempt ID", "A submit happens once, so a few milliseconds of lock is cheaper than a corrupted rank"],
      ],
    },
    sections: [
      {
        h: "What is the difference between optimistic and pessimistic locking?",
        answer:
          "Pessimistic locking blocks other writers while one transaction holds a row, so conflicts wait. Optimistic locking lets everyone proceed, then rejects a write if a version field changed underneath it, so conflicts retry. The first trades latency for certainty; the second trades occasional retries for no waiting.",
      },
      {
        h: "When is optimistic locking the better choice?",
        answer:
          "Optimistic locking wins when writes are short and collisions are rare. On Trexind's booking slots a version field means the write that loses a race gets a conflict, not a silent overwrite, and retries against the current slot state. Holding a lock across the whole request would cost more than it saves.",
      },
      {
        h: "When is pessimistic locking the better choice?",
        answer:
          "Pessimistic locking wins on a single hot row that many buyers want at the same moment, such as the last few tickets of a popular event. There, optimistic retries thrash and force each loser to redo the whole checkout. A short lock lets the second buyer wait milliseconds and then see sold out.",
      },
      {
        h: "How do you decide for your own system?",
        answer:
          "Ask how often two writers hit the same row, and what a lost race costs the user. Rare collisions and cheap retries point to optimistic. Frequent collisions on one row, or retries that redo expensive work, point to pessimistic. Measure contention before committing; the same app can use both.",
        list: [
          "Many rows, few collisions per row: optimistic (stock across hundreds of SKUs)",
          "One row, many simultaneous writers: pessimistic (last tickets of an event)",
          "Write happens once per entity: a short lock is fine (exam submit)",
        ],
      },
    ],
  },
  {
    slug: "idempotent-payment-and-whatsapp-webhooks",
    title: "How do you make a payment or WhatsApp webhook idempotent?",
    seoTitle: "How to Make Payment and WhatsApp Webhooks Idempotent",
    description:
      "Key every webhook on a unique ID and publish work to a queue so retries cannot double-issue tickets, bookings or charges. Patterns from two production apps.",
    published: "2026-10-10",
    answer:
      "Key every webhook on a unique ID from the sender, such as an order ID or message ID, and run its side effects once. A repeat delivery finds the ID already processed and does nothing. Publish the real work to a queue instead of doing it inline, so the sender is not kept waiting.",
    project: { title: "FindYourVibe", href: "/work/findyourvibe" },
    sections: [
      {
        h: "Why do webhooks arrive more than once?",
        answer:
          "Senders retry on timeouts, network blips and non-2xx responses, and they favour delivering twice over never delivering. Payment gateways and WhatsApp both do this. A handler that acts on every delivery will issue duplicate tickets, double-fire a booking confirmation or charge twice.",
      },
      {
        h: "What should the idempotency key be?",
        answer:
          "Use the identifier the sender guarantees to be stable across retries: the order ID for payment webhooks, the message ID for WhatsApp. Store processed keys and check before acting. A key you generate yourself per delivery does not work, because each retry would look like a new event.",
      },
      {
        h: "Why publish to a queue instead of doing the work in the handler?",
        answer:
          "Generating a ticket and sending an email inline makes the gateway wait on work it does not care about, which invites timeouts and more retries. Acknowledge fast, publish a payment-confirmed event to RabbitMQ, and let a consumer do the work. A repeated delivery publishes once; the second is a no-op.",
      },
      {
        h: "Where is this used in production?",
        answer:
          "On FindYourVibe the payment webhook is idempotent on order ID and publishes to RabbitMQ before a consumer issues the ticket. On Trexind every WhatsApp webhook handler is idempotent on message ID, so a retried delivery updates state once instead of re-triggering booking or billing side effects.",
      },
      {
        h: "How do you test that a webhook is idempotent?",
        answer:
          "Send the same payload twice, ideally concurrently, and assert the side effect happened once: one ticket, one booking, one charge. Then replay an old payload after the first has been fully processed. If any count is above one, the key check is racing or missing a unique constraint.",
      },
    ],
  },
  {
    slug: "server-authoritative-exam-timer-with-redis",
    title: "How do you build an exam timer students can't cheat?",
    seoTitle: "Build a Cheat-Proof Exam Timer with Redis",
    description:
      "Make the server the source of truth for exam deadlines: Redis-held sessions, periodic flush to MongoDB, auto-submit, and a lock against double submits.",
    published: "2026-10-10",
    answer:
      "Make the server the source of truth for the deadline. Hold the session in Redis, write each answer there as it is selected, flush to the database periodically, and auto-submit when the server's deadline passes. The client clock is only a display, so changing the system clock or backgrounding the tab changes nothing.",
    project: { title: "PS Classes", href: "/work/ps-classes" },
    sections: [
      {
        h: "Why can't the timer live in the browser?",
        answer:
          "A client-side countdown can be extended by editing the system clock, pausing a background tab or tampering with local state. Anything the client controls cannot be trusted for a deadline. The browser can display remaining time, but the server must decide when the attempt ends.",
      },
      {
        h: "Why store the exam session in Redis?",
        answer:
          "With 500+ students starting a test series in the same slot, a primary-database round trip on every answer is too slow. Writing each answer to a Redis-held session on selection is sub-second. The session is flushed to MongoDB periodically, and the server auto-submits at the deadline.",
      },
      {
        h: "How do you stop a double submit from two tabs?",
        answer:
          "Put a short-lived Redis lock on the attempt ID, SETNX-style. The first submit takes the lock and wins; the second is rejected as already processed. This is pessimistic by design: a submit happens once, so a few milliseconds of lock is cheaper than a double-counted attempt corrupting the rank.",
      },
      {
        h: "How do you compute All-India Rank without rescanning every attempt?",
        answer:
          "Put submitted attempts on a RabbitMQ queue. A scoring worker consumes them, updates the score and percentile rollup incrementally, and writes results to Redis. Rank and chapter-wise analytics are then read from a fast cache instead of being recomputed on every result page view.",
      },
    ],
  },
  {
    slug: "one-booking-engine-for-clinics-restaurants-salons",
    title: "How do you serve clinics, restaurants and salons from one booking system?",
    seoTitle: "One Booking System for Clinics, Restaurants and Salons",
    description:
      "Model a generic booking entity that each vertical extends with a typed payload, so booking, WhatsApp and billing engines never fork per business type.",
    published: "2026-10-10",
    answer:
      "Model a generic booking entity and let each vertical extend it with a typed payload: a patient record, a table order or a service selection. The booking, notification and billing engines stay vertical-agnostic, so only the extension schema changes per vertical and the codebase never forks.",
    project: { title: "Trexind", href: "/work/trexind" },
    sections: [
      {
        h: "Why not build a separate booking flow per vertical?",
        answer:
          "Clinics book appointments, restaurants take table orders and salons sell service slots, so each looks like a different product. Forking per vertical triples the booking, WhatsApp and billing code and makes every fix land three times. The shared parts are the same; only the core object differs.",
      },
      {
        h: "What does a generic booking entity look like?",
        answer:
          "A base booking with the shared fields (business, customer, slot, status) plus a typed payload per vertical: a patient record for clinics, a table and menu order for restaurants, a service selection for salons. Engines operate on the base; vertical code only reads and writes its payload.",
      },
      {
        h: "How do you avoid double-booking a slot?",
        answer:
          "Give each slot a version field. If two customers hit book within milliseconds, the write that loses gets a conflict instead of a silent overwrite and retries against the current slot state. Slot writes are short and rarely contested, so optimistic locking beats a lock held across the request.",
      },
      {
        h: "How do you keep one throttled business from slowing everyone's weekly summary?",
        answer:
          "Run Google Business Profile sync and summary generation as jobs on a RabbitMQ queue with one consumer per business, each with its own backoff. A rate limit on one account then delays only that account's job. Last-synced snapshots and per-business rate-limit counters live in Redis.",
      },
    ],
  },
  {
    slug: "cost-to-build-erp-booking-system-india",
    title: "How much does it cost to build a custom ERP, SaaS or booking system in India?",
    seoTitle: "Cost to Build an ERP, SaaS or Booking System in India",
    description:
      "Indicative price ranges and timelines for custom ERP, SaaS, booking, e-commerce and exam platforms, and the four things that move the quote.",
    published: "2026-10-10",
    answer:
      "Indicative ranges run from about $475 for a focused booking system to $4,700 for a large ERP or warehouse platform, over 4 to 20 weeks. Price depends on user roles, workflows, integrations and the deadline. A fixed quote follows a requirements conversation, before any build starts.",
    project: { title: "Pricing", href: "/pricing" },
    table: {
      head: ["Project", "Indicative range (USD)", "Approx. INR", "Timeline"],
      rows: SERVICES.map((s) => [s.title, s.price.usd, s.price.inr, `${s.price.weeks} weeks`]),
    },
    sections: [
      {
        h: "What drives the price of a custom software project?",
        answer:
          "Four things move the number most: how many user roles and permissions the system needs, how many workflows and screens it has, how many third-party integrations such as payments or WhatsApp it connects, and the deadline. A clear scope up front keeps the estimate accurate and prevents surprises mid-build.",
      },
      {
        h: "Why does requirements work come before the quote?",
        answer:
          "A quote built on guesses is either padded or wrong. Mapping workflows, edge cases and integrations first lets the estimate reflect real scope. It also exposes what can wait for a second phase, so the highest-value workflow goes live first and the rest follow in stages.",
      },
      {
        h: "How long does each type of project take?",
        answer:
          "A booking system typically takes 4 to 8 weeks, an e-commerce or ticketing platform 5 to 10, a SaaS product or exam platform 6 to 12, and a large ERP or warehouse system 8 to 20. Timelines assume timely feedback and a stable scope; integrations and approvals are the usual causes of delay.",
      },
      {
        h: "Do you work with clients outside India?",
        answer:
          "Yes. Saksham works with technology companies, startups and product teams in India and internationally, remotely. Share your project through the contact form with your time zone and timeline, and you get a scoped estimate after a short requirements conversation.",
      },
    ],
  },
  {
    slug: "llm-output-handling-bugs",
    title: "What breaks when you parse LLM output in production?",
    seoTitle: "LLM Output Parsing Bugs: Fences, Legends, Validators",
    description:
      "Three real bugs from an AI backend: JSON wrapped in code fences, prompt legends copied into output, and validators that reject almost-right responses.",
    published: "2026-10-10",
    answer:
      "Usually your code's assumptions about formatting, not the model's answer. Three bugs recur: valid JSON wrapped in markdown fences that a strict parser rejects, prompt token legends copied into the output, and validators that treat repairable formatting as fatal. Validate strictly, normalize narrowly, and keep the raw output.",
    project: { title: "Engineering notes", href: "/blog" },
    sections: [
      {
        h: "Why does valid JSON from an LLM fail to parse?",
        answer:
          "Models often wrap JSON in markdown code fences for readability, so a strict json.loads on the raw text fails even though the content is valid. Strip exactly one outer fence before parsing, keep the original text for audit, and still reject prose or nested fences as genuinely invalid output.",
      },
      {
        h: "Why does the model copy my prompt's token legend into the output?",
        answer:
          "If a prompt explains a placeholder with a legend such as a token followed by an equals sign and a description, models sometimes reproduce that format in the result. Tell the model plainly that tokens stand alone on their own line, and strip symbol-prefixed or parenthetical labels when you inject the real content.",
      },
      {
        h: "Which output problems should a validator reject, and which should it repair?",
        answer:
          "Reject what makes the output structurally wrong: missing required fields, prose instead of JSON, leftover placeholders. Repair what is cosmetic and safe: a surrounding fence, stray whitespace, a decorative label. Decide per rule, document it, and log what was repaired so you can see drift in model behavior.",
      },
      {
        h: "Why keep the raw model output?",
        answer:
          "Raw output lets you tell a model problem from a parsing problem. When a response is rejected or repaired, store the original text next to the result. Debugging then starts from evidence instead of guesses, and you can replay it against a fixed parser without calling the model again.",
      },
    ],
  },
]

export const getArticle = (slug: string): Article | undefined => ARTICLES.find((a) => a.slug === slug)
