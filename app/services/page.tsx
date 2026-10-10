import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/json-ld"
import { SectionShell } from "@/components/section-shell"
import { SERVICES } from "@/lib/services"
import { SITE_URL } from "@/lib/seo"

const title = "Full-stack development services"
const description =
  "Hire a full-stack developer for ERP and warehouse systems, SaaS products, booking systems, e-commerce and ticketing platforms, and online exam platforms."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services", siteName: "Saksham Jain", type: "website", images: [{ url: "/og.png", width: 1665, height: 983, alt: title }] },
}

export default function Services(): React.ReactElement {
  return (
    <main className="pt-28 pb-28 sm:pt-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ItemList",
              name: title,
              itemListElement: SERVICES.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/services/${s.slug}`, name: s.title })),
            },
            { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` }] },
          ],
        }}
      />
      <SectionShell>
        <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.025em]">{title}</h1>
        <p className="mt-4 max-w-[62ch] text-[17px] text-body">{description}</p>
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.slug} className="border-t border-hairline pt-5">
              <Link href={`/services/${s.slug}`} className="text-xl tracking-[-0.01em] text-ink underline-offset-2 hover:underline">{s.title}</Link>
              <p className="mt-2 text-body">{s.description}</p>
            </li>
          ))}
        </ul>
      </SectionShell>
    </main>
  )
}
