export function getQuoteSteps(product, intent = "custom") {
  return product && intent === "estimate" ? [4, 5] : [1, 2, 4, 5];
}

export function moveQuoteStep(steps, current, direction) {
  const index = Math.max(0, steps.indexOf(current));
  return steps[Math.max(0, Math.min(steps.length - 1, index + direction))];
}

export function getProductQuoteDefaults(product) {
  if (!product) return {};
  const purposes = {
    Bürocontainer: "Büro",
    Sanitärcontainer: "Sanitär",
    Kühlcontainer: "Kühlung",
  };
  return {
    purpose: purposes[product.product_type] || "Lagerung",
    base_size: ["10", "20", "40"].includes(product.size_ft) ? `${product.size_ft} ft` : "Unsicher",
    base_type: product.product_type === "High-Cube-Container"
      ? "High Cube"
      : product.condition === "Gebraucht" ? "Gebraucht" : "Neu",
  };
}

export function buildProductQuotePayload(data, product, intent = "custom") {
  const payload = { ...data, customer_type: data.customer_type === "Sonstige" ? "Other" : data.customer_type };
  if (!payload.preferred_date) delete payload.preferred_date;
  if (!product) return payload;

  // Keep the product reference in the existing message field; no cart or order is created.
  const context = [
    intent === "estimate" ? "Anfrage: Gesamtkosten einschließlich Lieferung und Aufstellung" : "Anfrage: Individuelle Anpassungen",
    `Produkt: ${product.title}`,
    `SKU: ${product.sku}`,
    `Typ / Größe: ${product.product_type} / ${product.size_ft}`,
    `Produktseite: /container/${product.slug}`,
  ];
  payload.message = [...context, "", data.message || ""].join("\n");
  // An estimate for the stock product must not retain modifications from the custom path.
  if (intent === "estimate") {
    Object.assign(payload, getProductQuoteDefaults(product), { modifications: [] });
  }
  return payload;
}
