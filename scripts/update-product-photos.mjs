import { existsSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { isDeepStrictEqual } from "node:util";
import { createClient } from "@base44/sdk";
import { planPhotoUpdates, nonImageFields } from "./data/product-photo-updates.mjs";

const serverUrl = process.env.BASE44_LOCAL_URL || "http://localhost:4400";
const target = new URL(serverUrl);
if (target.protocol !== "http:" || !["localhost", "127.0.0.1", "[::1]"].includes(target.hostname)) {
  throw new Error("Photo updates are restricted to the local development backend.");
}
const appId = readFileSync("base44/.app.jsonc", "utf8").match(/[a-f0-9]{24}/i)?.[0];
if (!appId) throw new Error("Missing local app ID.");
const client = createClient({ appId, serverUrl });
try {
  const products = await client.entities.Product.list("-created_date", 5000);
  const plan = planPhotoUpdates(products);
  for (const change of plan) {
    for (const file of [change.images.main_image, ...change.images.additional_images]) {
      if (!existsSync(`public${file}`)) throw new Error(`Missing asset: ${file}`);
    }
  }
  console.log(`${plan.length} image-only updates planned; ${products.length - plan.length} records unchanged.`);
  console.log(plan.map(p => `${p.sku}: ${p.images.main_image} (${p.images.additional_images.length + 1} photos)`).join("\n"));
  if (process.argv.includes("--apply") && plan.length) {
    mkdirSync("photo-backups.local", { recursive: true });
    const backup = `photo-backups.local/${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    writeFileSync(backup, JSON.stringify({ serverUrl, products: plan.map(({ id, sku, previous }) => ({ id, sku, ...previous })) }, null, 2), { flag: "wx" });
    console.log(`Previous images saved to ${backup}`);
    for (const change of plan) {
      const before = products.find(p => p.id === change.id);
      const current = await client.entities.Product.get(change.id);
      if (!isDeepStrictEqual(current, before)) throw new Error(`${change.sku} changed since planning; stopping to preserve edits.`);
      await client.entities.Product.update(change.id, change.images);
      const after = await client.entities.Product.get(change.id);
      if (!isDeepStrictEqual(nonImageFields(before), nonImageFields(after))) throw new Error(`Unexpected non-image change for ${change.sku}.`);
      if (!isDeepStrictEqual({ main_image: after.main_image, additional_images: after.additional_images }, change.images)) throw new Error(`Image verification failed for ${change.sku}.`);
    }
    console.log(`Verified ${plan.length} updated galleries; all non-image product fields preserved.`);
  }
} catch (error) {
  console.error(error.message || "Unable to reach the local product backend.");
  process.exitCode = 1;
} finally {
  client.cleanup();
}
