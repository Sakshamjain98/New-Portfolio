"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react"
import { ChartBarIcon, XIcon } from "@phosphor-icons/react"

import { PROFILE_STATS, PROFILE_STATS_ROLE } from "@/lib/content"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

export function ProfileStats({ className }: Props): React.ReactElement {
  const [collapsed, setCollapsed] = React.useState(false)
  const prefersReducedMotion = useReducedMotion()

  const fadeTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 0.18,
        ease: "easeOut",
      }

  const fade = {
    initial: prefersReducedMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: fadeTransition,
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      {collapsed ? (
        <motion.button
          key="pill"
          type="button"
          onClick={() => setCollapsed(false)}
          aria-expanded={false}
          aria-label="Show career snapshot"
          {...fade}
          className={cn(
            "caption-uppercase inline-flex items-center gap-2 rounded-full border border-overlay-cream/15 bg-overlay-ink/55 px-3.5 py-2 text-overlay-cream/85 shadow-sm backdrop-blur-[10px] transition-colors hover:text-overlay-cream focus-visible:ring-2 focus-visible:ring-overlay-cream/45 focus-visible:outline-none",
            className
          )}
        >
          <ChartBarIcon
            size={14}
            weight="regular"
            className="shrink-0 text-overlay-cream/60"
            aria-hidden
          />
          <span className="truncate">Snapshot</span>
        </motion.button>
      ) : (
        <motion.aside
          key="panel"
          aria-label="Career snapshot"
          {...fade}
          className={cn(
            "w-[280px] overflow-hidden rounded-xl border border-overlay-cream/15 bg-overlay-ink/55 p-5 text-overlay-cream shadow-sm backdrop-blur-[10px]",
            className
          )}
        >
          <div className="flex min-w-0 items-center justify-between gap-3 whitespace-nowrap">
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              aria-label="Hide career snapshot"
              className="caption-uppercase inline-flex min-w-0 items-center gap-2 rounded-full text-overlay-cream/85 transition-colors hover:text-overlay-cream focus-visible:ring-2 focus-visible:ring-overlay-cream/45 focus-visible:outline-none"
            >
              <ChartBarIcon
                size={14}
                weight="regular"
                className="shrink-0 text-overlay-cream/60"
                aria-hidden
              />
              <span className="truncate">Snapshot</span>
            </button>

            <button
              type="button"
              onClick={() => setCollapsed(true)}
              aria-label="Hide career snapshot"
              className="-mr-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-overlay-cream/55 transition-colors hover:bg-overlay-cream/10 hover:text-overlay-cream focus-visible:ring-2 focus-visible:ring-overlay-cream/45 focus-visible:outline-none"
            >
              <XIcon size={13} weight="bold" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-overlay-cream/12 pt-4">
            {PROFILE_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-[22px] leading-none tracking-[-0.02em]">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[11px] leading-snug text-overlay-cream/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-overlay-cream/12 pt-3">
            <p className="font-mono text-[11px] tracking-[0.04em] text-overlay-cream/55">
              {PROFILE_STATS_ROLE}
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
