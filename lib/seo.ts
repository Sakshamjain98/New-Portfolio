import { ARTICLES, type Article } from "@/lib/articles"
import { FAQS, PROJECTS, STACK_PANES } from "@/lib/content"
import { SERVICES, type Service } from "@/lib/services"

export const SITE_URL = "https://www.sakshamjain.codes"
export const SITE_NAME = "Saksham Jain"
export const SITE_DESCRIPTION =
  "Full-stack web developer with 2+ years of experience building enterprise SaaS, ERP, and warehouse management systems, from architecture to deployment."
export const GITHUB_URL = "https://github.com/Sakshamjain98"
export const LINKEDIN_URL = "https://www.linkedin.com/in/sakshamjain007"
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
  sameAs: [LINKEDIN_URL, GITHUB_URL],
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

export function articleGraph(a: Article) {
  const url = `${SITE_URL}/blog/${a.slug}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: a.title,
        description: a.description,
        url,
        mainEntityOfPage: url,
        datePublished: a.published,
        dateModified: a.updated ?? a.published,
        inLanguage: "en",
        image: `${SITE_URL}/og.png`,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Engineering notes", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: a.title, item: url },
        ],
      },
    ],
  }
}

export function serviceGraph(s: Service) {
  const url = `${SITE_URL}/services/${s.slug}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: s.title,
        description: s.description,
        url,
        serviceType: s.title,
        provider: { "@id": PERSON_ID },
        areaServed: [{ "@type": "Country", name: "India" }, { "@type": "Place", name: "Worldwide (remote)" }],
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: s.title, item: url },
        ],
      },
    ],
  }
}

export function llmsTxt(): string {
  const work = PROJECTS.map((p) => `- [${p.title}](${SITE_URL}${p.href}): ${p.description}`).join("\n")
  const services = SERVICES.map((s) => `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.description}`).join("\n")
  const notes = ARTICLES.map((a) => `- [${a.title}](${SITE_URL}/blog/${a.slug}): ${a.description}`).join("\n")
  return `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## About
- [About Saksham Jain](${SITE_URL}/about): Background, projects, stack and contact.
- [Home](${SITE_URL}/): Current role: Associate Software Engineer at MetaUpSpace. B.Tech CSE, KIET Group of Institutions. Open to full-time roles and freelance projects.

## Services
${services}

## Pricing
- [Pricing and timelines](${SITE_URL}/pricing): Indicative ranges per project type; fixed quote after a requirements conversation.

## Selected work
${work}

## Engineering notes
${notes}

## Profiles
- [LinkedIn](${LINKEDIN_URL})
- [GitHub](${GITHUB_URL})

## Contact
- Email: ${CONTACT_EMAIL}
- [Contact form](${SITE_URL}/#contact)
`
}
