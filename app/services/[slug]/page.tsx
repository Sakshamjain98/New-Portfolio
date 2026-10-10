import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/json-ld"
import { SectionShell } from "@/components/section-shell"
import { getArticle } from "@/lib/articles"
import { APPROACH_STEPS } from "@/lib/content"
import { SERVICES, getService } from "@/lib/services"
import { serviceGraph } from "@/lib/seo"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug)
  if (!s) return {}
  const url = `/services/${s.slug}`
  return {
    title: s.seoTitle,
    description: s.description,
    alternates: { canonical: url },
    openGraph: { title: s.seoTitle, description: s.description, url, siteName: "Saksham Jain", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: s.seoTitle }] },
    twitter: { card: "summary_large_image", title: s.seoTitle, description: s.description, images: ["/og.png"] },
  }
}

export default async function ServicePage({ params }: Props): Promise<React.ReactElement> {
  const s = getService((await params).slug)
  if (!s) notFound()
  const note = s.note && getArticle(s.note.slug)

  return (
    <main className="pt-28 pb-28 sm:pt-32">
      <JsonLd data={serviceGraph(s)} />
      <SectionShell>
        <article className="max-w-[760px]">
          <Link href="/services" className="text-sm text-muted-ink transition-colors hover:text-ink">← All services</Link>
          <h1 className="mt-8 text-[clamp(2rem,4.6vw,3.25rem)] tracking-[-0.025em]">{s.title}</h1>
          <p className="mt-6 text-[19px] leading-[1.6] text-ink">{s.answer}</p>
          <p className="mt-4 text-[15px] text-body">Works with technology companies, startups and product teams in India and internationally, remotely.</p>
          <p className="mt-6">
            <Link href="/#contact" className="inline-block rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">Describe your project</Link>
          </p>

          <h2 className="mt-14 text-[22px] text-ink">What you get</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] text-body">
            {s.deliverables.map((d) => <li key={d}>{d}</li>)}
          </ul>

          <h2 className="mt-14 text-[22px] text-ink">Proof from shipped products</h2>
          <ul className="mt-4 space-y-3 text-[16px] text-body">
            {s.proof.map((p) => (
              <li key={p.href}><Link href={p.href} className="text-ink underline underline-offset-2">{p.label}</Link>: {p.text}</li>
            ))}
          </ul>

          <h2 className="mt-14 text-[22px] text-ink">How the work runs</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-[16px] text-body">
            {APPROACH_STEPS.map((a) => <li key={a.t}><span className="text-ink">{a.t}.</span> {a.d}</li>)}
          </ol>

          <h2 className="mt-14 text-[22px] text-ink">Stack</h2>
          <p className="mt-3 text-[16px] text-body">{s.stack.join(" · ")}</p>

          <h2 className="mt-14 text-[22px] text-ink">Common questions</h2>
          {s.faqs.map((f) => (
            <section key={f.q} className="mt-6">
              <h3 className="text-[18px] text-ink">{f.q}</h3>
              <p className="mt-2 text-[16px] leading-[1.65] text-body">{f.a}</p>
            </section>
          ))}

          {note ? (
            <p className="mt-12 text-[16px] text-body">
              Related engineering note: <Link href={`/blog/${note.slug}`} className="text-ink underline underline-offset-2">{note.title}</Link>
            </p>
          ) : null}
          <p className="mt-6 text-[16px] text-body">
            Built by <Link href="/about" className="text-ink underline underline-offset-2">Saksham Jain</Link>, full-stack web developer. <Link href="/#contact" className="text-ink underline underline-offset-2">Start a project</Link>.
          </p>
        </article>
      </SectionShell>
    </main>
  )
}
