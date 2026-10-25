import React, { useEffect, useState } from "react";
import { Link } from "@/lib/router";
import { ArrowRight } from "lucide-react";
import { fetchFeaturedProducts } from "@/lib/supabase/catalog";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";

export default function PopularProducts() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).popular;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts(6)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

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
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-foreground" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse bg-card shadow-sm" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-card py-16 text-center text-muted-foreground shadow-sm">
            {copy.empty}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
