import React from "react";
import { Link } from "@/lib/router";
import { DoorOpen, Lightbulb, Thermometer, PaintBucket, Wind, Wrench, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/SectionHeading";
import { IMAGES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";

const OPTION_ICONS = [DoorOpen, Thermometer, Lightbulb, Wind, PaintBucket, Wrench];

export default function CustomConversions() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).conversions;

  return (
    <section className="bg-card/30 section-space">
      <div className="max-w-terminal mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden bg-secondary shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
              <Image src={IMAGES.office} alt={copy.imageAlt} fittingType="fill" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>

          <div>
            <SectionHeading
              title={copy.title}
              description={copy.description}
            />

            <div className="mt-8 grid grid-cols-2 gap-3">
              {copy.options.map((option, index) => {
                const Icon = OPTION_ICONS[index];
                return (
                <div key={option} className="flex items-center gap-3 bg-card p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  <Icon className="w-5 h-5 text-foreground shrink-0" />
                  <span className="text-sm font-medium">{option}</span>
                </div>
                );
              })}
            </div>

            <Link to="/angebot-anfordern" className="group mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-primary/90">
              {copy.cta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
