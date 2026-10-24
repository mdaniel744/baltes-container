import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildProductQuotePayload, getProductQuoteDefaults, getQuoteSteps, moveQuoteStep } from "../src/lib/productQuote.js";
import { PURCHASE_CONTENT, getPurchaseContent } from "../src/lib/i18n/purchaseContent.js";
import { demoProducts } from "./data/demo-products.mjs";
import { CONFIGURATOR_CONTENT } from "../src/lib/i18n/configuratorContent.js";

const data = {
  name: "Sample Customer", email: "sample@example.com", customer_type: "Privatkunde",
  purpose: "Büro", base_size: "10 ft", base_type: "Standard", modifications: ["Fenster"],
  preferred_date: "", delivery_postcode: "66787", message: "Please include crane delivery.",
};
const product = demoProducts.find((item) => item.sku === "DEMO-005");

test("general and custom quotes skip the removed customization screen both ways", () => {
  for (const selected of [null, product]) {
    const steps = getQuoteSteps(selected, "custom");
    assert.deepEqual(steps, [1, 2, 4, 5]);
    assert.equal(moveQuoteStep(steps, 1, -1), 1);
    assert.equal(moveQuoteStep(steps, 1, 1), 2);
    assert.equal(moveQuoteStep(steps, 2, 1), 4);
    assert.equal(moveQuoteStep(steps, 4, -1), 2);
    assert.equal(moveQuoteStep(steps, 4, 1), 5);
    assert.equal(moveQuoteStep(steps, 5, 1), 5);
    assert.equal(moveQuoteStep(steps, 5, -1), 4);
  }
});

test("stock product estimates retain their short delivery and contact flow", () => {
  const steps = getQuoteSteps(product, "estimate");
  assert.deepEqual(steps, [4, 5]);
  assert.equal(moveQuoteStep(steps, 4, -1), 4);
  assert.equal(moveQuoteStep(steps, 4, 1), 5);
  assert.equal(moveQuoteStep(steps, 5, -1), 4);
});

test("removed customization controls are absent in every locale", () => {
  for (const locale of ["de", "cs", "nl"]) {
    assert.deepEqual(Object.keys(CONFIGURATOR_CONTENT[locale]), Object.keys(CONFIGURATOR_CONTENT.de));
    assert.ok(!("mods" in CONFIGURATOR_CONTENT[locale]));
  }
  const source = readFileSync(new URL("../src/screens/Configurator.jsx", import.meta.url), "utf8");
  assert.ok(!source.includes("step === 3"));
  assert.ok(source.includes('key="quote-next" type="button"'));
  assert.ok(source.includes('key="quote-submit" type="submit"'));
});

test("product defaults remain valid for every sample, including special sizes", () => {
  for (const sample of demoProducts) {
    const defaults = getProductQuoteDefaults(sample);
    assert.ok(["10 ft", "20 ft", "40 ft", "Unsicher"].includes(defaults.base_size));
    assert.ok(["Standard", "High Cube", "Neu", "Gebraucht"].includes(defaults.base_type));
  }
  assert.equal(getProductQuoteDefaults(product).purpose, "Kühlung");
  assert.deepEqual(getProductQuoteDefaults(null), {});
});

test("cost estimate keeps the selected product and clears custom-only choices", () => {
  const payload = buildProductQuotePayload(data, product, "estimate");
  assert.match(payload.message, /DEMO-005/);
  assert.ok(payload.message.includes(product.slug));
  assert.ok(payload.message.includes(product.title));
  assert.match(payload.message, /Gesamtkosten/);
  assert.ok(payload.message.endsWith(data.message));
  assert.equal(payload.purpose, "Kühlung");
  assert.deepEqual(payload.modifications, []);
  assert.equal(payload.base_size, "20 ft");
  assert.equal(payload.delivery_postcode, "66787");
  assert.ok(!("preferred_date" in payload));
  assert.deepEqual(data.modifications, ["Fenster"]);
});

test("custom quote preserves the customer's configuration and valid date", () => {
  const payload = buildProductQuotePayload({ ...data, preferred_date: "2027-01-15" }, product, "custom");
  assert.deepEqual(payload.modifications, ["Fenster"]);
  assert.equal(payload.base_size, "10 ft");
  assert.equal(payload.preferred_date, "2027-01-15");
  assert.match(payload.message, /Individuelle Anpassungen/);
});

test("general requests remain independent of products and use schema values", () => {
  const payload = buildProductQuotePayload({ ...data, customer_type: "Sonstige" }, null);
  assert.equal(payload.message, data.message);
  assert.equal(payload.customer_type, "Other");
  assert.equal(payload.purpose, data.purpose);
});

test("every purchase and quote label is translated in all three languages", () => {
  for (const locale of ["de", "cs", "nl"]) {
    assert.deepEqual(Object.keys(PURCHASE_CONTENT[locale]), Object.keys(PURCHASE_CONTENT.de));
    assert.ok(Object.values(PURCHASE_CONTENT[locale]).every((value) => value.length > 0));
  }
  assert.equal(getPurchaseContent("unknown"), PURCHASE_CONTENT.de);
});
