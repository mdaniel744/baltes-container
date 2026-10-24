import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { demoProducts, missingProducts } from "./data/demo-products.mjs";
import { CATEGORIES } from "../src/lib/images.js";
import { getLocalizedProduct, translateCatalogValue } from "../src/lib/i18n/messages.js";
import { normalizeContainerSize } from "../src/lib/containerFinder.js";

const schema = JSON.parse(readFileSync(new URL("../base44/entities/Product.jsonc", import.meta.url), "utf8"));

test("every sample populates every schema property with the correct type and enum", () => {
  for (const p of demoProducts) {
    for (const [key, field] of Object.entries(schema.properties)) {
      const value = p[key];
      assert.notEqual(value, undefined, `${p.sku}: missing ${key}`);
      if (field.type === "integer") assert(Number.isInteger(value), `${p.sku}: ${key}`);
      else if (field.type === "array") assert(Array.isArray(value) && value.length, `${p.sku}: ${key}`);
      else assert.equal(typeof value, field.type, `${p.sku}: ${key}`);
      if (field.type === "string") assert(value.trim(), `${p.sku}: empty ${key}`);
      if (field.enum) assert(field.enum.includes(value), `${p.sku}: invalid ${key}`);
    }
    assert.equal(p.payload_kg + p.tare_weight_kg, p.max_gross_weight_kg);
    for (const axis of ["length", "width", "height"]) assert(p[`int_${axis}_mm`] < p[`ext_${axis}_mm`]);
    assert.equal(p.quantity > 0, p.availability === "Auf Lager");
    assert.equal(p.is_purchasable, p.price_gross > 0);
  }
});

test("the catalog covers every category, enum and commercial display state", () => {
  for (const key of ["product_type", "size_ft", "condition", "condition_grade", "availability", "csc_status"]) {
    assert.deepEqual(new Set(demoProducts.map(p => p[key])), new Set(schema.properties[key].enum), key);
  }
  assert.equal(demoProducts.filter(p => p.featured).length, 6);
  assert(demoProducts.some(p => !p.is_purchasable));
  assert(demoProducts.some(p => p.is_purchasable && p.availability === "Ausverkauft"));
  for (const category of CATEGORIES) {
    assert(demoProducts.some(p => Object.entries(category.filters).every(([key, value]) => p[{size: "size_ft", type: "product_type", condition: "condition"}[key]] === value)), category.slug);
  }
  assert.equal(new Set(CATEGORIES.map(c => c.image)).size, 8);
  assert.equal(normalizeContainerSize("Sonstige"), "Sonstige");
  assert.equal(normalizeContainerSize("20 Fuß"), "20");
});

test("product galleries and all category banners exist locally", () => {
  const images = new Set([...CATEGORIES.map(c => c.image), ...demoProducts.flatMap(p => [p.main_image, ...p.additional_images])]);
  for (const image of images) assert(existsSync(new URL(`../public${image}`, import.meta.url)), image);
  for (const p of demoProducts) assert(new Set([p.main_image, ...p.additional_images]).size >= 2);
});

test("all three locales have product descriptions and translated floor specifications", () => {
  for (const product of demoProducts) {
    for (const locale of ["de", "cs", "nl"]) {
      const p = getLocalizedProduct(product, locale);
      for (const value of Object.values(p)) assert(value && value !== "—");
      if (locale !== "de") {
        assert.notEqual(p.description, product.description);
        assert.notEqual(p.floorType, product.floor_type);
        assert.notEqual(translateCatalogValue(locale, "Ausverkauft"), "Ausverkauft");
      }
    }
  }
});

test("repeat seeding preserves edits and deduplicates by either SKU or slug", () => {
  assert.equal(new Set(demoProducts.map(p => p.sku)).size, demoProducts.length);
  assert.equal(new Set(demoProducts.map(p => p.slug)).size, demoProducts.length);
  const edited = demoProducts.map(p => ({...p, title: "Edited title", price_gross: 123}));
  assert.deepEqual(missingProducts(demoProducts, edited), []);
  assert.equal(edited[0].title, "Edited title");
  assert.equal(missingProducts(demoProducts, [{sku: demoProducts[0].sku, slug: "changed-slug"}]).length, demoProducts.length - 1);
  assert.equal(missingProducts(demoProducts, [{sku: "changed-sku", slug: demoProducts[0].slug}]).length, demoProducts.length - 1);
});
