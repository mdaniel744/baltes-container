import React from "react";
import { Award, Handshake, ShieldCheck, Headphones, Truck, Wrench } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";

const REASON_ICONS = [Award, Handshake, ShieldCheck, Headphones, Truck, Wrench];

export default function WhyChooseUs() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).reasons;

  return (
    <section className="bg-card/30 section-space">
      <div className="max-w-terminal mx-auto px-6">
        <SectionHeading
          title={copy.title}
          description={copy.description}
          align="center"
        />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((reason, index) => {
            const Icon = REASON_ICONS[index];
            return (
            <div key={reason.title} className="bg-card p-8 shadow-[0_12px_35px_rgba(0,0,0,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center bg-secondary text-foreground">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
