"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "@/lib/router";
import { Image } from "@/components/ui/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { formatCurrency, getLocalizedProduct } from "@/lib/i18n/messages";
import {
  calculateOrderTotals,
  catalogGrossToNet,
  CHECKOUT_COUNTRIES,
  getCheckoutCountryForLocale,
} from "@/lib/checkoutPricing";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();
  const { locale, t } = useLocale();
  const [estimateCountry, setEstimateCountry] = useState(() =>
    getCheckoutCountryForLocale(locale),
  );
  const totals = useMemo(
    () => calculateOrderTotals(items, estimateCountry),
    [estimateCountry, items],
  );
  const money = (value, currency = "EUR") =>
    formatCurrency(locale, value, currency, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  useEffect(() => {
    setEstimateCountry(getCheckoutCountryForLocale(locale));
  }, [locale]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeCart();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeCart, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label={t("cart.title")}>
      <button
        type="button"
        className="absolute inset-0 bg-foreground/35 backdrop-blur-[2px]"
        onClick={closeCart}
        aria-label={t("cart.close")}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between px-6 py-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">Baltes Container</p>
            <h2 className="mt-1 font-heading text-2xl font-extrabold">{t("cart.title")}</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="grid h-11 w-11 place-items-center bg-secondary text-foreground transition hover:bg-accent hover:text-foreground"
            aria-label={t("cart.close")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="grid h-20 w-20 place-items-center bg-secondary text-foreground">
              <ShoppingBag className="h-9 w-9" />
            </div>
            <h3 className="mt-6 font-heading text-xl font-bold">{t("cart.emptyTitle")}</h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">{t("cart.emptyCopy")}</p>
            <Link
              to="/container-kaufen"
              onClick={closeCart}
              className="mt-6 bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              {t("cart.continueShopping")}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map(({ product, quantity }) => {
                const productKey = product.id || product.slug;
                const localizedProduct = getLocalizedProduct(product, locale);
                return (
                  <article key={productKey} className="flex gap-4 bg-card p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    <Link
                      to={`/container/${product.slug}`}
                      onClick={closeCart}
                      className="h-24 w-28 shrink-0 overflow-hidden bg-secondary"
                    >
                      <Image
                        src={product.main_image}
                        alt={localizedProduct.title}
                        fittingType="fill"
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1 py-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            to={`/container/${product.slug}`}
                            onClick={closeCart}
                            className="line-clamp-2 font-heading text-sm font-bold leading-snug hover:text-foreground"
                          >
                            {localizedProduct.title}
                          </Link>
                          <p className="mt-1 text-xs text-muted-foreground">{product.sku}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(productKey)}
                          className="p-1.5 text-muted-foreground transition hover:text-foreground"
                          aria-label={t("cart.removeItem", { product: localizedProduct.title })}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center bg-secondary p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(productKey, quantity - 1)}
                            className="grid h-7 w-7 place-items-center transition hover:bg-background hover:text-foreground"
                            aria-label={t("cart.decreaseQuantity")}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(productKey, quantity + 1)}
                            className="grid h-7 w-7 place-items-center transition hover:bg-background hover:text-foreground"
                            aria-label={t("cart.increaseQuantity")}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <strong className="text-sm text-foreground">
                          {money(
                            catalogGrossToNet((Number(product.price_gross) || 0) * quantity),
                            product.currency || "EUR",
                          )}
                          <span className="ml-1 text-[10px] font-medium uppercase text-muted-foreground">{t("cart.netShort")}</span>
                        </strong>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="bg-card px-6 py-6 shadow-[0_-12px_32px_rgba(0,0,0,0.07)]">
              <label className="mb-4 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t("cart.destinationCountry")}
                <select
                  value={estimateCountry}
                  onChange={(event) => setEstimateCountry(event.target.value)}
                  className="mt-2 w-full bg-secondary px-3 py-2.5 text-sm font-semibold text-foreground outline-none focus:ring-2 focus:ring-primary"
                >
                  {CHECKOUT_COUNTRIES.map((countryCode) => (
                    <option key={countryCode} value={countryCode}>
                      {t(`checkout.country${countryCode}`)}
                    </option>
                  ))}
                </select>
              </label>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{t("cart.netGoods")}</span>
                  <strong>{money(totals.goodsNet)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{t("cart.deliveryEstimate")}</span>
                  <strong>{money(totals.deliveryNet)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{t("cart.vat", { rate: totals.vatPercent, country: totals.countryCode })}</span>
                  <strong>{money(totals.vatAmount)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4 bg-secondary px-4 py-3">
                  <span className="font-bold">{t("cart.estimatedTotal")}</span>
                  <span className="font-heading text-2xl font-extrabold text-foreground">
                    {money(totals.orderTotal)}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {t("cart.shippingNote", {
                  country: t(`checkout.country${totals.countryCode}`),
                })}
              </p>
              <Link
                to={`/kasse?country=${estimateCountry}`}
                onClick={closeCart}
                className="mt-5 flex w-full items-center justify-center bg-primary px-6 py-4 font-bold text-primary-foreground shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0"
              >
                {t("cart.checkout")}
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-3 w-full px-6 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                {t("cart.continueShopping")}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
