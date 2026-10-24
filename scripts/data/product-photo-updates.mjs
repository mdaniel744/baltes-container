import { isDeepStrictEqual } from "node:util";
import { demoProducts } from "./demo-products.mjs";

export function planPhotoUpdates(products) {
  const plan = [];
  for (const product of products) {
    const fixture = demoProducts.find(p => p.sku === product.sku && p.slug === product.slug);
    if (!fixture?.main_image.startsWith("/images/baltes/")) continue;
    if (product.size_ft !== fixture.size_ft || product.product_type !== fixture.product_type) continue;
    // Keep custom uploads and manually selected external images intact.
    if (![product.main_image, ...(product.additional_images || [])].every(p => /^\/images\/(catalog|baltes)\//.test(p))) continue;
    const images = { main_image: fixture.main_image, additional_images: fixture.additional_images };
    const previous = { main_image: product.main_image, additional_images: product.additional_images || [] };
    if (!isDeepStrictEqual(images, previous)) plan.push({ id: product.id, sku: product.sku, previous, images });
  }
  return plan;
}

export function nonImageFields(product) {
  return Object.fromEntries(Object.entries(product).filter(([key]) => !["main_image", "additional_images", "updated_date"].includes(key)));
}
