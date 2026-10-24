import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { IMAGES, CATEGORIES } from "../src/lib/images.js";
import { PHOTO_CREDITS, PHOTO_CREDIT_COPY } from "../src/lib/photography.js";
import { HERO_PHOTO } from "../src/lib/heroContainer.js";
import { HOME_CONTENT } from "../src/lib/i18n/homeContent.js";
import { SUPPLIED_PHOTO_SOURCES, suppliedPhoto } from "../src/lib/suppliedPhotos.js";

test("all marketing images are local photographs with recorded sources", () => {
  const credited = new Set(PHOTO_CREDITS.map(photo => photo.file));
  Object.keys(SUPPLIED_PHOTO_SOURCES).forEach(key => credited.add(suppliedPhoto(key)));
  Object.values(HERO_PHOTO).forEach(path => credited.add(path));
  const assets = [...Object.entries(IMAGES).filter(([key]) => key !== "logo").map(([,path]) => path), ...CATEGORIES.map(cat => cat.image), ...Object.values(HERO_PHOTO)];
  for (const path of assets) {
    assert(credited.has(path), `Missing credit: ${path}`);
    assert(existsSync(new URL(`../public${path}`, import.meta.url)), path);
    assert(!path.includes("generated_") && !path.includes("/catalog/"));
  }
  for (const photo of PHOTO_CREDITS) {
    assert(photo.author && photo.title && photo.license);
    assert.equal(new URL(photo.source).protocol, "https:");
    assert.equal(new URL(photo.licenseUrl).protocol, "https:");
  }
});

test("the single-container hero and image credits support every storefront locale", () => {
  for (const locale of ["de", "cs", "nl"]) {
    assert(PHOTO_CREDIT_COPY[locale].title);
    assert(PHOTO_CREDIT_COPY[locale].note.includes("Baltes Container"));
    assert(!/Gestapelte|Naskládané|Gestapelde/.test(HOME_CONTENT[locale].hero.imageAlt));
  }
  const css = readFileSync(new URL("../src/components/home/hero.css", import.meta.url), "utf8");
  assert(css.includes("object-fit: contain"));
  assert(css.includes("background: transparent"));
  const legal = readFileSync(new URL("../src/components/LocalizedLegalDocument.jsx", import.meta.url), "utf8");
  assert(legal.includes('documentKey === "imprint" && <PhotoCredits />'));
});
