import React from "react";
import { Link } from "@/lib/router";
import { ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";
import { formatContainerTitle } from "@/lib/catalogPresentation";

const COLORS = ["text-foreground", "text-foreground", "text-success", "text-success", "text-success", "text-foreground"];

export default function ConditionGuide() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).conditions;

  return (
    <section className="section-space">
      <div className="max-w-terminal mx-auto px-6">
        <SectionHeading
          title={copy.title}
          description={copy.description}
          align="center"
        />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((condition, index) => (
            <div key={condition.name} className="bg-card p-7 shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.11)]">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className={`w-5 h-5 ${COLORS[index]}`} />
                <h3 className="font-heading text-lg font-bold">{formatContainerTitle(condition.name)}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{condition.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/container-zustandsklassen" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            {copy.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
