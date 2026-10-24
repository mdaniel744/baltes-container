import test from "node:test";
import assert from "node:assert/strict";
import { formatContainerTitle } from "../src/lib/catalogPresentation.js";
import { getLocalizedProduct, translateCatalogValue } from "../src/lib/i18n/messages.js";
import { demoProducts } from "./data/demo-products.mjs";

test("container titles display without compound hyphens or dash separators", () => {
  assert.equal(formatContainerTitle("10ft-container"), "10ft container");
  assert.equal(formatContainerTitle("20-Fuß-High-Cube-Container – One-Trip"), "20 Fuß High Cube Container One Trip");
  assert.equal(formatContainerTitle("40ft‐container — Open‑Side"), "40ft container Open Side");
  assert.equal(formatContainerTitle("  Kühlcontainer  -  isoliert  "), "Kühlcontainer isoliert");
});

test("title cleanup preserves numeric ranges, measurements and negative temperatures", () => {
  assert.equal(formatContainerTitle("10–40 ft / 20-40 ft / -25°C / 2,59 m"), "10–40 ft / 20-40 ft / -25°C / 2,59 m");
  assert.equal(formatContainerTitle(null), "");
  assert.equal(formatContainerTitle(), "");
});

test("all demo product display titles are cleaned in German, Czech and Dutch without changing stored data", () => {
  const original = structuredClone(demoProducts);
  for (const product of demoProducts) {
    for (const locale of ["de", "cs", "nl"]) {
      const localized = getLocalizedProduct(product, locale);
      assert.ok(localized.title.length > 0);
      assert.doesNotMatch(localized.title, /\p{L}[-‐‑]\p{L}|\d[-‐‑]\p{L}|\s[–—-]\s/u);
    }
  }
  assert.deepEqual(demoProducts, original);
});

test("translated and generated product titles use the same display cleanup", () => {
  const product = { title: "10-Fuß-Container", product_type: "High-Cube-Container", size_ft: "10", condition: "One-Trip", translations: { cs: { title: "10stopý-kontejner – nový" } } };
  assert.equal(getLocalizedProduct(product, "de").title, "10 Fuß Container");
  assert.equal(getLocalizedProduct(product, "cs").title, "10stopý kontejner nový");
  assert.equal(getLocalizedProduct(product, "nl").title, "10 ft High cubecontainer");
});

test("catalog labels are cleaned while canonical filter values remain accepted", () => {
  assert.equal(translateCatalogValue("de", "High-Cube-Container"), "High Cube Container");
  assert.equal(translateCatalogValue("de", "One-Trip"), "One Trip");
  assert.equal(translateCatalogValue("de", "Open-Side-Container"), "Open Side Container");
  assert.equal(translateCatalogValue("de", "Sonstige"), "Sondermaß");
});
