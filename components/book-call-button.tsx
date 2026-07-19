"use client"

import * as React from "react"
import { getCalApi } from "@calcom/embed-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CAL_LINK = `${process.env.NEXT_PUBLIC_CAL_USERNAME}/${process.env.NEXT_PUBLIC_CAL_EVENT_SLUG}`

// Cal's embed queues a single global config; running it from every mounted
// button instance races "ui" commands against iframe creation, so only the
// first instance on the page configures it.
let uiConfigured = false

type Props = {
  children: React.ReactNode
  className?: string
  variant?: React.ComponentProps<typeof Button>["variant"]
  theme?: "light" | "dark"
}

export function BookCallButton({
  children,
  className,
  variant = "default",
  theme = "light",
}: Props): React.ReactElement {
  React.useEffect(() => {
    if (uiConfigured) return
    uiConfigured = true
    let cancelled = false
    void (async () => {
      const cal = await getCalApi()
      if (cancelled) return
      cal("ui", {
        theme,
        cssVarsPerTheme: {
          light: { "cal-brand": "#f54e00" },
          dark: { "cal-brand": "#f54e00" },
        },
      })
    })()
    return () => {
      cancelled = true
    }
  }, [theme])

  return (
    <Button
      asChild
      variant={variant}
      className={cn("cursor-pointer", className)}
    >
      <button
        type="button"
        data-cal-link={CAL_LINK}
        data-cal-config='{"layout":"month_view"}'
      >
        {children}
      </button>
    </Button>
  )
}
