import React from "react";
import { Award, Package, Truck, Headphones, ShieldCheck } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";

const TRUST_ICONS = [Award, Package, Truck, Headphones, ShieldCheck];

export default function TrustStrip() {
  const { locale } = useLocale();
  const labels = getHomeContent(locale).trust;

  return (
    <section className="bg-card shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <div className="max-w-terminal mx-auto px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {labels.map((label, index) => {
            const Icon = TRUST_ICONS[index];
            return (
            <div key={label} className="flex items-center gap-2.5">
              <Icon className="w-5 h-5 text-foreground shrink-0" />
              <span className="text-sm font-medium text-foreground/90">{label}</span>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
