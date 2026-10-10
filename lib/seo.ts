import { FAQS, PROJECTS, STACK_PANES } from "@/lib/content"

export const SITE_URL = "https://www.sakshamjain.codes"
export const SITE_NAME = "Saksham Jain"
export const SITE_DESCRIPTION =
  "Full-stack web developer with 2+ years of experience building enterprise SaaS, ERP, and warehouse management systems, from architecture to deployment."
export const GITHUB_URL = "https://github.com/Sakshamjain98"
export const CONTACT_EMAIL = "sakshamjaindevs@gmail.com"

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

// Every node below is built from the same data the pages render (content.ts),
// so structured data cannot drift from visible content.
export const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Associate Software Engineer",
  description: SITE_DESCRIPTION,
  email: `mailto:${CONTACT_EMAIL}`,
  worksFor: { "@type": "Organization", name: "MetaUpSpace", url: "https://www.metaupspace.com" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "KIET Group of Institutions" },
  knowsAbout: STACK_PANES.flatMap((p) => p.items.map(([name]) => name)),
  sameAs: [GITHUB_URL],
}

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
}

export const siteGraph = { "@context": "https://schema.org", "@graph": [personNode, websiteNode] }

export const homeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: `${SITE_NAME} · Full-stack Web Developer`,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
}

export function projectGraph(p: (typeof PROJECTS)[number]) {
  const url = `${SITE_URL}${p.href}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        url,
        name: p.title,
        description: p.description,
        dateCreated: p.year,
        keywords: p.tags.join(", "),
        image: `${SITE_URL}${p.image}`,
        creator: { "@id": PERSON_ID },
        ...(p.yearHref ? { sameAs: [p.yearHref] } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: p.title, item: url },
        ],
      },
    ],
  }
}

export function llmsTxt(): string {
  const work = PROJECTS.map((p) => `- [${p.title}](${SITE_URL}${p.href}): ${p.description}`).join("\n")
  return `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## About
- [Home, about and contact](${SITE_URL}/): Current role: Associate Software Engineer at MetaUpSpace. B.Tech CSE, KIET Group of Institutions. Open to full-time opportunities.

## Selected work
${work}

## Profiles
- [GitHub](${GITHUB_URL})

## Contact
- Email: ${CONTACT_EMAIL}
- [Contact form](${SITE_URL}/#contact)
`
}
