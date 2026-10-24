import React, { useState } from "react";
import { Link, useSearchParams } from "@/lib/router";
import { useQuery } from "@tanstack/react-query";
import { Check, ArrowRight, ArrowLeft, Send } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getConfiguratorContent } from "@/lib/i18n/configuratorContent";
import { getLocalizedProduct } from "@/lib/i18n/messages";
import { getPurchaseContent } from "@/lib/i18n/purchaseContent";
import { buildProductQuotePayload, getProductQuoteDefaults, getQuoteSteps, moveQuoteStep } from "@/lib/productQuote";

export default function Configurator() {
  const [params] = useSearchParams();
  const productSlug = params.get("product");
  const { locale } = useLocale();
  const purchaseCopy = getPurchaseContent(locale);
  const { data: product, isPending, isError } = useQuery({
    queryKey: ["quote-product", productSlug],
    queryFn: async () => {
      const products = await base44.entities.Product.filter({ slug: productSlug });
      return products[0] ?? null;
    },
    enabled: Boolean(productSlug),
    retry: false,
  });

  if (productSlug && isPending) {
    return <div className="px-6 page-heading-space text-center" role="status">{purchaseCopy.loading}</div>;
  }
  if (productSlug && (isError || !product)) {
    return (
      <div className="mx-auto max-w-2xl px-6 page-heading-space text-center">
        <p role="alert">{purchaseCopy.loadError}</p>
        <Link to="/angebot-anfordern" className="mt-6 inline-block font-bold text-primary hover:underline">{purchaseCopy.generalQuote}</Link>
      </div>
    );
  }
  return <ConfiguratorForm key={productSlug || "general"} product={productSlug ? product : null} />;
}

