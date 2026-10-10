import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/json-ld"
import { SectionShell } from "@/components/section-shell"
import { APPROACH_STEPS } from "@/lib/content"
import { SERVICES } from "@/lib/services"
import { SITE_URL } from "@/lib/seo"

const title = "Pricing and timelines for full-stack projects"
const description =
  "Indicative price ranges and timelines for ERP and warehouse systems, SaaS, booking systems, e-commerce and exam platforms, with what drives the final quote."

export const metadata: Metadata = {
  title: { absolute: "Full-Stack Development Pricing and Timelines · Saksham Jain" },
  description,
  alternates: { canonical: "/pricing" },
  openGraph: { title, description, url: "/pricing", siteName: "Saksham Jain", type: "website", images: [{ url: "/og.png", width: 1665, height: 983, alt: title }] },
}

export default function Pricing(): React.ReactElement {
  return (
    <main className="pt-28 pb-28 sm:pt-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE_URL}/pricing` }] },
          ],
        }}
      />
      <SectionShell>
        <article className="max-w-[820px]">
          <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.025em]">{title}</h1>
          <p className="mt-6 text-[19px] leading-[1.6] text-ink">
            Most full-stack projects here run from about $950 for a focused booking system to $9,400 for a large ERP or warehouse platform, over 4 to 20 weeks. These are indicative ranges; a fixed quote follows a requirements conversation, before any build starts.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr>
                  {["Project", "Indicative range (USD)", "Approx. INR", "Timeline"].map((h) => (
                    <th key={h} className="border-b border-hairline py-2 pr-4 font-medium text-ink">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((s) => (
                  <tr key={s.slug}>
                    <td className="border-b border-hairline-soft py-2 pr-4 align-top text-ink"><Link href={`/services/${s.slug}`} className="underline underline-offset-2">{s.title}</Link></td>
                    <td className="border-b border-hairline-soft py-2 pr-4 align-top text-body">{s.price.usd}</td>
                    <td className="border-b border-hairline-soft py-2 pr-4 align-top text-body">{s.price.inr}</td>
                    <td className="border-b border-hairline-soft py-2 align-top text-body">{s.price.weeks} weeks</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-14 text-[22px] text-ink">What changes the price?</h2>
          <p className="mt-3 text-[17px] leading-[1.65] text-ink">
            Four things move the number most: how many user roles and permissions the system needs, how many workflows and screens, how many third-party integrations such as payments or WhatsApp, and the deadline. A clear scope up front keeps the estimate accurate.
          </p>

          <h2 className="mt-14 text-[22px] text-ink">How does a project run?</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-[16px] text-body">
            {APPROACH_STEPS.map((a) => <li key={a.t}><span className="text-ink">{a.t}.</span> {a.d}</li>)}
          </ol>

          <h2 className="mt-14 text-[22px] text-ink">Do you work with international clients and on full-time roles?</h2>
          <p className="mt-3 text-[17px] leading-[1.65] text-ink">
            Yes to both. Saksham works with technology companies and product teams in India and internationally, remotely, and is also open to full-time roles. Include your time zone and timeline when you reach out.
          </p>
          <p className="mt-8"><Link href="/#contact" className="inline-block rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">Get a scoped estimate</Link></p>
        </article>
      </SectionShell>
    </main>
  )
}
