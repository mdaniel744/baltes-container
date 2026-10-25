import React from "react";
import { Link } from "@/lib/router";
import { MapPin, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";
import { LEGAL_COMPANY } from "@/lib/legalCompany";

const LOCATIONS = [
  {
    name: "Wadgassen",
    phone: LEGAL_COMPANY.phone,
    slug: "wadgassen",
  },
];

export default function Locations() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).locations;

  return (
    <section className="bg-card/30 section-space">
      <div className="max-w-terminal mx-auto px-6">
        <SectionHeading
          title={copy.title}
          description={copy.description}
          align="center"
        />

        <div className="mx-auto mt-8 grid max-w-xl gap-6">
          {LOCATIONS.map((loc, index) => {
            const localized = copy.items[index];
            return (
            <Link id={loc.slug} key={loc.slug} to={`/standorte#${loc.slug}`} className="group bg-card p-8 shadow-[0_12px_35px_rgba(0,0,0,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-foreground" />
                <span className="font-mono-tech text-xs uppercase tracking-wider text-primary">{localized.role}</span>
              </div>
              <h3 className="font-heading text-2xl font-extrabold mb-3 group-hover:text-foreground transition-colors">{loc.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{localized.address}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-foreground" /> {loc.phone}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">
                {copy.more}
              </span>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
