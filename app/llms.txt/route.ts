import { llmsTxt } from "@/lib/seo"

export const dynamic = "force-static"

export function GET(): Response {
  return new Response(llmsTxt(), { headers: { "content-type": "text/plain; charset=utf-8" } })
}
