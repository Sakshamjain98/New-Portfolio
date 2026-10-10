import type { Metadata } from "next"

import { CaseStudyPage } from "@/components/case-study"
import { PROJECTS } from "@/lib/content"

const project = PROJECTS.find((p) => p.title === "Uddeshhya")!

const title = "Uddeshhya — Case Study"
const description =
  "Website for a student-led NGO. Full-stack work on the volunteer/donor portal, automated certificate generation, and editable content pages."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/uddeshhya" },
  openGraph: {
    title,
    description,
    url: "/work/uddeshhya",
    siteName: "Saksham Jain",
    type: "article",
    images: [{ url: project.image, alt: project.imageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
}

export default function Uddeshhya(): React.ReactElement {
  return (
    <CaseStudyPage
      project={project}
      liveUrl="https://uddeshhya.in"
      liveLabel="Visit uddeshhya.in"
      roleFacts={[
        { k: "Role", v: "Full-stack Developer" },
        { k: "Focus", v: "Volunteer & donor portal" },
        { k: "Year", v: "2023" },
        { k: "Status", v: "Live" },
      ]}
      overview={
        <p>
          Uddeshhya is a student-led NGO founded at KIET, running education,
          welfare, and blood-donation initiatives across village schools and
          the surrounding community. The site is the NGO&apos;s public face
          and its operational backbone: volunteer registration, a blood
          donor/donation portal, automated certificates, and project, gallery,
          and blog pages the team keeps updated themselves.
        </p>
      }
      role={
        <p>
          I built the site end to end as a full-stack developer — volunteer
          and donor registration, the certificate-generation pipeline, and
          the project/gallery/blog pages the NGO&apos;s own team publishes
          to, without needing a developer for every content change.
        </p>
      }
      ownership={[
        {
          area: "API & data model",
          detail:
            "Volunteer/donor registration, the blood-group + city donor directory, and the certificate-generation pipeline.",
        },
        {
          area: "Content model",
          detail:
            "Projects, gallery, and blog modeled as editable data so the NGO's team publishes without a deploy.",
        },
        {
          area: "Infrastructure",
          detail:
            "Redis cache in front of the donor-group lookup — the one query worth caching on a site this size.",
        },
        {
          area: "Frontend",
          detail:
            "Public site — registration flows, donor directory, and every content page rendering from that data.",
        },
      ]}
      highlights={[
        "Donor directory reads cached in Redis, sub-100ms lookup",
        "Donor contact gated behind a request step",
        "Templated PDF certificates, generated automatically",
        "Content as data — no deploy for a team update",
      ]}
      complexity={[
        {
          problem:
            "In a blood-donation emergency, someone needs to find a matching donor by blood group and city fast — every filtered lookup hitting MongoDB directly adds latency exactly when it matters most, and listing every donor's phone number in the open isn't something a volunteer directory should do either.",
          approach:
            "The blood-group + city donor query is cached in Redis and invalidated on new registrations, so lookups stay fast without re-scanning the donor collection on every search — with contact details released through a request step rather than published on the page.",
        },
        {
          problem:
            "Every volunteer and blood donation earns a certificate with that person's name and date on it — generating those by hand doesn't scale past a handful of people, and a donation drive can produce 50+ certificate requests in a single afternoon.",
          approach:
            "Templated PDF generation triggered on registration/donation confirmation, so certificates are produced and downloadable automatically instead of assembled manually per person, one at a time, after every drive.",
        },
        {
          problem:
            "The NGO's own team, not developers, needs to publish new projects, gallery photos, and blog posts — and shouldn't need a code deploy to do it.",
          approach:
            "Modeled projects, gallery, and blog content as data the frontend renders, so the team edits content directly instead of routing every update through me. Deliberately skipped a message queue and heavier caching here — a volunteer-run site with no concurrent-checkout problem doesn't need it, and the boring version is the one the NGO's team can reason about without me.",
        },
      ]}
      flows={[
        {
          title: "Volunteer / donor registration",
          steps: [
            { label: "Registration form", note: "Volunteer or donor" },
            { label: "Registration API" },
            { label: "Donor directory", note: "Redis-cached, group + city" },
            { label: "Certificate service", note: "Templated PDF" },
            { label: "Email delivery" },
          ],
        },
        {
          title: "Content publishing",
          steps: [
            { label: "NGO team", note: "Non-technical" },
            { label: "Content entry", note: "Projects / gallery / blog" },
            { label: "Content API" },
            { label: "Public pages", note: "No code deploy needed" },
          ],
        },
      ]}
      shipped={[
        "Volunteer registration and blood donor portal, filterable by blood group and city.",
        "Automated certificate generation for volunteers and donors.",
        "Project, gallery, and blog pages backed by editable content — no code deploy needed.",
        "Donation-drive flows: birthday-for-a-cause, raise-an-issue, and community collaborations.",
      ]}
      stack={[
        "Next.js",
        "Node.js",
        "Express",
        "MongoDB",
        "Redis",
        "PDF Generation",
      ]}
    />
  )
}
