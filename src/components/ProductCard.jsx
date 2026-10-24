import React from "react";
import { Link } from "@/lib/router";
import { Image } from "@/components/ui/image";
import { CheckCircle2, MapPin, ShoppingCart } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { formatCurrency, getLocalizedProduct } from "@/lib/i18n/messages";
import { useCart } from "@/lib/CartContext";
import { getPurchaseContent } from "@/lib/i18n/purchaseContent";

export default function ProductCard({ product, minimal = false }) {
  const { locale, t, catalogLabel } = useLocale();
  const { addItem } = useCart();
  const purchasable = product.is_purchasable && product.availability !== "Ausverkauft";
  const inStock = product.availability === "Auf Lager";
  const soldOut = product.availability === "Ausverkauft";
  const localizedProduct = getLocalizedProduct(product, locale);

  const formatPrice = (val) => {
    if (!val || val === 0) return t("common.onRequest");
    return formatCurrency(locale, val, product.currency || "EUR");
  };

  if (minimal) {
    return (
      <Link
        to={`/container/${product.slug}`}
        aria-label={localizedProduct.title}
        className="group flex h-full flex-col overflow-hidden bg-white shadow-[0_8px_28px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <div className="aspect-[4/3] overflow-hidden bg-white">
          <Image src={product.main_image} alt="" fittingType="fit" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-4 font-heading text-lg font-bold leading-snug transition-colors group-hover:text-foreground">{localizedProduct.title}</h3>
          <div className="mt-auto font-heading text-2xl font-extrabold text-foreground">{formatPrice(product.price_gross)}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            {product.price_gross > 0 ? t("product.grossPriceTax") : getPurchaseContent(locale).quoteTax}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group relative flex flex-col overflow-hidden bg-card shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.15)]">
      <Link to={`/container/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={product.main_image}
          alt={localizedProduct.title}
          fittingType="fill"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-background/90 px-2.5 py-1 font-mono-tech text-[11px] uppercase tracking-wider text-foreground shadow-sm backdrop-blur-sm">
            {catalogLabel(product.condition)}
          </span>
        </div>
        {inStock ? (
          <span className="absolute right-3 top-3 flex items-center gap-1.5 bg-success px-2.5 py-1 text-[11px] font-medium text-success-foreground shadow-sm">
            <CheckCircle2 className="w-3 h-3" /> {catalogLabel("Auf Lager")}
          </span>
        ) : (
          <span className="absolute right-3 top-3 bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-sm">
            {catalogLabel(product.availability)}
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <div className="font-mono-tech text-xs text-muted-foreground mb-2">{product.sku}</div>
        <Link to={`/container/${product.slug}`}>
          <h3 className="font-heading text-lg font-bold leading-snug mb-3 hover:text-foreground transition-colors">
            {localizedProduct.title}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
          <span>{product.size_ft === "Sonstige" ? catalogLabel(product.size_ft) : `${product.size_ft} ${t("product.foot")}`}</span>
          <span className="text-foreground/35">•</span>
          <span>{catalogLabel(product.product_type)}</span>
          <span className="text-foreground/35">•</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{product.depot}</span>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-0.5">{product.price_gross > 0 ? t("product.grossPrice") : t("common.price")}</div>
              <div className="font-heading text-2xl font-extrabold text-foreground">{formatPrice(product.price_gross)}</div>
            </div>
          </div>
          {soldOut ? (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link to={`/container/${product.slug}`} className="flex items-center justify-center bg-secondary px-3 py-2.5 text-sm font-semibold hover:text-foreground">
                {t("product.details")}
              </Link>
              <button type="button" disabled className="bg-secondary px-3 py-2.5 text-sm font-semibold text-muted-foreground cursor-not-allowed">
                {catalogLabel("Ausverkauft")}
              </button>
            </div>
          ) : purchasable ? (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                to={`/container/${product.slug}`}
                className="flex items-center justify-center bg-secondary px-3 py-2.5 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-primary/10 hover:text-foreground"
              >
                {t("product.details")}
              </Link>
              <button
                type="button"
                onClick={() => addItem(product)}
                className="flex items-center justify-center gap-2 bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-black/10 transition hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0"
              >
                <ShoppingCart className="h-4 w-4" />
                {t("product.addToCart")}
              </button>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link to={`/container/${product.slug}`} className="flex items-center justify-center bg-secondary px-3 py-2.5 text-sm font-semibold hover:text-foreground">
                {t("product.details")}
              </Link>
              <Link to="/angebot-anfordern" className="flex items-center justify-center bg-primary/10 px-3 py-2.5 text-center text-sm font-bold text-foreground transition hover:bg-primary hover:text-primary-foreground">
                {t("common.requestQuote")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
