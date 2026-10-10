import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/json-ld"
import { SectionShell } from "@/components/section-shell"
import { ARTICLES, getArticle } from "@/lib/articles"
import { articleGraph } from "@/lib/seo"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug)
  if (!a) return {}
  const url = `/blog/${a.slug}`
  return {
    title: { absolute: a.seoTitle ?? a.title },
    description: a.description,
    alternates: { canonical: url },
    openGraph: {
      title: a.title,
      description: a.description,
      url,
      siteName: "Saksham Jain",
      type: "article",
      publishedTime: a.published,
      modifiedTime: a.updated ?? a.published,
      authors: ["Saksham Jain"],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: a.title }],
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.description, images: ["/og.png"] },
  }
}

export default async function ArticlePage({ params }: Props): Promise<React.ReactElement> {
  const a = getArticle((await params).slug)
  if (!a) notFound()
  const others = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3)

  return (
    <main className="pt-28 pb-28 sm:pt-32">
      <JsonLd data={articleGraph(a)} />
      <SectionShell>
        <article className="max-w-[720px]">
          <Link href="/blog" className="text-sm text-muted-ink transition-colors hover:text-ink">
            ← All notes
          </Link>
          <h1 className="mt-8 text-[clamp(2rem,4.4vw,3rem)] tracking-[-0.025em]">{a.title}</h1>
          <p className="mt-4 font-mono text-[11px] tracking-widest text-muted-ink uppercase">
            By Saksham Jain · <time dateTime={a.published}>{a.published}</time>
            {a.updated ? <> · Updated <time dateTime={a.updated}>{a.updated}</time></> : null}
          </p>

          <p className="mt-8 text-[19px] leading-[1.6] text-ink">{a.answer}</p>
          <p className="mt-4 text-[15px] text-body">
            From the production case study{" "}
            <Link href={a.project.href} className="underline underline-offset-2">
              {a.project.title}
            </Link>
            .
          </p>

          {a.table ? (
            <div className="mt-10 overflow-x-auto">
              <table className="w-full border-collapse text-left text-[14px]">
                <thead>
                  <tr>
                    {a.table.head.map((h) => (
                      <th key={h} className="border-b border-hairline py-2 pr-4 font-medium text-ink">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {a.table.rows.map((r) => (
                    <tr key={r[0]}>
                      {r.map((c, i) => (
                        <td key={i} className="border-b border-hairline-soft py-2 pr-4 align-top text-body">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {a.sections.map((s) => (
            <section key={s.h} className="mt-12">
              <h2 className="text-[22px] tracking-[-0.015em] text-ink">{s.h}</h2>
              <p className="mt-3 text-[17px] leading-[1.65] text-ink">{s.answer}</p>
              {s.body?.map((p) => (
                <p key={p} className="mt-3 text-[16px] leading-[1.65] text-body">{p}</p>
              ))}
              {s.list ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-[16px] text-body">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              ) : null}
            </section>
          ))}

          <aside className="mt-16 border-t border-hairline pt-8">
            <h2 className="text-lg text-ink">More engineering notes</h2>
            <ul className="mt-3 space-y-2 text-body">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/blog/${o.slug}`} className="underline underline-offset-2">{o.title}</Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-body">
              Want this kind of engineering on your product? <Link href="/#contact" className="underline underline-offset-2">Get in touch</Link> or read <Link href="/about" className="underline underline-offset-2">about Saksham</Link>.
            </p>
          </aside>
        </article>
      </SectionShell>
    </main>
  )
}
