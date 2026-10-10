import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/seo"

// Allow search, AI-search and AI-training crawlers. To opt out of model
// training, add GPTBot / ClaudeBot / Google-Extended / Applebot-Extended with
// `disallow: "/"`; search bots are separate and stay allowed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "Claude-SearchBot", "Claude-User", "GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
