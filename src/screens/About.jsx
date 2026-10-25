import React from "react";
import { Link } from "@/lib/router";
import { Award, Users, Truck, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/SectionHeading";
import { IMAGES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getPageContent } from "@/lib/i18n/pageContent";

const STAT_ICONS = [Award, Users, Truck, MapPin];

export default function About() {
  const { locale } = useLocale();
  const copy = getPageContent(locale).about;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMAGES.hero} alt={copy.imageAlt} fittingType="fill" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative max-w-terminal mx-auto px-6 section-space">
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl text-balance">
            {copy.title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 section-space space-y-6 text-muted-foreground leading-relaxed text-lg">
        {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      {/* Stats */}
      <div className="bg-card/30">
        <div className="max-w-terminal mx-auto grid grid-cols-2 gap-5 px-6 md:grid-cols-4">
          {copy.stats.map((stat, index) => {
            const Icon = STAT_ICONS[index];
            return (
            <div key={stat.label} className="bg-card p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <Icon className="w-8 h-8 text-foreground mx-auto mb-3" />
              <div className="font-heading text-2xl font-extrabold">{stat.value}</div>
              <div className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Values */}
      <div className="max-w-terminal mx-auto px-6 section-space">
        <SectionHeading title={copy.valuesTitle} align="center" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {copy.values.map((v) => (
            <div key={v.title} className="bg-card p-7 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div>
        <div className="max-w-terminal mx-auto px-6 section-space text-center">
          <h2 className="font-heading text-3xl font-extrabold mb-4">{copy.ctaTitle}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/kontakt" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
              {copy.contact}
            </Link>
            <Link to="/standorte" className="inline-flex items-center gap-2 bg-secondary px-6 py-3 font-bold shadow-sm transition hover:-translate-y-0.5 hover:text-primary">
              {copy.locations}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
