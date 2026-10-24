import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";

export default function HowItWorks() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).process;

  return (
    <section className="bg-card/30 section-space">
      <div className="max-w-terminal mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Standard purchase */}
          <div>
            <SectionHeading title={copy.purchaseTitle} />
            <ol className="mt-10 space-y-4">
              {copy.purchase.map((step, index) => (
                <li key={step.title} className="flex gap-5 bg-card p-6 shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.10)]">
                  <span className="font-mono-tech text-2xl font-bold text-primary shrink-0 w-12">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Custom project */}
          <div>
            <SectionHeading title={copy.customTitle} />
            <ol className="mt-10 space-y-4">
              {copy.custom.map((step, index) => (
                <li key={step.title} className="flex gap-5 bg-card p-6 shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.10)]">
                  <span className="font-mono-tech text-2xl font-bold text-primary shrink-0 w-12">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
