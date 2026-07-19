"use client"

import * as React from "react"
import { ArrowUpRightIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const PROJECT_TYPES = [
  "Enterprise SaaS",
  "ERP / Workflow system",
  "Warehouse / Inventory system",
  "Web application",
  "Other",
]

type Status = "idle" | "submitting" | "success" | "error"

export function ContactForm(): React.ReactElement {
  const [status, setStatus] = React.useState<Status>("idle")
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setError(null)

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? "Something went wrong.")
      }
      setStatus("success")
      form.reset()
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-hairline-strong bg-surface-card p-6 text-sm text-body">
        <p className="text-ink">Message sent — thanks for reaching out.</p>
        <p className="mt-1">
          I&apos;ll reply within a day or two. A confirmation is on its way to
          your inbox.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot — hidden from real visitors, catches simple bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm text-muted-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="h-11 w-full rounded-md border border-hairline-strong bg-surface-card px-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm text-muted-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="h-11 w-full rounded-md border border-hairline-strong bg-surface-card px-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="projectType" className="text-sm text-muted-ink">
          Project type
        </label>
        <select
          id="projectType"
          name="projectType"
          defaultValue={PROJECT_TYPES[0]}
          className="h-11 w-full rounded-md border border-hairline-strong bg-surface-card px-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm text-muted-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded-md border border-hairline-strong bg-surface-card px-3 py-2 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "h-11 w-fit rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary-active"
        )}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        <ArrowUpRightIcon size={14} weight="bold" />
      </Button>
    </form>
  )
}
