import { readFileSync } from "node:fs";
import { createClient } from "@base44/sdk";
import { demoProducts, missingProducts } from "./data/demo-products.mjs";

const localServerUrl = process.env.BASE44_LOCAL_URL ?? "http://localhost:4400";
const sourceServerUrl = process.env.BASE44_SOURCE_URL ?? "https://base44.app";
const useRemoteCatalog = process.argv.includes("--remote");
const target = new URL(localServerUrl);
if (!["localhost", "127.0.0.1", "[::1]"].includes(target.hostname)) {
  throw new Error("The demo loader only writes to a local backend.");
}
const appConfig = readFileSync("base44/.app.jsonc", "utf8");
const appId = appConfig.match(/[a-f0-9]{24}/i)?.[0];

if (!appId) {
  throw new Error("No Base44 app ID was found. Link the project before seeding products.");
}

const source = useRemoteCatalog ? createClient({ appId, serverUrl: sourceServerUrl }) : null;
const local = createClient({ appId, serverUrl: localServerUrl });

const serverFields = new Set([
  "id",
  "created_date",
  "updated_date",
  "created_by",
  "created_by_id",
  "is_sample",
]);

const toLocalProduct = (product) =>
  Object.fromEntries(
    Object.entries(product).filter(
      ([key, value]) =>
        !serverFields.has(key) && value !== null && value !== undefined,
    ),
  );

try {
  const [sourceProducts, localProducts] = await Promise.all([
    source ? source.entities.Product.list("-created_date", 5000) : demoProducts,
    local.entities.Product.list("-created_date", 5000),
  ]);

  const missing = missingProducts(sourceProducts, localProducts).map(toLocalProduct);

  const createdProducts = missing.length
    ? await local.entities.Product.bulkCreate(missing)
    : [];

  console.log(
    `Demo catalog ready: ${localProducts.length + createdProducts.length} products (${createdProducts.length} added).`,
  );
} catch (error) {
  console.error(
    "Could not seed the local demo catalog. Start `npx base44 dev` first and try again.",
  );
  console.error(error.message || "The local product service could not be reached.");
  process.exitCode = 1;
} finally {
  source?.cleanup();
  local.cleanup();
}
