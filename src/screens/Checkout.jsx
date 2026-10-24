"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  LockKeyhole,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import { useCart } from "@/lib/CartContext";
import { useLocale } from "@/lib/i18n/LocaleContext";
import {
  formatCurrency,
  getLocalizedProduct,
} from "@/lib/i18n/messages";
import { Link } from "@/lib/router";
import {
  calculateOrderTotals,
  catalogGrossToNet,
  CHECKOUT_COUNTRIES,
  getCheckoutCountryForLocale,
  roundCurrency,
} from "@/lib/checkoutPricing";

const INITIAL_FORM = {
  customer_type: "Privatkunde",
  billing_name: "",
  billing_company: "",
  billing_email: "",
  billing_phone: "",
  billing_vat_number: "",
  billing_address: "",
  billing_postcode: "",
  billing_city: "",
  billing_country: "DE",
  delivery_same_as_billing: true,
  delivery_name: "",
  delivery_company: "",
  delivery_address: "",
  delivery_postcode: "",
  delivery_city: "",
  delivery_country: "DE",
  payment_method: "Banküberweisung",
  customer_note: "",
  terms_accepted: false,
};

const inputClass =
  "mt-2 w-full bg-secondary px-4 py-3 text-sm text-foreground shadow-inner outline-none transition focus:bg-background focus:ring-2 focus:ring-primary";

function Field({ label, children, required = false, className = "" }) {
  return (
    <label className={`block text-sm font-semibold text-foreground ${className}`}>
      {label}{required ? <span className="ml-1 text-primary">*</span> : null}
      {children}
    </label>
  );
}

