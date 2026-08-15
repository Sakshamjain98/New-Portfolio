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
  openGraph: { title, description, url: "/work/skyxis" },
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
        "Inventory rechecked at checkout, not trusted from listing",
        "Pricing computed server-side, never client-calculated",
        "Featured/deals/new-arrivals share one product API",
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
            "\"In Stock\" and \"Only N left\" badges are read at listing time, but inventory can change by the time someone reaches checkout — a stale badge shouldn't let someone pay for something that's already gone.",
          approach:
            "Inventory is re-checked at checkout rather than trusted from the listing page, so an out-of-stock item is caught before payment instead of after.",
        },
        {
          problem:
            "Price, discount percentage, and active promo codes need to agree across listing, cart, and checkout — a client-computed price drifts the moment a promo or discount changes.",
          approach:
            "Pricing is computed server-side (base price, discount, active promo) and returned to every screen, so the client displays a price it never has to calculate itself.",
        },
      ]}
      flows={[
        {
          title: "Cart to checkout",
          steps: [
            { label: "Product listing", note: "Category, quick view" },
            { label: "Cart / wishlist", note: "Guest, merges on login" },
            { label: "Checkout" },
            { label: "Inventory recheck" },
            { label: "Payment gateway" },
            { label: "Order confirmation" },
          ],
        },
        {
          title: "Pricing consistency",
          steps: [
            { label: "Base price + discount + promo", note: "Server-owned" },
            { label: "Pricing engine" },
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
      stack={["Next.js", "Node.js", "Express", "MongoDB", "Payment Gateway"]}
    />
  )
}
