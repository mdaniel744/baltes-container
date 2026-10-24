const NUMBER_LOCALES = { de: "de-DE", cs: "cs-CZ", nl: "nl-NL" };

// Missing measurements must never be replaced with assumed standard dimensions.
export function positiveMeasurement(value) {
  if (typeof value !== "number" && typeof value !== "string") return null;
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

export function formatMeasurement(value, locale, unit, divisor = 1) {
  const number = positiveMeasurement(value);
  if (number === null) return "—";
  return `${new Intl.NumberFormat(NUMBER_LOCALES[locale] ?? NUMBER_LOCALES.de, {
    maximumFractionDigits: 3,
  }).format(number / divisor)} ${unit}`;
}

export function getProductDimensions(product, mode = "exterior") {
  const prefix = mode === "interior" ? "int" : "ext";
  return ["length", "width", "height"].map((axis) => ({
    axis,
    value: positiveMeasurement(product?.[`${prefix}_${axis}_mm`]),
  }));
}
