import React, { useEffect, useState } from "react";
import { useParams, Link } from "@/lib/router";
import { CheckCircle2, Truck, ShoppingCart, MessageSquare, Plus, Minus } from "lucide-react";
import { Image } from "@/components/ui/image";
import DOMPurify from "dompurify";
import { fetchProductBySlug } from "@/lib/supabase/catalog";
import { useLocale } from "@/lib/i18n/LocaleContext";
import {
  formatCurrency,
  formatProductColor,
  getLocalizedProduct,
} from "@/lib/i18n/messages";
import { useCart } from "@/lib/CartContext";
import { getPurchaseContent } from "@/lib/i18n/purchaseContent";
import ProductTechnicalOverview from "@/components/ProductTechnicalOverview";
import { DEMO_PHOTO_COPY, hasSuppliedDemoPhoto } from "@/lib/suppliedPhotos";

export default function ProductDetail() {
  const { slug } = useParams();
  const { locale, t, catalogLabel } = useLocale();
  const { addItem } = useCart();
  const purchaseCopy = getPurchaseContent(locale);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetchProductBySlug(slug)
      .then((res) => {
        if (res) setProduct(res);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="font-heading text-3xl font-extrabold mb-4">{t("product.notFound")}</h1>
        <Link to="/container-kaufen" className="text-primary font-bold hover:underline">{t("common.backToShop")}</Link>
      </div>
    );
  }

  const purchasable = product.is_purchasable && product.availability !== "Ausverkauft";
  const soldOut = product.availability === "Ausverkauft";
  const gallery = [product.main_image, ...(product.additional_images || [])].filter(Boolean);
  const localizedProduct = getLocalizedProduct(product, locale);
  const formatPrice = (val) => val
    ? formatCurrency(locale, val, product.currency || "EUR")
    : t("common.onRequest");

  const specs = [
    { label: t("specs.productType"), value: catalogLabel(product.product_type) },
    { label: t("specs.size"), value: product.size_ft === "Sonstige" ? catalogLabel(product.size_ft) : `${product.size_ft} ${t("product.foot")}` },
    { label: t("specs.condition"), value: catalogLabel(product.condition) },
    { label: t("specs.conditionGrade"), value: catalogLabel(product.condition_grade) },
    { label: t("specs.color"), value: formatProductColor(locale, product.color) },
    { label: t("specs.exteriorLength"), value: product.ext_length_mm ? `${product.ext_length_mm} mm` : "—" },
    { label: t("specs.exteriorWidth"), value: product.ext_width_mm ? `${product.ext_width_mm} mm` : "—" },
    { label: t("specs.exteriorHeight"), value: product.ext_height_mm ? `${product.ext_height_mm} mm` : "—" },
    { label: t("specs.interiorLength"), value: product.int_length_mm ? `${product.int_length_mm} mm` : "—" },
    { label: t("specs.interiorWidth"), value: product.int_width_mm ? `${product.int_width_mm} mm` : "—" },
    { label: t("specs.interiorHeight"), value: product.int_height_mm ? `${product.int_height_mm} mm` : "—" },
    { label: t("specs.doorWidth"), value: product.door_width_mm ? `${product.door_width_mm} mm` : "—" },
    { label: t("specs.doorHeight"), value: product.door_height_mm ? `${product.door_height_mm} mm` : "—" },
    { label: t("specs.tareWeight"), value: product.tare_weight_kg ? `${product.tare_weight_kg} kg` : "—" },
    { label: t("specs.maxWeight"), value: product.max_gross_weight_kg ? `${product.max_gross_weight_kg} kg` : "—" },
    { label: t("specs.payload"), value: product.payload_kg ? `${product.payload_kg} kg` : "—" },
    { label: t("specs.volume"), value: product.volume_m3 ? `${product.volume_m3} m³` : "—" },
    { label: t("specs.cscStatus"), value: catalogLabel(product.csc_status) },
    { label: t("specs.watertight"), value: product.wwt_status ? t("common.yes") : t("common.no") },
    { label: t("specs.cargoWorthy"), value: product.cargo_worthy ? t("common.yes") : t("common.no") },
    { label: t("specs.floor"), value: localizedProduct.floorType },
    { label: t("specs.lockbox"), value: product.lockbox ? t("common.yes") : t("common.no") },
    { label: t("specs.ventilation"), value: product.vents ? t("common.yes") : t("common.no") },
    { label: t("specs.forkliftPockets"), value: product.forklift_pockets ? t("common.yes") : t("common.no") },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card/55">
        <div className="max-w-terminal mx-auto px-6 py-4">
          <nav className="text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-foreground">{t("nav.home")}</Link>
            <span>/</span>
            <Link to="/container-kaufen" className="hover:text-foreground">{t("nav.shop")}</Link>
            <span>/</span>
            <span className="text-foreground">{localizedProduct.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-terminal mx-auto px-6 py-10">
        <Link to="/container-kaufen" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
           {t("common.backToShop")}
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="mb-4 aspect-[4/3] overflow-hidden bg-secondary shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
              <Image src={gallery[activeImage] || gallery[0]} alt={localizedProduct.title} fittingType="fit" className="w-full h-full object-contain" />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={activeImage === i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-[4/3] overflow-hidden transition duration-200 ${activeImage === i ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"}`}
                  >
                    <Image src={img} alt={t("product.view", { number: i + 1 })} fittingType="fill" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            {hasSuppliedDemoPhoto(product) && (
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{DEMO_PHOTO_COPY[locale] || DEMO_PHOTO_COPY.de}</p>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="font-mono-tech text-xs text-muted-foreground mb-2">SKU: {product.sku}</div>
            <h1 className="font-heading text-3xl lg:text-4xl font-extrabold tracking-tight text-balance">{localizedProduct.title}</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">{localizedProduct.shortDescription}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 text-sm text-foreground">
                {catalogLabel(product.condition)} · {catalogLabel(product.condition_grade)}
              </span>
              {product.availability === "Auf Lager" ? (
                <span className="flex items-center gap-1.5 bg-success px-3 py-1.5 text-sm text-success-foreground shadow-sm">
                  <CheckCircle2 className="w-4 h-4" /> {t("product.unitsAvailable", { count: product.quantity })}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 text-sm text-muted-foreground">
                  {catalogLabel(product.availability)}
                </span>
              )}
            </div>

            {/* Price box */}
            <div className="mt-8 bg-card p-6 shadow-[0_16px_45px_rgba(0,0,0,0.09)]">
              <div className="flex items-end justify-between mb-1">
                <span className="text-sm text-muted-foreground">{product.price_gross > 0 ? t("product.grossPriceTax") : t("common.price")}</span>
                <span className="font-mono-tech text-xs text-muted-foreground">{product.currency}</span>
              </div>
              <div className="font-heading text-4xl font-extrabold text-foreground">
                {formatPrice(product.price_gross)}
              </div>

              {purchasable && (
                <div className="mt-6">
                  <h2 className="font-heading text-lg font-bold">{purchaseCopy.readyTitle}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{purchaseCopy.readyCopy}</p>
                </div>
              )}

              {/* CTAs */}
              <div className="mt-6 space-y-3">
                {soldOut ? (
                  <button type="button" disabled className="w-full bg-secondary px-6 py-4 font-bold text-muted-foreground cursor-not-allowed">
                    {catalogLabel("Ausverkauft")}
                  </button>
                ) : purchasable ? (
                  <>
                    <button
                      type="button"
                      onClick={() => addItem(product)}
                      className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 font-bold text-primary-foreground shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0"
                    >
                      <ShoppingCart className="w-5 h-5" /> {t("product.addToCart")}
                    </button>
                    <p className="text-xs leading-relaxed text-muted-foreground">{purchaseCopy.checkoutNote}</p>
                  </>
                ) : <p className="text-sm text-muted-foreground">{purchaseCopy.quoteTax}</p>}
              </div>
            </div>

            <section aria-labelledby="product-quote-heading" className="mt-6 bg-neutral-50 p-6">
              <MessageSquare className="mb-3 h-6 w-6 text-foreground" aria-hidden="true" />
              <h2 id="product-quote-heading" className="font-heading text-lg font-bold">{purchaseCopy.quoteTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{purchaseCopy.quoteCopy}</p>
              <Link
                to={`/angebot-anfordern?${new URLSearchParams({ product: product.slug })}`}
                className="mt-5 flex w-full items-center justify-center gap-2 bg-white px-6 py-3.5 font-bold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:text-primary hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                {t("common.requestQuote")}
              </Link>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{purchaseCopy.quoteNote}</p>
            </section>
          </div>
        </div>

        <ProductTechnicalOverview key={product.id || product.slug} product={product} specs={specs} />

        {localizedProduct.description && (
          <details className="group mt-3 bg-neutral-50">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-heading text-base font-bold [&::-webkit-details-marker]:hidden">
              {t("product.description")}
              <Plus className="h-5 w-5 shrink-0 text-muted-foreground group-open:hidden" aria-hidden="true" />
              <Minus className="hidden h-5 w-5 shrink-0 text-muted-foreground group-open:block" aria-hidden="true" />
            </summary>
            <div
              className="max-w-4xl px-5 pb-5 text-sm leading-relaxed text-muted-foreground [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(localizedProduct.description) }}
            />
          </details>
        )}

        <div className="mt-5 flex flex-col gap-3 bg-neutral-50 p-5 sm:flex-row sm:items-center">
          <Truck className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div className="flex-1">
            <h2 className="font-heading text-base font-bold">{t("product.delivery")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("product.deliveryCopy")}</p>
          </div>
          <Link to="/lieferung-aufstellung" className="shrink-0 text-sm font-semibold text-foreground underline underline-offset-4">
            {t("product.deliveryDetails")}
          </Link>
        </div>
      </div>
    </div>
  );
}