export default function Checkout() {
  const { items, clearCart } = useCart();
  const { locale, t } = useLocale();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(() => {
    const country = getCheckoutCountryForLocale(locale);
    return {
      ...INITIAL_FORM,
      billing_country: country,
      delivery_country: country,
    };
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);

  useEffect(() => {
    const requestedCountry = new URLSearchParams(window.location.search).get("country");
    if (!CHECKOUT_COUNTRIES.includes(requestedCountry)) return;
    setForm((current) => ({
      ...current,
      billing_country: requestedCountry,
      delivery_country: requestedCountry,
    }));
  }, []);

  const localizedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        localized: getLocalizedProduct(item.product, locale),
      })),
    [items, locale],
  );

  const setField = (field, value) => {
    setError("");
    setForm((current) => ({ ...current, [field]: value }));
  };

  const delivery = form.delivery_same_as_billing
    ? {
        name: form.billing_name,
        company: form.billing_company,
        address: form.billing_address,
        postcode: form.billing_postcode,
        city: form.billing_city,
        country: form.billing_country,
      }
    : {
        name: form.delivery_name,
        company: form.delivery_company,
        address: form.delivery_address,
        postcode: form.delivery_postcode,
        city: form.delivery_city,
        country: form.delivery_country,
      };

  const totals = useMemo(
    () => calculateOrderTotals(items, delivery.country, delivery.postcode),
    [delivery.country, delivery.postcode, items],
  );
  const countryLabel = (countryCode) =>
    t(`checkout.country${countryCode}`);
  const money = (value, currency = "EUR") =>
    formatCurrency(locale, value, currency, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const validateDetails = () => {
    const billingRequired = [
      "billing_name",
      "billing_email",
      "billing_phone",
      "billing_address",
      "billing_postcode",
      "billing_city",
      "billing_country",
    ];
    const deliveryRequired = form.delivery_same_as_billing
      ? []
      : [
          "delivery_name",
          "delivery_address",
          "delivery_postcode",
          "delivery_city",
          "delivery_country",
        ];
    const missing = [...billingRequired, ...deliveryRequired].some(
      (key) => !String(form[key] ?? "").trim(),
    );

    if (missing) {
      setError(t("checkout.requiredError"));
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.billing_email)) {
      setError(t("checkout.emailError"));
      return false;
    }
    return true;
  };

  const continueFromDetails = (event) => {
    event.preventDefault();
    if (!validateDetails()) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const continueFromPayment = (event) => {
    event.preventDefault();
    if (!form.payment_method) {
      setError(t("checkout.paymentError"));
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitOrder = async () => {
    if (!form.terms_accepted) {
      setError(t("checkout.termsError"));
      return;
    }

    setSubmitting(true);
    setError("");
    const orderNumber = `BC-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;

    try {
      const payload = {
        order_number: orderNumber,
        status: "Eingegangen",
        payment_status: "Ausstehend",
        locale,
        customer_type: form.customer_type,
        billing_name: form.billing_name.trim(),
        billing_company: form.billing_company.trim(),
        billing_email: form.billing_email.trim(),
        billing_phone: form.billing_phone.trim(),
        billing_vat_number: form.billing_vat_number.trim(),
        billing_address: form.billing_address.trim(),
        billing_postcode: form.billing_postcode.trim(),
        billing_city: form.billing_city.trim(),
        billing_country: form.billing_country.trim(),
        delivery_same_as_billing: form.delivery_same_as_billing,
        delivery_name: delivery.name.trim(),
        delivery_company: delivery.company.trim(),
        delivery_address: delivery.address.trim(),
        delivery_postcode: delivery.postcode.trim(),
        delivery_city: delivery.city.trim(),
        delivery_country: delivery.country.trim(),
        payment_method: form.payment_method,
        items: items.map(({ product, quantity }) => {
          const catalogPriceGrossDE = Number(product.price_gross) || 0;
          const unitPriceNet = catalogGrossToNet(catalogPriceGrossDE);
          const lineNet = catalogGrossToNet(catalogPriceGrossDE * quantity);
          return {
            product_id: String(product.id || ""),
            slug: product.slug || "",
            sku: product.sku || "",
            title: product.title || "",
            unit_price: catalogPriceGrossDE,
            catalog_price_gross_de: catalogPriceGrossDE,
            unit_price_net: unitPriceNet,
            quantity,
            line_total: roundCurrency(catalogPriceGrossDE * quantity),
            line_net: lineNet,
            vat_rate: totals.vatRate,
            vat_amount: roundCurrency(lineNet * totals.vatRate),
            currency: product.currency || "EUR",
          };
        }),
        items_total: totals.goodsNet,
        catalog_gross_total_de: totals.catalogGrossDE,
        goods_net_total: totals.goodsNet,
        delivery_estimate_net: totals.deliveryNet,
        vat_country: totals.countryCode,
        vat_rate: totals.vatRate,
        vat_amount: totals.vatAmount,
        order_total: totals.orderTotal,
        currency: "EUR",
        delivery_cost_status: "Geschätzt",
        customer_note: form.customer_note.trim(),
        terms_accepted: true,
      };

      await base44.entities.StoreOrder.create(payload);
      setCompletedOrder({ orderNumber, email: form.billing_email });
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submissionError) {
      console.error("Order creation failed", submissionError);
      setError(t("checkout.submitError"));
    } finally {
      setSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="min-h-[70vh] bg-background px-6 section-space">
        <div className="mx-auto max-w-2xl bg-card p-8 text-center shadow-[0_18px_55px_rgba(0,0,0,0.10)] md:p-12">
          <div className="mx-auto grid h-16 w-16 place-items-center bg-success text-success-foreground">
            <PackageCheck className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-extrabold md:text-4xl">
            {t("checkout.successTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t("checkout.successCopy", { email: completedOrder.email })}
          </p>
          <div className="mx-auto mt-7 max-w-sm bg-secondary px-5 py-4">
            <span className="block text-xs uppercase tracking-wider text-muted-foreground">
              {t("checkout.orderNumber")}
            </span>
            <strong className="mt-1 block font-mono-tech text-lg text-primary">
              {completedOrder.orderNumber}
            </strong>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {t("checkout.successPayment")}
          </p>
          <Link
            to="/container-kaufen"
            className="mt-8 inline-flex items-center justify-center bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-primary/90"
          >
            {t("checkout.backToShop")}
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[65vh] bg-background px-6 section-space">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center bg-secondary text-foreground">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-extrabold">
            {t("checkout.emptyTitle")}
          </h1>
          <p className="mt-3 text-muted-foreground">{t("checkout.emptyCopy")}</p>
          <Link
            to="/container-kaufen"
            className="mt-7 inline-flex bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-black/10"
          >
            {t("checkout.backToShop")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary/65">
        <div className="mx-auto max-w-terminal px-6 py-10">
          <h1 className="font-heading text-3xl font-extrabold md:text-4xl">
            {t("checkout.title")}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{t("checkout.intro")}</p>
        </div>
      </header>

      <div className="mx-auto max-w-terminal px-6 py-10">
        <div className="mb-10 grid grid-cols-3 gap-3" aria-label={t("checkout.progressLabel")}>
          {["details", "payment", "review"].map((key, index) => {
            const number = index + 1;
            const active = step >= number;
            return (
              <div key={key} className="flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center font-bold ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                >
                  {step > number ? <Check className="h-4 w-4" /> : number}
                </span>
                <span className={`hidden text-sm font-bold sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}>
                  {t(`checkout.step${number}`)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section>
            {step === 1 ? (
              <form onSubmit={continueFromDetails} className="space-y-8">
                <div className="bg-card p-6 shadow-[0_14px_40px_rgba(0,0,0,0.08)] md:p-8">
                  <h2 className="font-heading text-2xl font-extrabold">{t("checkout.billingTitle")}</h2>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <Field label={t("checkout.customerType")} className="md:col-span-2">
                      <select
                        value={form.customer_type}
                        onChange={(event) => {
                          const customerType = event.target.value;
                          setError("");
                          setForm((current) => ({
                            ...current,
                            customer_type: customerType,
                            payment_method:
                              customerType === "Privatkunde" && current.payment_method === "Rechnung"
                                ? "Banküberweisung"
                                : current.payment_method,
                          }));
                        }}
                        className={inputClass}
                      >
                        <option value="Privatkunde">{t("checkout.privateCustomer")}</option>
                        <option value="Geschäftskunde">{t("checkout.businessCustomer")}</option>
                      </select>
                    </Field>
                    <Field label={t("checkout.name")} required>
                      <input className={inputClass} value={form.billing_name} onChange={(event) => setField("billing_name", event.target.value)} autoComplete="name" required />
                    </Field>
                    <Field label={t("checkout.company")}>
                      <input className={inputClass} value={form.billing_company} onChange={(event) => setField("billing_company", event.target.value)} autoComplete="organization" />
                    </Field>
                    <Field label={t("checkout.email")} required>
                      <input className={inputClass} type="email" value={form.billing_email} onChange={(event) => setField("billing_email", event.target.value)} autoComplete="email" required />
                    </Field>
                    <Field label={t("checkout.phone")} required>
                      <input className={inputClass} type="tel" value={form.billing_phone} onChange={(event) => setField("billing_phone", event.target.value)} autoComplete="tel" required />
                    </Field>
                    {form.customer_type === "Geschäftskunde" ? (
                      <Field label={t("checkout.vatNumber")} className="md:col-span-2">
                        <input className={inputClass} value={form.billing_vat_number} onChange={(event) => setField("billing_vat_number", event.target.value)} />
                      </Field>
                    ) : null}
                    <Field label={t("checkout.address")} required className="md:col-span-2">
                      <input className={inputClass} value={form.billing_address} onChange={(event) => setField("billing_address", event.target.value)} autoComplete="street-address" required />
                    </Field>
                    <Field label={t("checkout.postcode")} required>
                      <input className={inputClass} value={form.billing_postcode} onChange={(event) => setField("billing_postcode", event.target.value)} autoComplete="postal-code" required />
                    </Field>
                    <Field label={t("checkout.city")} required>
                      <input className={inputClass} value={form.billing_city} onChange={(event) => setField("billing_city", event.target.value)} autoComplete="address-level2" required />
                    </Field>
                    <Field label={t("checkout.country")} required className="md:col-span-2">
                      <select className={inputClass} value={form.billing_country} onChange={(event) => setField("billing_country", event.target.value)} autoComplete="country-name" required>
                        {CHECKOUT_COUNTRIES.map((countryCode) => (
                          <option key={countryCode} value={countryCode}>{countryLabel(countryCode)}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </div>

                <div className="bg-card p-6 shadow-[0_14px_40px_rgba(0,0,0,0.08)] md:p-8">
                  <div className="flex items-start gap-3">
                    <input
                      id="same-address"
                      type="checkbox"
                      checked={form.delivery_same_as_billing}
                      onChange={(event) => setField("delivery_same_as_billing", event.target.checked)}
                      className="mt-1 h-5 w-5 accent-primary"
                    />
                    <label htmlFor="same-address" className="font-semibold">
                      {t("checkout.sameAddress")}
                    </label>
                  </div>
                  {!form.delivery_same_as_billing ? (
                    <div className="mt-7">
                      <h2 className="font-heading text-2xl font-extrabold">{t("checkout.deliveryTitle")}</h2>
                      <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <Field label={t("checkout.name")} required>
                          <input className={inputClass} value={form.delivery_name} onChange={(event) => setField("delivery_name", event.target.value)} required />
                        </Field>
                        <Field label={t("checkout.company")}>
                          <input className={inputClass} value={form.delivery_company} onChange={(event) => setField("delivery_company", event.target.value)} />
                        </Field>
                        <Field label={t("checkout.address")} required className="md:col-span-2">
                          <input className={inputClass} value={form.delivery_address} onChange={(event) => setField("delivery_address", event.target.value)} required />
                        </Field>
                        <Field label={t("checkout.postcode")} required>
                          <input className={inputClass} value={form.delivery_postcode} onChange={(event) => setField("delivery_postcode", event.target.value)} required />
                        </Field>
                        <Field label={t("checkout.city")} required>
                          <input className={inputClass} value={form.delivery_city} onChange={(event) => setField("delivery_city", event.target.value)} required />
                        </Field>
                        <Field label={t("checkout.country")} required className="md:col-span-2">
                          <select className={inputClass} value={form.delivery_country} onChange={(event) => setField("delivery_country", event.target.value)} required>
                            {CHECKOUT_COUNTRIES.map((countryCode) => (
                              <option key={countryCode} value={countryCode}>{countryLabel(countryCode)}</option>
                            ))}
                          </select>
                        </Field>
                      </div>
                    </div>
                  ) : null}
                </div>

                {error ? <p role="alert" className="bg-destructive/10 p-4 text-sm font-semibold text-destructive">{error}</p> : null}
                <div className="flex justify-end">
                  <button type="submit" className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-primary/90">
                    {t("checkout.toPayment")} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            ) : null}

            {step === 2 ? (
              <form onSubmit={continueFromPayment} className="space-y-7">
                <div className="bg-card p-6 shadow-[0_14px_40px_rgba(0,0,0,0.08)] md:p-8">
                  <h2 className="font-heading text-2xl font-extrabold">{t("checkout.paymentTitle")}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{t("checkout.paymentIntro")}</p>
                  <div className="mt-6 space-y-4">
                    <button
                      type="button"
                      onClick={() => setField("payment_method", "Banküberweisung")}
                      className={`flex w-full items-start gap-4 p-5 text-left shadow-sm transition ${form.payment_method === "Banküberweisung" ? "bg-primary/10 ring-2 ring-primary" : "bg-secondary hover:bg-accent"}`}
                    >
                      <Banknote className="mt-0.5 h-6 w-6 shrink-0 text-foreground" />
                      <span>
                        <strong className="block">{t("checkout.bankTransfer")}</strong>
                        <span className="mt-1 block text-sm text-muted-foreground">{t("checkout.bankTransferCopy")}</span>
                      </span>
                    </button>
                    {form.customer_type === "Geschäftskunde" ? (
                      <button
                        type="button"
                        onClick={() => setField("payment_method", "Rechnung")}
                        className={`flex w-full items-start gap-4 p-5 text-left shadow-sm transition ${form.payment_method === "Rechnung" ? "bg-primary/10 ring-2 ring-primary" : "bg-secondary hover:bg-accent"}`}
                      >
                        <Building2 className="mt-0.5 h-6 w-6 shrink-0 text-foreground" />
                        <span>
                          <strong className="block">{t("checkout.invoice")}</strong>
                          <span className="mt-1 block text-sm text-muted-foreground">{t("checkout.invoiceCopy")}</span>
                        </span>
                      </button>
                    ) : null}
                  </div>
                  <div className="mt-6 flex gap-3 bg-secondary p-4 text-sm text-muted-foreground">
                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <p>{t("checkout.paymentSecurity")}</p>
                  </div>
                </div>
                {error ? <p role="alert" className="bg-destructive/10 p-4 text-sm font-semibold text-destructive">{error}</p> : null}
                <div className="flex flex-wrap justify-between gap-3">
                  <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-2 bg-secondary px-6 py-3 font-bold text-foreground transition hover:bg-accent">
                    <ArrowLeft className="h-4 w-4" /> {t("checkout.back")}
                  </button>
                  <button type="submit" className="inline-flex items-center gap-2 bg-primary px-7 py-3 font-bold text-primary-foreground shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-primary/90">
                    {t("checkout.toReview")} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            ) : null}

            {step === 3 ? (
              <div className="space-y-7">
                <div className="bg-card p-6 shadow-[0_14px_40px_rgba(0,0,0,0.08)] md:p-8">
                  <h2 className="font-heading text-2xl font-extrabold">{t("checkout.reviewTitle")}</h2>
                  <div className="mt-6 grid gap-7 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">{t("checkout.billingTitle")}</h3>
                      <address className="mt-2 not-italic text-sm leading-6 text-muted-foreground">
                        <strong className="text-foreground">{form.billing_name}</strong><br />
                        {form.billing_company ? <>{form.billing_company}<br /></> : null}
                        {form.billing_address}<br />
                        {form.billing_postcode} {form.billing_city}<br />
                        {countryLabel(form.billing_country)}<br />
                        {form.billing_email}<br />
                        {form.billing_phone}
                      </address>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">{t("checkout.deliveryTitle")}</h3>
                      <address className="mt-2 not-italic text-sm leading-6 text-muted-foreground">
                        <strong className="text-foreground">{delivery.name}</strong><br />
                        {delivery.company ? <>{delivery.company}<br /></> : null}
                        {delivery.address}<br />
                        {delivery.postcode} {delivery.city}<br />
                        {countryLabel(delivery.country)}
                      </address>
                    </div>
                  </div>
                  <div className="mt-7 bg-secondary p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("checkout.paymentTitle")}</span>
                    <strong className="mt-1 block">{form.payment_method === "Rechnung" ? t("checkout.invoice") : t("checkout.bankTransfer")}</strong>
                  </div>
                  <Field label={t("checkout.note")} className="mt-7">
                    <textarea className={`${inputClass} min-h-28 resize-y`} value={form.customer_note} onChange={(event) => setField("customer_note", event.target.value)} placeholder={t("checkout.notePlaceholder")} />
                  </Field>
                  <div className="mt-7 flex items-start gap-3 bg-primary/5 p-5">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={form.terms_accepted}
                      onChange={(event) => setField("terms_accepted", event.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 accent-primary"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      {t("checkout.termsPrefix")} <Link to="/agb" target="_blank" className="font-semibold text-primary hover:underline">{t("checkout.terms")}</Link> {t("checkout.and")} <Link to="/datenschutz" target="_blank" className="font-semibold text-primary hover:underline">{t("checkout.privacy")}</Link> {t("checkout.termsSuffix")}
                    </label>
                  </div>
                </div>
                {error ? <p role="alert" className="bg-destructive/10 p-4 text-sm font-semibold text-destructive">{error}</p> : null}
                <div className="flex flex-wrap justify-between gap-3">
                  <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-2 bg-secondary px-6 py-3 font-bold text-foreground transition hover:bg-accent">
                    <ArrowLeft className="h-4 w-4" /> {t("checkout.back")}
                  </button>
                  <button type="button" onClick={submitOrder} disabled={submitting} className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-wait disabled:opacity-60">
                    {submitting ? t("checkout.submitting") : t("checkout.placeOrder")} <CheckCircle2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : null}
          </section>

          <aside className="h-fit bg-card p-6 shadow-[0_14px_40px_rgba(0,0,0,0.08)] lg:sticky lg:top-28">
            <h2 className="font-heading text-xl font-extrabold">{t("checkout.summary")}</h2>
            <div className="mt-5 space-y-4">
              {localizedItems.map(({ product, quantity, localized }) => (
                <div key={product.id || product.slug} className="flex gap-3">
                  <div className="h-20 w-24 shrink-0 overflow-hidden bg-secondary">
                    <Image src={product.main_image} alt={localized.title} fittingType="fill" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-bold leading-snug">{localized.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t("checkout.quantity")}: {quantity}</p>
                    <p className="mt-1 text-sm font-bold text-foreground">
                      {money(catalogGrossToNet((Number(product.price_gross) || 0) * quantity), product.currency || "EUR")}
                      <span className="ml-1 text-[10px] font-medium uppercase text-muted-foreground">{t("cart.netShort")}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-secondary p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("cart.netGoods")}</span>
                <strong>{money(totals.goodsNet)}</strong>
              </div>
              <div className="mt-3 flex items-start justify-between gap-4 text-sm">
                <span className="text-muted-foreground">{t("cart.deliveryEstimate")}</span>
                <strong className="text-right">{money(totals.deliveryNet)}</strong>
              </div>
              <div className="mt-3 flex items-start justify-between gap-4 text-sm">
                <span className="text-muted-foreground">{t("cart.vat", { rate: totals.vatPercent, country: totals.countryCode })}</span>
                <strong className="text-right">{money(totals.vatAmount)}</strong>
              </div>
              <div className="mt-4 flex items-center justify-between bg-background px-4 py-3">
                <span className="font-bold">{t("cart.estimatedTotal")}</span>
                <strong className="font-heading text-xl text-foreground">{money(totals.orderTotal)}</strong>
              </div>
            </div>
            <div className="mt-5 flex gap-3 text-xs leading-relaxed text-muted-foreground">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />
              <p>{t("checkout.deliveryNotice", { country: countryLabel(totals.countryCode) })}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
