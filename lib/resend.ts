import { Resend } from "resend"

export const resend = new Resend(process.env.RESEND_API_KEY)

export const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "no-reply@sakshamjain.codes"
export const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "sakshamjaindevs@gmail.com"

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

export type EnquiryPayload = {
  name: string
  email: string
  projectType: string
  message: string
}

export function enquiryNotificationEmail(enquiry: EnquiryPayload): {
  subject: string
  html: string
} {
  const { name, email, projectType, message } = enquiry
  return {
    subject: `New enquiry from ${name} · ${projectType}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="margin-bottom: 4px;">New portfolio enquiry</h2>
        <p style="color: #666; margin-top: 0;">${escapeHtml(projectType)}</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 6px 0; color: #666;">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Email</td><td>${escapeHtml(email)}</td></tr>
        </table>
        <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
      </div>
    `,
  }
}

export function enquiryConfirmationEmail(enquiry: EnquiryPayload): {
  subject: string
  html: string
} {
  const { name } = enquiry
  return {
    subject: "Got your message — Saksham Jain",
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
        <p>Hi ${escapeHtml(name)},</p>
        <p style="line-height: 1.6;">
          Thanks for reaching out — I've received your message and will reply
          within a day or two. If it's urgent, feel free to book a call
          directly from the portfolio.
        </p>
        <p style="line-height: 1.6;">— Saksham</p>
      </div>
    `,
  }
}
