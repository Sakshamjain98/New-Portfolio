import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/json-ld"
import { SectionShell } from "@/components/section-shell"
import { ABOUT_META, FAQS, PROJECTS, STACK_PANES } from "@/lib/content"
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, MEDIUM_URL, PERSON_ID, SITE_URL, WEBSITE_ID, X_URL } from "@/lib/seo"

const title = "About the developer"
const description =
  "Saksham Jain is a full-stack web developer in India building enterprise SaaS, ERP and warehouse systems. Background, projects, stack and how to get in touch."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about", siteName: "Saksham Jain", type: "profile", images: [{ url: "/og.png", width: 1200, height: 630, alt: title }] },
}

export default function About(): React.ReactElement {
  return (
    <main className="pt-28 pb-28 sm:pt-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "AboutPage", "@id": `${SITE_URL}/about#page`, url: `${SITE_URL}/about`, name: title, isPartOf: { "@id": WEBSITE_ID }, about: { "@id": PERSON_ID }, mainEntity: { "@id": PERSON_ID } },
            { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` }] },
          ],
        }}
      />
      <SectionShell>
        <article className="max-w-[760px]">
          <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.025em]">About Saksham Jain</h1>
          <p className="mt-6 text-[19px] leading-[1.6] text-ink">{FAQS[0].a}</p>
          <p className="mt-4 text-[17px] leading-[1.65] text-body">
            He works across backend architecture and APIs through to the user interface, and enjoys delivering complete products that are reliable, maintainable and ready for production.
          </p>

          <h2 className="mt-12 text-[22px] text-ink">At a glance</h2>
          <dl className="mt-4 border-t border-hairline">
            {ABOUT_META.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-hairline py-3 text-[15px]">
                <dt className="text-muted-ink">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 text-[22px] text-ink">What has Saksham Jain built?</h2>
          <p className="mt-3 text-[17px] leading-[1.65] text-ink">{FAQS[1].a}</p>
          <ul className="mt-4 space-y-3 text-body">
            {PROJECTS.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="text-ink underline underline-offset-2">{p.title}</Link> ({p.year}): {p.description}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-[22px] text-ink">Which tech stack does he use?</h2>
          <p className="mt-3 text-[17px] leading-[1.65] text-ink">{FAQS[2].a}</p>
          <ul className="mt-4 space-y-1 text-body">
            {STACK_PANES.map((p) => (
              <li key={p.title}><span className="text-ink">{p.title}:</span> {p.items.map(([n]) => n).join(", ")}</li>
            ))}
          </ul>

          <h2 className="mt-12 text-[22px] text-ink">{FAQS[4].q}</h2>
          <p className="mt-3 text-[17px] leading-[1.65] text-ink">{FAQS[4].a}</p>

          <h2 className="mt-12 text-[22px] text-ink">How can you contact Saksham Jain?</h2>
          <p className="mt-3 text-[17px] leading-[1.65] text-ink">{FAQS[3].a}</p>
          <ul className="mt-4 space-y-1 text-body">
            <li>Email: <a className="underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li>LinkedIn: <a className="underline underline-offset-2" href={LINKEDIN_URL} rel="me noopener noreferrer">{LINKEDIN_URL.replace("https://www.", "")}</a></li>
            <li>X: <a className="underline underline-offset-2" href={X_URL} rel="me noopener noreferrer">x.com/codewithSJ</a></li>
            <li>Medium: <a className="underline underline-offset-2" href={MEDIUM_URL} rel="me noopener noreferrer">medium.com/@sakshamdevs007</a></li>
            <li>GitHub: <a className="underline underline-offset-2" href={GITHUB_URL} rel="me noopener noreferrer">{GITHUB_URL.replace("https://", "")}</a></li>
            <li><Link className="underline underline-offset-2" href="/#contact">Contact form</Link> · <Link className="underline underline-offset-2" href="/blog">Engineering notes</Link></li>
          </ul>
        </article>
      </SectionShell>
    </main>
  )
}
