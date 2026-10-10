import type { Metadata } from "next"

import { CaseStudyPage } from "@/components/case-study"
import { PROJECTS } from "@/lib/content"

const project = PROJECTS.find((p) => p.title === "Skyxis")!

const title = "Skyxis — Case Study"
const description =
  "D2C e-commerce storefront for premium wireless audio. Full-stack work on the cart/wishlist merge, checkout, and centralized pricing."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/skyxis" },
  openGraph: {
    title,
    description,
    url: "/work/skyxis",
    siteName: "Saksham Jain",
    type: "article",
    images: [{ url: project.image, alt: project.imageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
}

export default function Skyxis(): React.ReactElement {
  return (
    <CaseStudyPage
      project={project}
      liveUrl="https://skysix-new-main.vercel.app/"
      liveLabel="Visit Skyxis"
      roleFacts={[
        { k: "Role", v: "Full-stack Developer" },
        { k: "Focus", v: "Catalog, cart & checkout" },
        { k: "Year", v: "2026" },
        { k: "Status", v: "Production" },
      ]}
      overview={
        <p>
          Skyxis is a direct-to-consumer e-commerce storefront for premium
          wireless audio — headphones, earbuds, and accessories. The site
          covers the full retail loop: category and product browsing, quick
          view, wishlist, cart, and checkout, with featured, deals, and
          new-arrivals rails pulling from the same product catalog.
        </p>
      }
      role={
        <p>
          I worked as a full-stack developer on Skyxis, building the product
          catalog and category browsing, the cart and wishlist (for both
          guest and logged-in shoppers), and the checkout flow through to
          order confirmation. Most of the actual complexity sat in keeping
          cart state, stock, and price consistent across a guest session,
          checkout, and payment.
        </p>
      }
      ownership={[
        {
          area: "API & data model",
          detail:
            "Server-side pricing engine (base price, discount, promo) and the guest-to-account cart/wishlist merge logic.",
        },
        {
          area: "Infrastructure",
          detail:
            "Redis cache in front of the product catalog, and a RabbitMQ queue driving order fulfillment after payment.",
        },
        {
          area: "Integrations",
          detail:
            "Payment gateway checkout with an inventory recheck gating it, not a trust-the-listing-page shortcut.",
        },
        {
          area: "Frontend",
          detail:
            "Product catalog, category browsing, quick view, cart, wishlist, and checkout through to confirmation.",
        },
      ]}
      highlights={[
        "Guest cart merges into account cart on login, no data loss",
        "Optimistic locking on stock, retries instead of blocking",
        "Redis-cached catalog, invalidated on price/stock change",
        "RabbitMQ decouples order fulfillment from checkout",
      ]}
      complexity={[
        {
          problem:
            "A guest's cart and wishlist need to survive a page refresh, then merge cleanly into their account the instant they log in — without silently dropping items from either side.",
          approach:
            "Cart and wishlist persist client-side for guests and merge into the server-side cart on login as a union of both, not an overwrite, so nothing gets lost in either direction.",
        },
        {
          problem:
            "\"In Stock\" and \"Only N left\" badges are read at listing time, but inventory can change by the time someone reaches checkout — a stale badge shouldn't let someone pay for something that's already gone, and with a wide catalog checking out concurrently, holding a database lock per checkout doesn't scale the way it does on a single hot event.",
          approach:
            "Inventory is re-checked at checkout with optimistic locking — a version field on the stock row — rather than trusted from the listing page or held behind a pessimistic lock: went optimistic here, not pessimistic like a single flash-sale item, because carts across hundreds of different SKUs rarely contend for the same row, so a lock held for the checkout window would cost more than the rare retry does. Holds correct under 100+ concurrent checkouts across the catalog.",
        },
        {
          problem:
            "Price, discount percentage, and active promo codes need to agree across listing, cart, and checkout — a client-computed price drifts the moment a promo or discount changes, and recomputing pricing from MongoDB on every listing page view adds latency for data that changes rarely.",
          approach:
            "Pricing is computed server-side (base price, discount, active promo) and cached in Redis in front of the catalog, invalidated the moment a price or stock level changes, so listing pages stay fast without ever serving a price the client had to calculate itself.",
        },
        {
          problem:
            "Doing order confirmation, inventory write-down, and the email receipt inline in the checkout request makes the customer wait on work that isn't their payment.",
          approach:
            "Checkout publishes an \"order placed\" event to RabbitMQ the moment payment clears and returns immediately; a fulfillment consumer handles the email and downstream bookkeeping, so checkout latency isn't tied to how long the email provider takes to respond.",
        },
      ]}
      flows={[
        {
          title: "Cart to checkout",
          steps: [
            { label: "Product listing", note: "Redis-cached catalog" },
            { label: "Cart / wishlist", note: "Guest, merges on login" },
            { label: "Checkout" },
            { label: "Inventory recheck", note: "Optimistic lock, versioned" },
            { label: "Payment gateway" },
            { label: "RabbitMQ" },
            { label: "Fulfillment + email" },
          ],
        },
        {
          title: "Pricing consistency",
          steps: [
            { label: "Base price + discount + promo", note: "Server-owned" },
            { label: "Pricing engine", note: "Cached in Redis" },
            { label: "Listing" },
            { label: "Cart" },
            { label: "Checkout", note: "Same computed price, every screen" },
          ],
        },
      ]}
      shipped={[
        "Product catalog with category browsing, quick view, and wishlist.",
        "Guest cart with login-time merge into the account cart.",
        "Checkout with server-side inventory recheck and centralized pricing.",
        "Featured, deals, and new-arrivals rails driven by the same product API.",
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
