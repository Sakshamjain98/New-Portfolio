/**
 * Buyer-intent pages: what a client types when they have a problem, not a
 * developer's name. Proof comes only from the shipped case studies (/work/*).
 * No prices or timelines are stated until real ranges are supplied.
 */
export type ServiceFaq = { q: string; a: string }
export type Service = {
  slug: string
  title: string // H1, in the buyer's words
  seoTitle: string
  description: string
  answer: string // 40-60 words
  deliverables: readonly string[]
  proof: readonly { label: string; href: string; text: string }[]
  stack: readonly string[]
  faqs: readonly ServiceFaq[]
  note?: { slug: string; label: string }
  price: Price
}

// Indicative ranges set by the owner's delegation, not quotes. Adjust here when
// real rates change; each page's cost FAQ and schema text derive from these.
export type Price = { what: string; usd: string; inr: string; weeks: string }
const cost = ({ what, usd, inr, weeks }: Price): ServiceFaq => ({
  q: "How much does it cost and how long does it take?",
  a: `Indicative ranges for ${what} are ${usd} (${inr}) over ${weeks} weeks, depending on user roles, workflows, integrations and the deadline. Treat this as a starting point: a fixed quote follows a requirements conversation, before any build starts, so the price reflects real scope.`,
})

const PRICES: Price[] = [
  { what: "a custom ERP or warehouse management system", usd: "$2,250 to $9,400", inr: "about ₹1.9 to ₹7.5 lakh", weeks: "8 to 20" },
  { what: "a SaaS product", usd: "$1,500 to $4,500", inr: "about ₹1.25 to ₹3.75 lakh", weeks: "6 to 12" },
  { what: "a booking system", usd: "$950 to $3,000", inr: "about ₹75,000 to ₹2.5 lakh", weeks: "4 to 8" },
  { what: "an e-commerce or ticketing platform", usd: "$1,100 to $3,750", inr: "about ₹95,000 to ₹3.2 lakh", weeks: "5 to 10" },
  { what: "an online exam platform", usd: "$1,300 to $3,750", inr: "about ₹1.1 to ₹3.2 lakh", weeks: "6 to 10" },
]

