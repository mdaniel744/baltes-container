import React from "react";
import { Link } from "@/lib/router";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/SectionHeading";
import { CATEGORIES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";
import { formatContainerTitle } from "@/lib/catalogPresentation";

export default function FeaturedCategories() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).categories;

  return (
    <section className="section-space">
      <div className="max-w-terminal mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <SectionHeading
            title={copy.title}
            description={copy.description}
          />
          <Link to="/container-kaufen" className="group flex items-center gap-2 text-sm font-bold text-primary shrink-0">
            {copy.cta}

          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, index) => {
            const localized = copy.items[index];
            return (
            <Link
              key={cat.slug}
              to={`/container-kaufen?${new URLSearchParams(cat.filters)}`}
              className="group flex flex-col overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
            >
              <div className="relative aspect-[4/3] flex items-center justify-center bg-white overflow-hidden">
                <Image
                  src={cat.image}
                  alt={formatContainerTitle(localized.name)}
                  fittingType="fill"
                  loading="lazy"
                  width={1024}
                  height={768}
                  style={{ objectPosition: cat.imagePosition || "center" }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Label */}
              <div className="p-5 pt-2 flex-1">
                <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading text-base font-bold leading-snug group-hover:text-foreground transition-colors">
                  {formatContainerTitle(localized.name)}
                </h3>

                </div>
                <p className="mt-1 text-sm text-muted-foreground leading-snug">{localized.benefit}</p>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
