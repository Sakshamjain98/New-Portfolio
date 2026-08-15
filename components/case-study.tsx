import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { FlowDiagram, type FlowRow } from "@/components/flow-diagram"
import { SectionShell } from "@/components/section-shell"
import type { Project } from "@/lib/content"
import { cn } from "@/lib/utils"

export type ComplexityItem = {
  /** The hard part, stated as a concrete failure mode — not a vague "scale" claim. */
  problem: string
  /** What actually shipped to address it. */
  approach: string
}

export type OwnershipArea = {
  /** Architecture layer, e.g. "API & data model" — not a vague "everything". */
  area: string
  detail: string
}

export type CaseStudyData = {
  project: Project
  liveUrl: string
  liveLabel: string
  roleFacts: readonly { k: string; v: string }[]
  overview: React.ReactNode
  role: React.ReactNode
  /** What I personally owned, broken down by layer — sits in the sidebar next to Stack. */
  ownership: readonly OwnershipArea[]
  /** Short, skimmable engineering properties this build had to satisfy — sidebar chips. */
  highlights: readonly string[]
  complexity: readonly ComplexityItem[]
  flows?: readonly FlowRow[]
  shipped: readonly string[]
  stack: readonly string[]
}

/** Diagonal external-link arrow, drawn inline so case study pages stay server components. */
function ArrowUpRight({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={cn("size-3.5", className)}
      aria-hidden
    >
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CaseStudyPage({
  project,
  liveUrl,
  liveLabel,
  roleFacts,
  overview,
  role,
  ownership,
  highlights,
  complexity,
  flows,
  shipped,
  stack,
}: CaseStudyData): React.ReactElement {
  return (
    <main className="pt-28 pb-28 sm:pt-32">
      <SectionShell>
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 text-sm text-muted-ink transition-colors hover:text-ink"
        >
          <ArrowUpRight className="-rotate-135 transition-transform group-hover:-translate-x-0.5" />
          Back to work
        </Link>

        <div className="mt-10 flex items-center gap-3">
          <span className="eyebrow text-muted-ink">/ {project.index}</span>
          <span className="eyebrow text-ink uppercase">Case study</span>
          {project.yearHref ? (
            <a
              href={project.yearHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] tracking-widest text-muted-ink underline decoration-hairline-strong underline-offset-2 transition-colors hover:text-ink"
            >
              {project.year}
              <ArrowUpRight className="size-2.5" />
            </a>
          ) : (
            <span className="ml-auto font-mono text-[11px] tracking-widest text-muted-ink">
              {project.year}
            </span>
          )}
        </div>

        <h1 className="mt-6 max-w-[22ch] text-[clamp(2.25rem,5vw,3.5rem)] tracking-[-0.025em]">
          {project.title}
        </h1>

        <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.65] text-body">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="rounded-full border-hairline px-2 font-mono text-[10px] tracking-[0.12em] text-ink uppercase"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-8 inline-flex items-center gap-2 border-b border-transparent pb-0.5 text-sm font-medium text-ink transition-[gap,border-color] hover:gap-3 hover:border-ink"
        >
          {liveLabel}
          <ArrowUpRight className="transition-transform group-hover/link:translate-x-0.5" />
        </a>

        <div className="relative mt-14 aspect-16/10 overflow-hidden rounded-xl border border-hairline bg-surface-card sm:aspect-16/8">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1240px) 1240px, 100vw"
            className="object-cover object-top"
            priority
          />
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-hairline-soft pt-10 sm:grid-cols-4">
          {roleFacts.map((fact) => (
            <div key={fact.k}>
              <dt className="eyebrow text-muted-ink uppercase">{fact.k}</dt>
              <dd className="mt-2 text-[15px] text-ink">{fact.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-hairline-soft pt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <h2 className="text-[1.5rem] tracking-[-0.0125em]">Overview</h2>
            <div className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-body">
              {overview}
            </div>

            <h2 className="mt-12 text-[1.5rem] tracking-[-0.0125em]">
              My role
            </h2>
            <div className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-body">
              {role}
            </div>

            <h2 className="mt-12 text-[1.5rem] tracking-[-0.0125em]">
              The complexity
            </h2>
            <div className="mt-4 max-w-[62ch] space-y-6">
              {complexity.map((item) => (
                <div key={item.problem}>
                  <p className="text-[15px] leading-[1.6] text-ink">
                    <span className="font-medium">Problem — </span>
                    {item.problem}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-[1.6] text-body">
                    <span className="font-medium text-ink">Approach — </span>
                    {item.approach}
                  </p>
                </div>
              ))}
            </div>

            {flows && flows.length > 0 ? (
              <>
                <h2 className="mt-12 text-[1.5rem] tracking-[-0.0125em]">
                  Architecture
                </h2>
                <div className="mt-6 max-w-[68ch]">
                  <FlowDiagram rows={flows} />
                </div>
              </>
            ) : null}

            <h2 className="mt-12 text-[1.5rem] tracking-[-0.0125em]">
              What shipped
            </h2>
            <ul className="mt-4 max-w-[62ch] list-none space-y-3">
              {shipped.map((item) => (
                <li
                  key={item}
                  className="mono-bullet flex items-start gap-3 text-[15px] leading-[1.6] text-body before:mt-2.5 before:shrink-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-12 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <div>
              <h2 className="text-[1.5rem] tracking-[-0.0125em]">
                What I owned
              </h2>
              <dl className="mt-4 space-y-5">
                {ownership.map((item) => (
                  <div
                    key={item.area}
                    className="border-l-2 border-hairline-strong pl-4"
                  >
                    <dt className="text-[13px] font-medium text-ink">
                      {item.area}
                    </dt>
                    <dd className="mt-1 text-[13px] leading-[1.55] text-muted-ink">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="text-[1.5rem] tracking-[-0.0125em]">
                Engineering properties
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="mono-bullet flex items-start gap-3 text-[13px] leading-normal text-body before:mt-2 before:shrink-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[1.5rem] tracking-[-0.0125em]">Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="rounded-full border-hairline px-2.5 py-1 font-mono text-[10px] tracking-widest text-ink uppercase"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  )
}
