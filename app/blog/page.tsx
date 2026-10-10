import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/json-ld"
import { SectionShell } from "@/components/section-shell"
import { ARTICLES } from "@/lib/articles"
import { SITE_URL, PERSON_ID, WEBSITE_ID } from "@/lib/seo"

const title = "Engineering notes"
const description =
  "Practical answers from production full-stack work: preventing overselling, optimistic vs pessimistic locking, idempotent webhooks, exam timers and multi-vertical booking."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, url: "/blog", siteName: "Saksham Jain", type: "website", images: [{ url: "/og.png", width: 1665, height: 983, alt: title }] },
}

export default function BlogIndex(): React.ReactElement {
  return (
    <main className="pt-28 pb-28 sm:pt-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              "@id": `${SITE_URL}/blog#blog`,
              url: `${SITE_URL}/blog`,
              name: "Saksham Jain: engineering notes",
              isPartOf: { "@id": WEBSITE_ID },
              author: { "@id": PERSON_ID },
              blogPost: ARTICLES.map((a) => ({ "@type": "BlogPosting", headline: a.title, url: `${SITE_URL}/blog/${a.slug}`, datePublished: a.published })),
            },
            { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: title, item: `${SITE_URL}/blog` }] },
          ],
        }}
      />
      <SectionShell>
        <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.025em]">{title}</h1>
        <p className="mt-4 max-w-[60ch] text-[17px] text-body">{description}</p>
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {ARTICLES.map((a) => (
            <li key={a.slug} className="border-t border-hairline pt-5">
              <Link href={`/blog/${a.slug}`} className="text-xl tracking-[-0.01em] text-ink underline-offset-2 hover:underline">{a.title}</Link>
              <p className="mt-2 text-body">{a.description}</p>
              <p className="mt-2 font-mono text-[11px] tracking-widest text-muted-ink uppercase">{a.published} · {a.project.title}</p>
            </li>
          ))}
        </ul>
      </SectionShell>
    </main>
  )
}
