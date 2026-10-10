import { Reveal, RevealGroup } from "@/components/reveal"
import { SectionHead, SectionShell } from "@/components/section-shell"
import { FAQS } from "@/lib/content"

export function Faq(): React.ReactElement {
  return (
    <section id="faq" aria-labelledby="faq-h" className="py-20 sm:py-28">
      <SectionShell>
        <SectionHead numeral="07" label="FAQ" aside="Quick answers" titleId="faq-h" title="Frequently asked questions" />
        <RevealGroup className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          {FAQS.map((f) => (
            <Reveal key={f.q} as="div" className="border-t border-hairline pt-5">
              <h3 className="text-lg tracking-[-0.01em] text-ink">{f.q}</h3>
              <p className="mt-2 text-base text-body">{f.a}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </SectionShell>
    </section>
  )
}
