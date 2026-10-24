import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { HERO_CONTAINER_SIZES, HERO_PHOTO, heroShopLink } from "../src/lib/heroContainer.js";
import { normalizeContainerSize } from "../src/lib/containerFinder.js";
import { HOME_CONTENT } from "../src/lib/i18n/homeContent.js";
import sharp from "sharp";
import { SUPPLIED_HERO_SOURCE } from "../src/lib/suppliedPhotos.js";

test("hero uses local responsive photographs with recorded provenance", () => {
  for (const path of Object.values(HERO_PHOTO)) {
    assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)));
  }
  const source = JSON.parse(readFileSync(new URL("../public/images/hero/source.json", import.meta.url), "utf8"));
  assert.equal(source.suppliedBy, "Baltes website owner");
  assert.equal(source.sourceFile, SUPPLIED_HERO_SOURCE);
  assert.equal(source.sourceFolder, "Project Contain Products");
  assert.equal(source.photographer, null); // Do not invent ownership or licensing.
  assert.equal(source.files.length, 2);
});

test("hero retains actual alpha transparency at both responsive sizes", async () => {
  for (const path of Object.values(HERO_PHOTO)) {
    const file = new URL(`../public${path}`, import.meta.url);
    const data = readFileSync(file);
    assert((await sharp(data).metadata()).hasAlpha);
    assert.equal((await sharp(data).stats()).isOpaque, false);
  }
});

test("each hero shortcut opens the existing matching shop filter", () => {
  assert.deepEqual(HERO_CONTAINER_SIZES, ["10", "20", "40"]);
  for (const size of HERO_CONTAINER_SIZES) {
    const url = new URL(heroShopLink(size), "http://localhost:3000");
    assert.equal(url.pathname, "/container-kaufen");
    assert.equal(normalizeContainerSize(url.searchParams.get("size")), size);
  }
  assert.equal(heroShopLink("<unknown>"), "/container-kaufen?size=20");
});

test("hero copy and photo descriptions are available in all three languages", () => {
  const keys = ["title", "titleSecond", "description", "heritage", "primaryCta", "secondaryCta", "consultation", "sizeLabel", "viewSize", "imageAlt"];
  for (const locale of ["de", "cs", "nl"]) {
    for (const key of keys) assert.ok(HOME_CONTENT[locale].hero[key]?.trim(), `${locale}.${key}`);
    assert.ok(HOME_CONTENT[locale].hero.viewSize.includes("{size}"));
    assert.ok(!("modelLabel" in HOME_CONTENT[locale].hero));
  }
});

test("hero photograph has responsive sizing and does not load a 3D scene", () => {
  const source = readFileSync(new URL("../src/components/home/HeroContainer.jsx", import.meta.url), "utf8");
  assert.ok(source.includes("srcSet="));
  assert.ok(source.includes("sizes="));
  assert.ok(source.includes('fetchPriority="high"'));
  assert.ok(source.includes('loading="eager"'));
  assert.ok(!source.includes("heroContainerScene"));
  assert.ok(!source.includes("onPointer"));
});
