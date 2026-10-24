import React from "react";
import { Link } from "@/lib/router";
import { Truck, Construction, MapPin, Ruler, AlertTriangle, PackageCheck, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/SectionHeading";
import { IMAGES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getPageContent } from "@/lib/i18n/pageContent";
import { getLegalContent } from "@/lib/i18n/legalContent";

const VEHICLE_ICONS = [Truck, Truck, Construction, Construction];
const REQUIREMENT_ICONS = [Ruler, MapPin, AlertTriangle, Construction];

export default function Delivery() {
  const { locale } = useLocale();
  const copy = getPageContent(locale).delivery;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMAGES.delivery} alt={copy.imageAlt} fittingType="fill" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative max-w-terminal mx-auto px-6 section-space">
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl text-balance">
            {copy.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            {copy.intro}
          </p>
        </div>
      </div>

      {/* Vehicles */}
      <div className="max-w-terminal mx-auto px-6 section-space">
        <SectionHeading title={copy.vehiclesTitle} />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {copy.vehicles.map((vehicle, index) => {
            const Icon = VEHICLE_ICONS[index];
            return (
            <div key={vehicle.title} className="bg-card p-7 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <Icon className="w-8 h-8 text-foreground mb-4" />
              <h3 className="font-heading font-bold mb-2">{vehicle.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{vehicle.desc}</p>
            </div>
            );
          })}
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-card/30">
        <div className="max-w-terminal mx-auto px-6 section-space">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <SectionHeading title={copy.requirementsTitle} />
              <ul className="mt-8 space-y-4">
                {copy.requirements.map((text, i) => {
                  const Icon = REQUIREMENT_ICONS[i];
                  return (
                  <li key={i} className="flex items-start gap-3 bg-card p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                    <Icon className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{text}</span>
                  </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <SectionHeading title={copy.processTitle} />
              <ol className="mt-8 space-y-4">
                {copy.process.map((step, i) => (
                  <li key={i} className="flex gap-4 bg-card p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                    <span className="font-mono-tech text-xl font-bold text-primary shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-medium">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Important notes */}
      <div className="max-w-terminal mx-auto px-6 section-space">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-card p-8 shadow-[0_12px_35px_rgba(0,0,0,0.07)]">
            <PackageCheck className="w-8 h-8 text-foreground mb-4" />
            <h3 className="font-heading text-xl font-extrabold mb-3">{copy.includedTitle}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {copy.included.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
          <div className="bg-card p-8 shadow-[0_12px_35px_rgba(0,0,0,0.07)]">
            <AlertTriangle className="w-8 h-8 text-foreground mb-4" />
            <h3 className="font-heading text-xl font-extrabold mb-3">{copy.excludedTitle}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {copy.excluded.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="font-heading text-3xl font-extrabold mb-4">{copy.ctaTitle}</h2>
          <Link to="/angebot-anfordern" className="inline-flex items-center gap-2 px-7 py-4 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
            {copy.cta} <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm">
            <Link to="/versand-lieferung" className="underline underline-offset-4 hover:text-primary">{getLegalContent(locale).shipping.title}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
