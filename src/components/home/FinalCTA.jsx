import React from "react";
import { Link } from "@/lib/router";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";

export default function FinalCTA() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).final;

  return (
    <section className="relative overflow-hidden section-space">
      <div className="relative max-w-terminal mx-auto px-6 text-center">
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-balance max-w-3xl mx-auto">
          {copy.title}
        </h2>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
          {copy.description}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/container-kaufen" className="group flex items-center justify-center gap-2 bg-secondary px-7 py-4 font-bold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:text-primary">
            {copy.shop}

          </Link>
          <Link to="/angebot-anfordern" className="flex items-center justify-center gap-2 bg-primary px-7 py-4 font-bold text-primary-foreground shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-primary/90">
            {copy.quote}
          </Link>
        </div>
      </div>
    </section>
  );
}
