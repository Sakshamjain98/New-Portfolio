import * as React from "react"

import { cn } from "@/lib/utils"

export type FlowStep = {
  label: string
  note?: string
}

export type FlowRow = {
  /** Short label above the row, e.g. "Booking flow" — omit for a single-flow diagram. */
  title?: string
  steps: readonly FlowStep[]
}

/**
 * Minimal HLD-style pipeline diagram: boxes connected by arrows, reusing the
 * site's existing tokens (hairline borders, mono labels) instead of a custom
 * SVG renderer. Wraps on narrow screens since it's plain flexbox.
 */
export function FlowDiagram({
  rows,
  className,
}: {
  rows: readonly FlowRow[]
  className?: string
}): React.ReactElement {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {rows.map((row, i) => (
        <div key={row.title ?? i}>
          {row.title ? (
            <div className="eyebrow mb-3 text-muted-ink uppercase">
              {row.title}
            </div>
          ) : null}
          <div className="flex flex-wrap items-stretch gap-x-2 gap-y-3">
            {row.steps.map((step, j) => (
              <React.Fragment key={step.label}>
                {j > 0 ? (
                  <span
                    aria-hidden
                    className="flex shrink-0 items-center text-muted-soft"
                  >
                    →
                  </span>
                ) : null}
                <div className="min-w-[9rem] flex-1 rounded-lg border border-hairline bg-surface-card px-3 py-2.5 sm:flex-none">
                  <div className="text-[13px] leading-snug font-medium text-ink">
                    {step.label}
                  </div>
                  {step.note ? (
                    <div className="mt-1 text-[11px] leading-snug text-muted-ink">
                      {step.note}
                    </div>
                  ) : null}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
