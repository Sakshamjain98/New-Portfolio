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
  openGraph: { title, description, url: "/work/uddeshhya" },
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
          area: "Frontend",
          detail:
            "Public site — registration flows, donor directory, and every content page rendering from that data.",
        },
      ]}
      highlights={[
        "Donor contact gated behind a request step",
        "Templated PDF certificates, generated automatically",
        "Content as data — no deploy for a team update",
        "Built and shipped solo, end to end",
      ]}
      complexity={[
        {
          problem:
            "In a blood-donation emergency, someone needs to find a matching donor by blood group and city fast — but listing every donor's phone number in the open isn't something a volunteer directory should do.",
          approach:
            "Built a donor directory filterable by blood group and city, with contact details released through a request step rather than published on the page.",
        },
        {
          problem:
            "Every volunteer and blood donation earns a certificate with that person's name and date on it — generating those by hand doesn't scale past a handful of people.",
          approach:
            "Templated PDF generation triggered on registration/donation confirmation, so certificates are produced and downloadable automatically instead of assembled manually per person.",
        },
        {
          problem:
            "The NGO's own team, not developers, needs to publish new projects, gallery photos, and blog posts — and shouldn't need a code deploy to do it.",
          approach:
            "Modeled projects, gallery, and blog content as data the frontend renders, so the team edits content directly instead of routing every update through me.",
        },
      ]}
      flows={[
        {
          title: "Volunteer / donor registration",
          steps: [
            { label: "Registration form", note: "Volunteer or donor" },
            { label: "Registration API" },
            { label: "Donor directory", note: "Filterable by group + city" },
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
      stack={["Next.js", "Node.js", "Express", "MongoDB", "PDF Generation"]}
    />
  )
}
