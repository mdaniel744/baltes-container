// Gallery originals are only resized/converted. The optional hero input is an
// already-reviewed background extraction, never a generated replacement product.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { SUPPLIED_PHOTO_SOURCES, SUPPLIED_HERO_SOURCE } from "../src/lib/suppliedPhotos.js";

const sourceRoot = process.argv[2];
if (!sourceRoot) throw new Error("Provide the approved source-photo folder.");
const out = path.resolve("public/images/baltes/project");
await mkdir(out, { recursive: true });
for (const [key, source] of Object.entries(SUPPLIED_PHOTO_SOURCES)) {
  await sharp(path.join(sourceRoot, source)).rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 86 }).toFile(path.join(out, `${key}.webp`));
}

const heroInput = process.argv[3];
if (heroInput) {
  const metadata = await sharp(heroInput).metadata();
  if (!metadata.hasAlpha || (await sharp(heroInput).stats()).isOpaque) {
    throw new Error("The reviewed hero must have actual alpha transparency.");
  }
  await mkdir("public/images/hero", { recursive: true });
  for (const width of [800, 1600]) {
    await sharp(heroInput).resize({ width, height: width * 3 / 4, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 90, alphaQuality: 100 })
      .toFile(path.resolve(`public/images/hero/project-container-${width}.webp`));
  }
  await writeFile("public/images/hero/source.json", JSON.stringify({
    suppliedBy: "Baltes website owner", sourceFolder: "Project Contain Products",
    sourceFile: SUPPLIED_HERO_SOURCE, photographer: null, license: null,
    processing: "Background extracted from the supplied real photograph with the built-in image editor, then resized and converted to WebP.",
    prompt: "docs/hero-background-extraction.txt",
    files: ["/images/hero/project-container-800.webp", "/images/hero/project-container-1600.webp"],
  }, null, 2));
}
await writeFile(path.join(out, "sources.json"), JSON.stringify({
  suppliedBy: "Baltes website owner", sourceFolder: "Project Contain Products",
  processing: "WebP conversion and resizing only; source photographs unchanged.",
  files: SUPPLIED_PHOTO_SOURCES,
}, null, 2));
console.log(`Imported ${Object.keys(SUPPLIED_PHOTO_SOURCES).length} photographs${heroInput ? " and two transparent hero sizes" : ""}.`);
