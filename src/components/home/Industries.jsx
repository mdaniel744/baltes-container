import React from "react";
import { Link } from "@/lib/router";
import { HardHat, Wheat, Factory, Truck, Store, Building2, Calendar, Home } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";

const INDUSTRY_ICONS = [HardHat, Wheat, Factory, Truck, Store, Building2, Calendar, Home];

export default function Industries() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).industries;

  return (
    <section className="section-space">
      <div className="max-w-terminal mx-auto px-6">
        <SectionHeading
          title={copy.title}
          description={copy.description}
          align="center"
        />

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {copy.items.map((industry, index) => {
            const Icon = INDUSTRY_ICONS[index];
            return (
            <Link
              key={industry.name}
              to="/container-kaufen"
              className="group bg-card p-7 text-center shadow-[0_10px_28px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(0,0,0,0.11)]"
            >
              <div className="flex justify-center mb-4">
                <Icon className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="font-heading font-bold mb-1 group-hover:text-foreground transition-colors">{industry.name}</h3>
              <p className="text-xs text-muted-foreground">{industry.desc}</p>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
