import crypto from "node:crypto"

import { NextResponse } from "next/server"

import { CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, resend } from "@/lib/resend"

type CalAttendee = { name?: string; email?: string; timeZone?: string }

type CalWebhookPayload = {
  triggerEvent?: string
  payload?: {
    title?: string
    startTime?: string
    attendees?: CalAttendee[]
    organizer?: { email?: string }
  }
}

function isValidSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.CAL_WEBHOOK_SECRET
  if (!secret) return true // signature check opted out until a secret is configured
  if (!signature) return false

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex")

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}

export async function POST(req: Request): Promise<NextResponse> {
  const rawBody = await req.text()
  const signature = req.headers.get("x-cal-signature-256")

  if (!isValidSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  const data = JSON.parse(rawBody) as CalWebhookPayload

  if (data.triggerEvent !== "BOOKING_CREATED") {
    return NextResponse.json({ ok: true })
  }

  const attendee = data.payload?.attendees?.[0]
  const title = data.payload?.title ?? "New booking"
  const startTime = data.payload?.startTime
  const when = startTime
    ? new Date(startTime).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : "Unknown time"

  await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    subject: `New Cal.com booking: ${title}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2>New call booked</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 0; color: #666;">Event</td><td>${title}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">When</td><td>${when}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Attendee</td><td>${attendee?.name ?? "Unknown"}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Email</td><td>${attendee?.email ?? "Unknown"}</td></tr>
        </table>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}
