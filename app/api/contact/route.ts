import { NextResponse } from "next/server"

import {
  CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL,
  enquiryConfirmationEmail,
  enquiryNotificationEmail,
  resend,
} from "@/lib/resend"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json().catch(() => null)

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  // Honeypot: a hidden field real visitors never fill in.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true })
  }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const projectType =
    typeof body.projectType === "string" && body.projectType.trim()
      ? body.projectType.trim()
      : "General enquiry"
  const message = typeof body.message === "string" ? body.message.trim() : ""

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Name, a valid email, and a message are required." },
      { status: 400 }
    )
  }

  const enquiry = { name, email, projectType, message }
  const notification = enquiryNotificationEmail(enquiry)
  const confirmation = enquiryConfirmationEmail(enquiry)

  const [toOwner, toSender] = await Promise.allSettled([
    resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: notification.subject,
      html: notification.html,
    }),
    resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: email,
      subject: confirmation.subject,
      html: confirmation.html,
    }),
  ])

  if (toOwner.status === "rejected") {
    console.error("Failed to send enquiry notification:", toOwner.reason)
    return NextResponse.json(
      { error: "Couldn't send your message. Please try again." },
      { status: 502 }
    )
  }

  if (toSender.status === "rejected") {
    console.error("Failed to send enquiry confirmation:", toSender.reason)
  }

  return NextResponse.json({ ok: true })
}
