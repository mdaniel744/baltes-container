import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { demoProducts } from "./data/demo-products.mjs";
import { planPhotoUpdates, nonImageFields } from "./data/product-photo-updates.mjs";
import { SUPPLIED_PHOTO_SOURCES, DEMO_PHOTO_GALLERIES, suppliedPhoto, DEMO_PHOTO_COPY, hasSuppliedDemoPhoto } from "../src/lib/suppliedPhotos.js";

const previous = demoProducts.map(p => ({ ...p, id: p.sku, main_image: "/images/catalog/example.png", additional_images: ["/images/catalog/dry-interior.png"] }));

test("seventeen matching demos receive sourced photos, without substituting unmatched types", () => {
  const plan = planPhotoUpdates(previous);
  assert.equal(plan.length, 17);
  assert(!plan.some(p => ["DEMO-015", "DEMO-016", "DEMO-017"].includes(p.sku)));
  for (const change of plan) {
    assert.deepEqual(Object.keys(change.images).sort(), ["additional_images", "main_image"]);
    const before = previous.find(p => p.id === change.id);
    assert.deepEqual(nonImageFields({ ...before, ...change.images }), nonImageFields(before));
  }
});

test("photo updates are idempotent and preserve manual uploads and changed product attributes", () => {
  assert.deepEqual(planPhotoUpdates(demoProducts), []);
  assert.deepEqual(planPhotoUpdates(previous.map(p => ({ ...p, main_image: "https://example.com/custom.jpg" }))), []);
  assert.deepEqual(planPhotoUpdates(previous.map(p => ({ ...p, additional_images: ["/my-upload.jpg"] }))), []);
  assert.deepEqual(planPhotoUpdates(previous.map(p => ({ ...p, size_ft: "changed" }))), []);
  assert.deepEqual(planPhotoUpdates(previous.map(p => ({ ...p, product_type: "changed" }))), []);
  assert.deepEqual(planPhotoUpdates(previous.map(p => ({ ...p, sku: "CUSTOM" }))), []);
});

test("all supplied gallery photographs exist, with no synthetic interior fallback", () => {
  const manifest = JSON.parse(readFileSync(new URL("../public/images/baltes/project/sources.json", import.meta.url), "utf8"));
  assert.equal(manifest.sourceFolder, "Project Contain Products");
  assert.deepEqual(manifest.files, SUPPLIED_PHOTO_SOURCES);
  for (const gallery of Object.values(DEMO_PHOTO_GALLERIES)) {
    assert(gallery.length >= 3);
    for (const key of gallery) {
      assert(SUPPLIED_PHOTO_SOURCES[key]);
      assert(existsSync(new URL(`../public${suppliedPhoto(key)}`, import.meta.url)));
    }
  }
  for (const p of demoProducts.filter(hasSuppliedDemoPhoto)) {
    assert(p.main_image.startsWith("/images/baltes/project/"));
    assert(p.additional_images.every(src => src.startsWith("/images/baltes/project/")));
  }
  for (const locale of ["de", "cs", "nl"]) assert(DEMO_PHOTO_COPY[locale]);
});
