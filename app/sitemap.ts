import type { MetadataRoute } from "next"

import { ARTICLES } from "@/lib/articles"
import { SERVICES } from "@/lib/services"
import { PROJECTS } from "@/lib/content"
import { SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
    ...SERVICES.map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...ARTICLES.map((a) => ({ url: `${SITE_URL}/blog/${a.slug}`, lastModified: a.updated ?? a.published, changeFrequency: "yearly" as const, priority: 0.7 })),
    ...PROJECTS.map((p) => ({ url: `${SITE_URL}${p.href}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ]
}
