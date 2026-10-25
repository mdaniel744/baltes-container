import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";

export default function FAQ() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).faq;
  const [open, setOpen] = useState(0);

  return (
    <section className="section-space">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          title={copy.title}
          description={copy.description}
          align="center"
        />

        <div className="mt-8 space-y-3">
          {copy.items.map((item, i) => (
            <div key={i} className="bg-card px-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-heading font-bold text-lg">{item.q}</span>
                {open === i
                  ? <Minus className="w-5 h-5 text-foreground shrink-0" aria-hidden="true" />
                  : <Plus className="w-5 h-5 text-foreground shrink-0" aria-hidden="true" />}
              </button>
              {open === i && (
                <p className="pb-5 text-muted-foreground leading-relaxed">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