function ConfiguratorForm({ product }) {
  const { locale } = useLocale();
  const copy = getConfiguratorContent(locale);
  const purchaseCopy = getPurchaseContent(locale);
  const localizedProduct = product ? getLocalizedProduct(product, locale) : null;
  const [intent, setIntent] = useState(product ? "estimate" : "custom");
  const steps = getQuoteSteps(product, intent);
  const stepTitles = { 1: copy.purposeTitle, 2: copy.baseTitle, 4: copy.deliveryTitle, 5: copy.contactTitle };
  const [step, setStep] = useState(product ? 4 : 1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [data, setData] = useState(() => ({
    customer_type: "Privatkunde",
    company: "", name: "", email: "", phone: "", vat_number: "",
    purpose: "Lagerung",
    base_size: "20 ft",
    base_type: "Standard",
    modifications: [],
    delivery_postcode: "", delivery_city: "", delivery_country: "",
    preferred_date: "", crane_required: false, ground_prepared: false,
    message: "",
    ...getProductQuoteDefaults(product),
  }));

  const set = (key, val) => setData({ ...data, [key]: val });

  const next = () => setStep((s) => moveQuoteStep(steps, s, 1));
  const prev = () => setStep((s) => moveQuoteStep(steps, s, -1));

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      await base44.entities.QuoteRequest.create(buildProductQuotePayload(data, product, intent));
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 section-space">
        <div className="max-w-lg text-center">
          <div className="w-16 h-16 mx-auto flex items-center justify-center bg-success text-success-foreground mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-3xl font-extrabold mb-4">{copy.successTitle}</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {copy.successCopy}
          </p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
            {copy.home}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card/50">
        <div className="max-w-3xl mx-auto px-6 page-heading-space">
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">{copy.title}</h1>
          <p className="mt-3 text-muted-foreground">
            {product ? purchaseCopy.quoteCopy : copy.intro}
          </p>
        </div>
      </div>

      <form className="max-w-3xl mx-auto px-6 py-10" onSubmit={(event) => { event.preventDefault(); if (step === 5) submit(); }}>
        {product && (
          <section aria-labelledby="quote-product-title" className="mb-10 bg-neutral-50 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{purchaseCopy.selectedProduct}</p>
            <h2 id="quote-product-title" className="font-heading text-xl font-bold">
              <Link to={`/container/${product.slug}`} className="hover:text-foreground hover:underline">{localizedProduct.title}</Link>
            </h2>
            <p className="mt-1 font-mono-tech text-xs text-muted-foreground">SKU: {product.sku}</p>
            <p className="mt-3 text-sm text-muted-foreground">{purchaseCopy.quoteNote}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <ChoiceButton label={purchaseCopy.estimate} active={intent === "estimate"} onClick={() => { setIntent("estimate"); setStep(4); }} />
              <ChoiceButton label={purchaseCopy.custom} active={intent === "custom"} onClick={() => { setIntent("custom"); setStep(1); }} />
            </div>
          </section>
        )}
        {/* Progress */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <button
                type="button"
                aria-current={step === s ? "step" : undefined}
                aria-label={`${i + 1}. ${stepTitles[s]}`}
                onClick={() => s < step && setStep(s)}
                className={`flex h-10 w-10 shrink-0 items-center justify-center font-mono-tech text-sm font-bold shadow-sm transition-colors ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                } ${s < step ? "cursor-pointer" : "cursor-default"}`}
              >
                {s < step ? <Check className="w-4 h-4" /> : i + 1}
              </button>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${step > s ? "bg-primary" : "bg-border"}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1 — Purpose */}
        {step === 1 && (
          <StepShell title={copy.purposeTitle} desc={copy.purposeDesc}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {copy.purposes.map(([value, label]) => (
                <ChoiceButton key={value} label={label} active={data.purpose === value} onClick={() => set("purpose", value)} />
              ))}
            </div>
          </StepShell>
        )}

        {/* Step 2 — Base container */}
        {step === 2 && (
          <StepShell title={copy.baseTitle} desc={copy.baseDesc}>
            <div className="mb-6">
              <Label>{copy.size}</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {copy.sizes.map(({ value, label }) => (
                  <ChoiceButton key={value} label={label} active={data.base_size === value} onClick={() => set("base_size", value)} />
                ))}
              </div>
            </div>
            <Label>{copy.version}</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {copy.types.map(([value, label]) => (
                <ChoiceButton key={value} label={label} active={data.base_type === value} onClick={() => set("base_type", value)} />
              ))}
            </div>
          </StepShell>
        )}

        {/* Step 4 — Delivery */}
        {step === 4 && (
          <StepShell title={copy.deliveryTitle} desc={copy.deliveryDesc}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={copy.postcode} value={data.delivery_postcode} onChange={(v) => set("delivery_postcode", v)} placeholder={copy.postcodePlaceholder} />
              <Field label={copy.city} value={data.delivery_city} onChange={(v) => set("delivery_city", v)} placeholder={copy.cityPlaceholder} />
              <Field label={copy.country} value={data.delivery_country} onChange={(v) => set("delivery_country", v)} placeholder={copy.countryDefault} />
              <Field label={copy.preferredDate} value={data.preferred_date} onChange={(v) => set("preferred_date", v)} type="date" />
            </div>
            <div className="mt-4 space-y-3">
              <Toggle label={copy.crane} checked={data.crane_required} onChange={() => set("crane_required", !data.crane_required)} />
              <Toggle label={copy.ground} checked={data.ground_prepared} onChange={() => set("ground_prepared", !data.ground_prepared)} />
            </div>
            <div className="mt-4">
              <Label>{copy.additional}</Label>
              <textarea
                value={data.message}
                onChange={(e) => set("message", e.target.value)}
                rows={4}
                className="w-full bg-input px-4 py-3 text-sm text-foreground shadow-inner placeholder:text-muted-foreground"
                placeholder={copy.additionalPlaceholder}
              />
            </div>
          </StepShell>
        )}

        {/* Step 5 — Contact */}
        {step === 5 && (
          <StepShell title={copy.contactTitle} desc={copy.contactDesc}>
            <div className="mb-4">
              <Label>{copy.customerType}</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {copy.customerTypes.map(([value, label]) => (
                  <ChoiceButton key={value} label={label} active={data.customer_type === value} onClick={() => set("customer_type", value)} />
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.customer_type === "Geschäftskunde" && (
                <Field label={copy.company} value={data.company} onChange={(v) => set("company", v)} />
              )}
              {data.customer_type === "Geschäftskunde" && (
                <Field label={copy.vat} value={data.vat_number} onChange={(v) => set("vat_number", v)} />
              )}
              <Field label={copy.name} value={data.name} onChange={(v) => set("name", v)} placeholder={copy.namePlaceholder} required />
              <Field label={copy.email} value={data.email} onChange={(v) => set("email", v)} placeholder="name@example.com" required type="email" />
              <Field label={copy.phone} value={data.phone} onChange={(v) => set("phone", v)} placeholder="+49..." />
            </div>
            <label className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
              <input type="checkbox" required className="mt-1 w-4 h-4 accent-[hsl(var(--primary))]" />
              <span>{copy.privacyBefore} <Link to="/datenschutz" className="text-primary hover:underline">{copy.privacyLink}</Link> {copy.privacyAfter}</span>
            </label>
          </StepShell>
        )}

        {/* Navigation */}
        {submitError && <p role="alert" className="mt-6 text-sm text-destructive">{purchaseCopy.submitError}</p>}
        <div className="mt-10 flex items-center justify-between">
          {step > steps[0] ? (
            <button type="button" onClick={prev} className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> {copy.back}
            </button>
          ) : <span />}
          {step < 5 ? (
            <button key="quote-next" type="button" onClick={(event) => { event.preventDefault(); next(); }} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
              {copy.next} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button key="quote-submit" type="submit" disabled={submitting} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50">
              {submitting ? copy.sending : copy.submit} <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepShell({ title, desc, children }) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-extrabold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{desc}</p>
      {children}
    </div>
  );
}

function Label({ children }) {
  return <div className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-3">{children}</div>;
}

function ChoiceButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`px-4 py-3 text-center text-sm font-medium shadow-sm transition ${
        active ? "bg-primary text-primary-foreground shadow-black/10" : "bg-secondary text-muted-foreground hover:-translate-y-0.5 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required }) {
  const id = React.useId();
  return (
    <div>
      <label htmlFor={id} className="block font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-input px-4 py-3 text-sm text-foreground shadow-inner placeholder:text-muted-foreground"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <button type="button" aria-pressed={checked} onClick={onChange} className="flex items-center gap-3 text-sm text-foreground">
      <div className={`relative h-6 w-11 shadow-inner transition-colors ${checked ? "bg-primary/20" : "bg-secondary"}`}>
        <div className={`absolute top-0.5 w-4 h-4 transition-transform ${checked ? "left-5 bg-primary" : "left-0.5 bg-muted-foreground"}`} />
      </div>
      {label}
    </button>
  );
}
