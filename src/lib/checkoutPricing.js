const GERMAN_CATALOG_VAT_RATE = 0.19;

export const CHECKOUT_COUNTRIES = ["DE", "CZ", "NL"];

export const VAT_RATES = {
  DE: 0.19,
  CZ: 0.21,
  NL: 0.21,
};

// Editable net delivery estimates per container. The German value matches the
// existing product-page calculator; cross-border values are conservative
// estimates and remain subject to the final access and crane check.
export const DELIVERY_ESTIMATE_PER_CONTAINER = {
  DE: 180,
  CZ: 350,
  NL: 300,
};

const LOCALE_COUNTRY = {
  de: "DE",
  cs: "CZ",
  nl: "NL",
};

const LEGACY_COUNTRY_CODES = {
  deutschland: "DE",
  germany: "DE",
  duitsland: "DE",
  německo: "DE",
  czechia: "CZ",
  "czech republic": "CZ",
  tschechien: "CZ",
  tschechische: "CZ",
  česko: "CZ",
  "česká republika": "CZ",
  netherlands: "NL",
  niederlande: "NL",
  nederland: "NL",
  nizozemsko: "NL",
};

export const roundCurrency = (value) =>
  Math.round((Number(value) + Number.EPSILON) * 100) / 100;

export function normalizeCheckoutCountry(country) {
  const normalized = String(country || "").trim();
  const upper = normalized.toUpperCase();
  if (CHECKOUT_COUNTRIES.includes(upper)) return upper;
  return LEGACY_COUNTRY_CODES[normalized.toLowerCase()] || "DE";
}

export function getCheckoutCountryForLocale(locale) {
  return LOCALE_COUNTRY[locale] || "DE";
}

export function catalogGrossToNet(grossPrice) {
  return roundCurrency((Number(grossPrice) || 0) / (1 + GERMAN_CATALOG_VAT_RATE));
}

export function getDeliveryEstimate(country, postcode, quantity = 1) {
  const countryCode = normalizeCheckoutCountry(country);
  const units = Math.max(1, Number(quantity) || 1);
  const base = DELIVERY_ESTIMATE_PER_CONTAINER[countryCode] * units;

  if (countryCode !== "DE") return roundCurrency(base);

  const firstDigit = Number.parseInt(String(postcode || "").trim().charAt(0), 10);
  const postcodeSurcharge = firstDigit >= 8 ? 60 : firstDigit >= 6 ? 30 : 0;
  return roundCurrency(base + postcodeSurcharge);
}

export function calculateOrderTotals(items, country, postcode = "") {
  const countryCode = normalizeCheckoutCountry(country);
  const vatRate = VAT_RATES[countryCode];
  const totalUnits = items.reduce(
    (total, item) => total + Math.max(1, Number(item.quantity) || 1),
    0,
  );
  const catalogGrossDE = roundCurrency(
    items.reduce(
      (total, item) =>
        total + (Number(item.product?.price_gross) || 0) * (Number(item.quantity) || 1),
      0,
    ),
  );
  const goodsNet = roundCurrency(
    items.reduce(
      (total, item) =>
        total +
        ((Number(item.product?.price_gross) || 0) *
          (Number(item.quantity) || 1)) /
          (1 + GERMAN_CATALOG_VAT_RATE),
      0,
    ),
  );
  const deliveryNet = getDeliveryEstimate(countryCode, postcode, totalUnits);
  const taxableNet = roundCurrency(goodsNet + deliveryNet);
  const vatAmount = roundCurrency(taxableNet * vatRate);
  const orderTotal = roundCurrency(taxableNet + vatAmount);

  return {
    countryCode,
    vatRate,
    vatPercent: Math.round(vatRate * 100),
    totalUnits,
    catalogGrossDE,
    goodsNet,
    deliveryNet,
    taxableNet,
    vatAmount,
    orderTotal,
  };
}
