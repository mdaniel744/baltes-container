import React from "react";
import { Link } from "@/lib/router";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/SectionHeading";
import { IMAGES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";

export default function AboutPreview() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).about;

  return (
    <section className="section-space">
      <div className="max-w-terminal mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden bg-secondary shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
              <Image src={IMAGES.container20} alt={copy.imageAlt} fittingType="fill" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-primary text-primary-foreground p-6 max-w-[200px]">
              <div className="font-heading text-4xl font-extrabold">1983</div>
              <div className="text-sm font-medium mt-1">{copy.founded}</div>
            </div>
          </div>

          <div>
            <SectionHeading
              title={copy.title}
            />
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <Link to="/ueber-uns" className="mt-8 group inline-flex items-center gap-2 text-sm font-bold text-primary">
              {copy.cta}

            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