export const SERVICES: readonly Service[] = [
  {
    slug: "erp-warehouse-management-development",
    title: "ERP and warehouse management system development",
    seoTitle: "ERP & Warehouse Management System Developer",
    description:
      "Custom ERP, warehouse management, HRMS and workflow systems built full-stack with role-based access, REST APIs, automation and reporting.",
    answer:
      "Saksham Jain designs and builds custom ERP, warehouse management, attendance, HRMS and workflow systems end to end: database design, secure REST APIs, role-based permissions, automation, reporting and the user interface. He has 2+ years of experience delivering enterprise systems and ships them to production.",
    deliverables: [
      "Requirements, workflows and edge cases mapped before any schema is touched",
      "Data model and REST APIs with role-based access and permissions",
      "Workflow and automation engine for approvals and status changes",
      "Reporting views for operations teams",
      "Responsive, accessible admin UI built with Next.js, React and Tailwind",
      "Deployment, monitoring and documentation",
    ],
    proof: [
      { label: "PS Classes", href: "/work/ps-classes", text: "One entitlement check (trial, purchased, admin) in a single middleware layer that every test and course endpoint routes through, instead of per-feature access logic." },
      { label: "Trexind", href: "/work/trexind", text: "Billing, booking and WhatsApp engines kept vertical-agnostic across clinics, restaurants and salons, with idempotent webhook handlers." },
    ],
    stack: ["Node.js", "Express", "MongoDB", "Azure Cosmos DB", "Next.js", "TypeScript", "Redis", "RabbitMQ"],
    faqs: [
      {
        q: "What does a custom ERP or warehouse management system include?",
        a: "A custom ERP covers the workflows your operations actually run: inventory or orders, approvals, user roles and permissions, reporting and integrations. Scope starts from your processes, not a template. Modules are built in priority order so the highest-value workflow goes live first and the rest follow in stages.",
      },
      cost(PRICES[0]),
    ],
    note: { slug: "optimistic-vs-pessimistic-locking", label: "Optimistic or pessimistic locking for bookings and stock" },
    price: PRICES[0],
  },
  {
    slug: "saas-product-development",
    title: "Full-stack SaaS product development with Next.js",
    seoTitle: "Next.js SaaS Developer for Production Products",
    description:
      "Production-ready SaaS built with Next.js, Node.js and MongoDB: auth, billing, queues, caching and scalable architecture, from first release to scale.",
    answer:
      "Saksham Jain builds production SaaS applications with Next.js, TypeScript and Node.js: authentication, role-based access, billing, background jobs, caching and a polished UI. He owns architecture through deployment, and has shipped live products including Trexind, PS Classes, FindYourVibe and Skyxis.",
    deliverables: [
      "Architecture: data model, APIs, permissions and deployment plan",
      "Auth, roles and billing integrated into the core product",
      "Background jobs on RabbitMQ and Redis caching where load demands it",
      "Type-safe APIs and a reusable, accessible frontend component system",
      "Performance tuning, deployment on Vercel, Azure or DigitalOcean, and documentation",
    ],
    proof: [
      { label: "Trexind", href: "/work/trexind", text: "AI operating system for local businesses: one dashboard across three verticals, with queue-based Google Business Profile sync and weekly AI summaries." },
      { label: "FindYourVibe", href: "/work/findyourvibe", text: "Ticketing platform with Redis reservation holds and idempotent payment webhooks, correct under 300+ concurrent buyers in testing." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Redis", "RabbitMQ", "Tailwind CSS"],
    faqs: [
      {
        q: "Can you build a SaaS product from scratch?",
        a: "Yes. The work starts with requirements and architecture, then covers the database, secure APIs, authentication, billing and the frontend, followed by performance tuning and deployment. You get a production-ready system with documentation, not a demo. Several live products on this site were built this way.",
      },
      cost(PRICES[1]),
    ],
    note: { slug: "one-booking-engine-for-clinics-restaurants-salons", label: "One booking engine for clinics, restaurants and salons" },
    price: PRICES[1],
  },
  {
    slug: "booking-appointment-system-development",
    title: "Booking and appointment system for clinics, restaurants and salons",
    seoTitle: "Booking & Appointment System Developer",
    description:
      "Custom booking systems with slot management, double-booking protection, WhatsApp notifications and billing for clinics, restaurants and salons.",
    answer:
      "Saksham Jain builds booking and appointment systems with slot management, double-booking protection, WhatsApp confirmations and billing. On Trexind he built the restaurant and clinic verticals on a shared booking engine, so one codebase serves clinics, restaurants and salons without forking per business type.",
    deliverables: [
      "Slot and table management with a version field so races never silently overwrite",
      "WhatsApp notifications with idempotent webhook handling, so retries never double-confirm",
      "Billing wired into the same booking flow",
      "Vertical-specific data: patient records, table and menu orders, service selections",
      "Dashboard views and customer booking flows in a consistent design system",
    ],
    proof: [
      { label: "Trexind", href: "/work/trexind", text: "Booking engine held up under 100+ concurrent bookings across verticals in load testing without a double-booked slot." },
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "Redis", "RabbitMQ", "WhatsApp API"],
    faqs: [
      {
        q: "How do you prevent double bookings?",
        a: "Each slot carries a version field. If two customers book the same slot within milliseconds, the write that loses the race gets a conflict instead of a silent overwrite, then retries against the current slot state. Slot writes are short and rarely contested, so optimistic locking fits better than holding a lock.",
      },
      cost(PRICES[2]),
    ],
    note: { slug: "one-booking-engine-for-clinics-restaurants-salons", label: "One booking engine for clinics, restaurants and salons" },
    price: PRICES[2],
  },
  {
    slug: "ecommerce-ticketing-platform-development",
    title: "E-commerce and ticketing platform development",
    seoTitle: "E-commerce & Ticketing Platform Developer",
    description:
      "Storefronts and ticketing platforms with correct inventory, fast checkout, cart merge, idempotent payments and order queues that scale under load.",
    answer:
      "Saksham Jain builds e-commerce storefronts and ticketing platforms where inventory stays correct under load: pessimistic or optimistic locking chosen per case, Redis reservation holds, cached server-side pricing and idempotent payment webhooks. Live examples are Skyxis, a D2C audio store, and FindYourVibe, an event ticketing marketplace.",
    deliverables: [
      "Catalog, cart, wishlist, quick view and checkout",
      "Guest cart that merges into the account on login without losing items",
      "Inventory re-checked at checkout so a stale stock badge never sells a gone item",
      "Server-side pricing and promos, cached in Redis and invalidated on change",
      "Order events published to a queue so checkout never waits on email",
    ],
    proof: [
      { label: "Skyxis", href: "/work/skyxis", text: "D2C audio store; optimistic stock locking across many SKUs, correct under 100+ concurrent checkouts." },
      { label: "FindYourVibe", href: "/work/findyourvibe", text: "Event ticketing; pessimistic lock on the last tickets plus Redis hold, no overselling under 300+ concurrent buyers in testing." },
    ],
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "Redis", "RabbitMQ"],
    faqs: [
      {
        q: "How do you stop overselling during a high-demand drop?",
        a: "Decrement stock inside a short transaction with a pessimistic row lock on the hot item, reserve each unit in Redis with a time-to-live, and make the payment webhook idempotent on order ID. The second buyer waits milliseconds and sees sold out; abandoned checkouts release their stock automatically.",
      },
      cost(PRICES[3]),
    ],
    note: { slug: "stop-two-people-buying-the-last-ticket", label: "How to stop two people buying the last ticket" },
    price: PRICES[3],
  },
  {
    slug: "online-exam-test-series-platform-development",
    title: "Online exam and test series platform development",
    seoTitle: "Online Exam & Test Series Platform Developer",
    description:
      "Exam-prep platforms with a tamper-proof server timer, auto-submit, chapter-wise analytics, All-India Rank and trial-to-paid access control.",
    answer:
      "Saksham Jain builds online exam and test series platforms with a server-authoritative timer, answers held in Redis, auto-submit at the deadline, double-submit protection, chapter-wise analytics and All-India Rank. PS Classes, a pharmacy exam-prep platform for Drug Inspector aspirants, runs on this design.",
    deliverables: [
      "Timed test engine where the server, not the browser, owns the deadline",
      "Sub-second answer saves to Redis, periodically flushed to the database",
      "Lock against double submits from multiple tabs",
      "Queue-based scoring worker with incremental rank and percentile rollups",
      "Course library, student auth and a free-trial to paid access layer",
    ],
    proof: [
      { label: "PS Classes", href: "/work/ps-classes", text: "200K+ users overall and 1,000+ daily users; designed for 500+ students starting a test series in the same slot, with rank and chapter-wise analytics read from a Redis cache." },
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "Redis", "RabbitMQ"],
    faqs: [
      {
        q: "How do you stop students from cheating the exam timer?",
        a: "The server owns the deadline. Each answer is written to a Redis-held session as it is selected, and the server auto-submits the attempt when time is up, whatever the client clock says. Editing the system clock or backgrounding the tab cannot extend an attempt.",
      },
      cost(PRICES[4]),
    ],
    note: { slug: "server-authoritative-exam-timer-with-redis", label: "Building a server-authoritative exam timer with Redis" },
    price: PRICES[4],
  },
]

export const getService = (slug: string): Service | undefined => SERVICES.find((s) => s.slug === slug)
