import { supabase, STORE_ID } from "./client";

// Maps the dashboard's German attribute keys (products.attributes JSON) onto
// the flat field names the storefront UI already reads everywhere.
const ATTRIBUTE_FIELD_MAP = {
  "Containertyp": "product_type",
  "Größe (Fuß)": "size_ft",
  "Zustand": "condition",
  "Zustandsklasse": "condition_grade",
  "Farbe": "color",
  "Standort": "depot",
  "Verfügbarkeit": "availability",
  "Außenlänge (mm)": "ext_length_mm",
  "Außenbreite (mm)": "ext_width_mm",
  "Außenhöhe (mm)": "ext_height_mm",
  "Innenlänge (mm)": "int_length_mm",
  "Innenbreite (mm)": "int_width_mm",
  "Innenhöhe (mm)": "int_height_mm",
  "Türbreite (mm)": "door_width_mm",
  "Türhöhe (mm)": "door_height_mm",
  "Leergewicht (kg)": "tare_weight_kg",
  "Max. Gesamtgewicht (kg)": "max_gross_weight_kg",
  "Nutzlast (kg)": "payload_kg",
  "Volumen (m³)": "volume_m3",
  "CSC-Status": "csc_status",
  "Bodenbelag": "floor_type",
  "Abschließbar": "lockbox",
  "Lüftungsschlitze": "vents",
  "Staplertaschen": "forklift_pockets",
  "WWT-geprüft": "wwt_status",
  "Cargo-Worthy": "cargo_worthy",
};

const BOOLEAN_FIELDS = new Set([
  "lockbox",
  "vents",
  "forklift_pockets",
  "wwt_status",
  "cargo_worthy",
]);

function flattenAttributes(attributes) {
  const flat = {};
  for (const [germanKey, value] of Object.entries(attributes || {})) {
    const fieldName = ATTRIBUTE_FIELD_MAP[germanKey];
    if (!fieldName) continue;
    flat[fieldName] = BOOLEAN_FIELDS.has(fieldName) ? value === "Ja" : value;
  }
  return flat;
}

const TRANSLATABLE_FIELDS = { name: "title", description: "description", short_description: "short_description" };

function buildTranslations(translationRows, productId) {
  const translations = {};
  for (const row of translationRows) {
    if (row.entity_id !== productId) continue;
    const field = TRANSLATABLE_FIELDS[row.field_name];
    if (!field) continue;
    translations[row.locale] = translations[row.locale] || {};
    translations[row.locale][field] = row.value;
  }
  return translations;
}

function normalizeProduct(row, translationRows) {
  const [mainImage, ...additionalImages] = row.images || [];
  return {
    id: row.id,
    title: row.name,
    slug: row.slug,
    sku: row.sku,
    ...flattenAttributes(row.attributes),
    price_gross: row.price,
    sale_price_gross: row.sale_price,
    currency: row.currency,
    quantity: row.stock_quantity,
    main_image: mainImage || null,
    additional_images: additionalImages,
    short_description: row.short_description,
    description: row.description,
    is_purchasable: (row.price ?? 0) > 0,
    featured: row.is_featured,
    translations: buildTranslations(translationRows, row.id),
  };
}

async function fetchTranslationsForProducts(productIds) {
  if (!productIds.length) return [];
  const { data, error } = await supabase
    .from("translations")
    .select("entity_id, field_name, locale, value")
    .eq("store_id", STORE_ID)
    .eq("entity_type", "product")
    .in("entity_id", productIds);
  if (error) {
    console.error("Failed to fetch product translations", error);
    return [];
  }
  return data || [];
}

async function withTranslations(rows) {
  const translationRows = await fetchTranslationsForProducts(rows.map((row) => row.id));
  return rows.map((row) => normalizeProduct(row, translationRows));
}

export async function fetchProducts({ limit = 50 } = {}) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", STORE_ID)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("Failed to fetch products", error);
    return [];
  }
  return withTranslations(data);
}

export async function fetchFeaturedProducts(limit = 6) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", STORE_ID)
    .eq("status", "active")
    .eq("is_featured", true)
    .order("sku", { ascending: true })
    .limit(limit);
  if (error) {
    console.error("Failed to fetch featured products", error);
    return [];
  }
  return withTranslations(data);
}

export async function fetchProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("store_id", STORE_ID)
    .eq("status", "active")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("Failed to fetch product by slug", error);
    return null;
  }
  if (!data) return null;
  const [normalized] = await withTranslations([data]);
  return normalized;
}
