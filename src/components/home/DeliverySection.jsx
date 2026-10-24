import React from "react";
import { Link } from "@/lib/router";
import { Truck, Construction, MapPin, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/SectionHeading";
import { IMAGES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";

const ITEM_ICONS = [Truck, Construction, MapPin];

export default function DeliverySection() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).delivery;

  return (
    <section className="section-space">
      <div className="max-w-terminal mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading
              title={copy.title}
            />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {copy.description}
            </p>

            <div className="mt-8 space-y-4">
              {copy.items.map((item, index) => {
                const Icon = ITEM_ICONS[index];
                return (
                <div key={item.title} className="flex gap-4 bg-card p-5 shadow-[0_9px_26px_rgba(0,0,0,0.06)]">
                  <Icon className="w-6 h-6 text-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading font-bold mb-0.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                );
              })}
            </div>

            <Link to="/lieferung-aufstellung" className="group mt-8 inline-flex items-center gap-2 bg-primary/10 px-6 py-3 text-sm font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground">
              {copy.cta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-foreground group-hover:text-white" />
            </Link>
          </div>

          <div className="order-1 lg:order-2">
            <div className="aspect-[4/3] overflow-hidden bg-secondary shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
              <Image src={IMAGES.delivery} alt={copy.imageAlt} fittingType="fill" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
