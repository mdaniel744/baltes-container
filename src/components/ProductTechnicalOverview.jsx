import React, { useId, useState } from "react";
import { Box, Weight, Scale, ShieldCheck, ChevronDown, DoorOpen, Check, Minus } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getTechnicalContent } from "@/lib/i18n/technicalContent";
import { formatMeasurement, getProductDimensions } from "@/lib/productDimensions";
import ProductDimensionDiagram from "@/components/ProductDimensionDiagram";

export default function ProductTechnicalOverview({ product, specs }) {
  const { locale, t, catalogLabel } = useLocale();
  const copy = getTechnicalContent(locale);
  const [mode, setMode] = useState("exterior");
  const id = useId();
  const dimensions = getProductDimensions(product, mode);
  const values = dimensions.map(({ value }) => formatMeasurement(value, locale, "m", 1000));
  const metrics = [
    { icon: Box, label: t("specs.volume"), value: formatMeasurement(product.volume_m3, locale, "m³") },
    { icon: Weight, label: t("specs.payload"), value: formatMeasurement(product.payload_kg, locale, "kg") },
    { icon: Scale, label: t("specs.tareWeight"), value: formatMeasurement(product.tare_weight_kg, locale, "kg") },
    { icon: ShieldCheck, label: t("specs.cscStatus"), value: catalogLabel(product.csc_status) },
  ];
  const features = [
    { label: t("specs.watertight"), value: product.wwt_status },
    { label: t("specs.cargoWorthy"), value: product.cargo_worthy },
    { label: t("specs.lockbox"), value: product.lockbox },
    { label: t("specs.ventilation"), value: product.vents },
  ];

  return (
    <section aria-labelledby={`${id}-heading`} className="mt-10" data-testid="product-technical-overview">
      <h2 id={`${id}-heading`} className="mb-5 font-heading text-2xl font-extrabold text-foreground">{copy.title}</h2>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="min-w-0 bg-neutral-50 p-4 sm:p-6">
          <div role="group" aria-label={copy.dimensionView} className="inline-flex gap-1 bg-white p-1 shadow-sm">
            {["exterior", "interior"].map((view) => (
              <button
                key={view}
                type="button"
                aria-pressed={mode === view}
                onClick={() => setMode(view)}
                className={`min-h-11 px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 ${mode === view ? "bg-foreground text-white" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
              >
                {copy[view]}
              </button>
            ))}
          </div>
          <figure className="mt-3">
            <ProductDimensionDiagram dimensions={dimensions} values={values} mode={mode} copy={copy} />
            <dl className="grid grid-cols-3 gap-2" aria-live="polite" aria-atomic="true">
              {dimensions.map(({ axis }, index) => (
                <div key={axis} className="px-2 py-3 text-center">
                  <dt className="text-xs text-muted-foreground">{copy[axis]}</dt>
                  <dd className="mt-1 font-heading text-base font-bold text-foreground sm:text-lg">{values[index]}</dd>
                </div>
              ))}
            </dl>
            <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">{copy.schematic}</figcaption>
          </figure>
        </div>

        <div className="min-w-0">
          <dl className="grid grid-cols-2 gap-3">
            {metrics.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-neutral-50 p-4 sm:p-5">
                <Icon className="mb-3 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-heading text-xl font-bold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex items-center gap-3 bg-neutral-50 px-4 py-3">
            <DoorOpen className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">{copy.door}</p>
              <p className="mt-1 text-sm font-semibold">{formatMeasurement(product.door_width_mm, locale, "m", 1000)} × {formatMeasurement(product.door_height_mm, locale, "m", 1000)}</p>
            </div>
          </div>
          <ul aria-label={copy.equipment} className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
            {features.map(({ label, value }) => {
              const Icon = value === true ? Check : Minus;
              return (
                <li key={label} className="flex items-start gap-2">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span>{label}: <span className="font-medium">{typeof value === "boolean" ? t(value ? "common.yes" : "common.no") : "—"}</span></span>
                </li>
              );
            })}
          </ul>
          {dimensions.some(({ value }) => value === null) && <p className="mt-4 text-xs text-muted-foreground">{copy.missing}</p>}
        </div>
      </div>

      <details className="group mt-5 bg-neutral-50">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-heading text-base font-bold text-foreground [&::-webkit-details-marker]:hidden">
          {copy.allSpecs}
          <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="px-3 pb-3 sm:px-5 sm:pb-5">
          <table className="w-full table-fixed text-left text-sm">
            <caption className="sr-only">{t("product.technicalData")}</caption>
            <tbody>
              {specs.map((spec, index) => (
                <tr key={spec.label} className={index % 2 === 0 ? "bg-white" : ""}>
                  <th scope="row" className="w-1/2 break-words px-3 py-2.5 font-medium text-muted-foreground">{spec.label}</th>
                  <td className="break-words px-3 py-2.5 text-foreground">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
