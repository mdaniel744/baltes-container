import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "@/lib/router";
import { SlidersHorizontal, X } from "lucide-react";
import { fetchProducts } from "@/lib/supabase/catalog";
import ProductCard from "@/components/ProductCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";
import { getFinderUseTypes, normalizeContainerSize } from "@/lib/containerFinder";

const SIZES = ["10", "20", "30", "40", "Sonstige"];
const CONDITIONS = ["Neu", "One-Trip", "Gebraucht"];
const TYPES = ["Seecontainer", "Lagercontainer", "High-Cube-Container", "Open-Side-Container", "Kühlcontainer", "Bürocontainer", "Sanitärcontainer", "Sondercontainer"];

function FilterGroup({ label, options, optionLabel, paramKey, selected, onToggle }) {
  return (
    <div className="bg-card p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-3">{label}</h3>
      <div className="space-y-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onToggle(paramKey, opt)}
            className={`block w-full px-3 py-2 text-left text-sm transition ${
              selected === opt
                ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-black/10"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {optionLabel(opt)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { locale, t, catalogLabel } = useLocale();
  const finderCopy = getHomeContent(locale).finder;

  const selectedSize = normalizeContainerSize(params.get("size"));
  const selectedCondition = params.get("condition") || "";
  const selectedType = params.get("type") || "";
  const selectedUse = params.get("use") || "";
  const selectedUseTypes = getFinderUseTypes(selectedUse);

  useEffect(() => {
    fetchProducts({ limit: 50 })
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedSize && p.size_ft !== selectedSize) return false;
      if (selectedCondition && p.condition !== selectedCondition) return false;
      if (selectedType && p.product_type !== selectedType) return false;
      if (selectedUseTypes && !selectedUseTypes.includes(p.product_type)) return false;
      return true;
    });
  }, [products, selectedSize, selectedCondition, selectedType, selectedUseTypes]);

  const toggleFilter = (key, value) => {
    const newParams = new URLSearchParams(params);
    const currentValue = key === "size" ? normalizeContainerSize(newParams.get(key)) : newParams.get(key);
    if (currentValue === value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setParams(newParams);
  };

  const clearFilters = () => setParams(new URLSearchParams());

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-br from-card via-card to-secondary/65">
        <div className="max-w-terminal mx-auto px-6 page-heading-space">
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">{t("shop.title")}</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            {t("shop.intro")}
          </p>
        </div>
      </div>

      <div className="max-w-terminal mx-auto px-6 py-8">
        {/* Breadcrumb + count */}
        <div className="flex items-center justify-between mb-6">
          <nav className="text-sm text-muted-foreground">
            <span>{t("nav.home")}</span> <span className="mx-1">/</span> <span className="text-foreground">{t("shop.title")}</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? t("shop.product") : t("shop.products")}</span>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 bg-secondary px-3 py-2 text-sm font-semibold transition hover:bg-primary/10 hover:text-primary lg:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 text-foreground" /> {t("shop.filter")}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`fixed lg:sticky inset-0 lg:inset-auto top-0 lg:top-24 z-50 lg:z-0 w-72 lg:w-60 shrink-0 bg-background lg:bg-transparent overflow-y-auto lg:overflow-visible transition-transform ${filtersOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
            <div className="flex items-center justify-between p-4 shadow-sm lg:hidden">
              <span className="font-heading font-bold">{t("shop.filter")}</span>
              <button onClick={() => setFiltersOpen(false)} aria-label={t("shop.filter")}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 lg:p-0 space-y-5">
              <FilterGroup label={t("shop.size")} options={SIZES} optionLabel={(size) => size === "Sonstige" ? catalogLabel(size) : `${size} ${t("product.foot")}`} paramKey="size" selected={selectedSize} onToggle={toggleFilter} />
              <FilterGroup label={t("shop.condition")} options={CONDITIONS} optionLabel={catalogLabel} paramKey="condition" selected={selectedCondition} onToggle={toggleFilter} />
              <FilterGroup
                label={finderCopy.useLabel}
                options={finderCopy.uses.map((option) => option.value)}
                optionLabel={(value) => finderCopy.uses.find((option) => option.value === value)?.label ?? value}
                paramKey="use"
                selected={selectedUse}
                onToggle={toggleFilter}
              />
              <FilterGroup label={t("shop.type")} options={TYPES} optionLabel={catalogLabel} paramKey="type" selected={selectedType} onToggle={toggleFilter} />
              {(selectedSize || selectedCondition || selectedUse || selectedType) && (
                <button onClick={clearFilters} className="text-sm text-primary font-medium hover:underline">
                  {t("shop.resetFilters")}
                </button>
              )}
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] animate-pulse bg-card shadow-sm" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-card section-space text-center shadow-sm">
                <p className="text-muted-foreground">{t("shop.noResults")}</p>
                <button onClick={clearFilters} className="mt-4 text-sm text-primary font-medium hover:underline">
                  {t("shop.resetFilters")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} minimal />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
