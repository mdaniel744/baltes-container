// Real photographs from the corrected "Project Contain Products" folder.
// Paths are relative to that folder. Originals are never modified.
const albums = {
  ten: "10FT Containers/10ft standard Container/10ft Red IICL6 Quality Container, 113 018-3",
  red: "20ft Container/20ft standard containers/RAL 3020/20ft Shipping Container Red IICL6, 503 152-7, RAL 3020",
  anthracite: "20ft Container/20ft standard containers/RAL 7016/20ft Dry Van container one tripper, 263 755-7, RAL 7016",
  blue: "20ft Container/20ft standard containers/RAL 5010/20ft Dry Van shipping container one tripper, 262 207-4, RAL 5010",
  storage: "20ft Container/20ft standard containers/RAL 7035/20ft GP Shipping Container Brand new, 735 102-6, RAL 7035",
  forty: "40FT Container/40FT Container/RAL 7035/40ft Shipping Container Dry Van NEW One-Way Trip, 400 150-8, RAL 7035",
  highcube: "40FT High Cube Container/40FT High Cube Container/40ft High Cube Container IICL6 Quality TOP Condition, 174 730-3, RAL 5010",
  newReefer: "20ft Container/20ft REEFER CONTAINER/20ft Refrigerated Single - Trip Reefer Container, 520 072-0",
  reefer: "20ft Container/20ft REEFER CONTAINER/20ft refrigerated container 20ft Carrier – used, 374 150-0",
  openside: "20ft Container/20ft Container Full Side Opening/Full opening container 20ft IICL, 613 033-4",
  office: "20ft Container/20ft office container/BASIC 6 m insulated construction container, 152 544 730",
  used: "20ft Container/20ft standard containers/RAL 7015/20ft Shipping Container After Multiple Trips IICL5, 251 692-2, RAL 7015",
};
const photo = (album, name, number) => `${albums[album]}/${name}${number ? ` (${number})` : ""}.jpg`;
export const SUPPLIED_PHOTO_SOURCES = {
  "ten-red": photo("ten", "10ft Red IICL6 Quality Container, 113 018-3", 1),
  "ten-angle": photo("ten", "10ft Red IICL6 Quality Container, 113 018-3", 6),
  "ten-open": photo("ten", "10ft Red IICL6 Quality Container, 113 018-3", 2),
  "ten-doors": photo("ten", "10ft Red IICL6 Quality Container, 113 018-3", 9),
  "twenty-red": photo("red", "Standardcontainer 20ft, ny, rød", 1),
  "twenty-red-angle": photo("red", "Standardcontainer 20ft, ny, rød"),
  "twenty-red-open": photo("red", "Standardcontainer 20ft, ny, rød", 7),
  "twenty-red-interior": photo("red", "Standardcontainer 20ft, ny, rød", 8),
  "twenty-blue": photo("blue", "20ft Dry Van shipping container one tripper, 262 207-4, RAL 5010", 4),
  "twenty-anthracite": photo("anthracite", "20ft Dry Van container one tripper, 263 755-7", 1),
  "twenty-white": photo("storage", "20ft GP Shipping Container Brand new, 735 102-6", 1),
  "twenty-white-angle": photo("storage", "20ft GP Shipping Container Brand new, 735 102-6", 15),
  "twenty-white-open": photo("storage", "20ft GP Shipping Container Brand new, 735 102-6", 7),
  "twenty-white-interior": photo("storage", "20ft GP Shipping Container Brand new, 735 102-6", 8),
  "forty-grey": photo("forty", "40ft Shipping Container Dry Van NEW One-Way Trip, 400 150-8, RAL 7035", 8),
  "forty-side": photo("forty", "40ft Shipping Container Dry Van NEW One-Way Trip, 400 150-8, RAL 7035", 4),
  "forty-open": photo("forty", "40ft Shipping Container Dry Van NEW One-Way Trip, 400 150-8, RAL 7035", 3),
  "forty-interior": photo("forty", "40ft Shipping Container Dry Van NEW One-Way Trip, 400 150-8, RAL 7035", 9),
  "forty-hc-blue": photo("highcube", "40ft High Cube Container IICL6 Quality TOP Condition, 174 730-3, RAL 5010", 7),
  "forty-hc-angle": photo("highcube", "40ft High Cube Container IICL6 Quality TOP Condition, 174 730-3, RAL 5010", 8),
  "forty-hc-open": photo("highcube", "40ft High Cube Container IICL6 Quality TOP Condition, 174 730-3, RAL 5010", 14),
  "forty-hc-interior": photo("highcube", "40ft High Cube Container IICL6 Quality TOP Condition, 174 730-3, RAL 5010", 15),
  "reefer-new": photo("newReefer", "20ft Refrigerated Single - Trip Reefer Container, 520 072-0", 3),
  "reefer-unit": photo("reefer", "20ft refrigerated container 20ft Carrier – used, 374 150-0", 1),
  "reefer-doors": photo("reefer", "20ft refrigerated container 20ft Carrier – used, 374 150-0", 2),
  "reefer-front": photo("reefer", "20ft refrigerated container 20ft Carrier – used, 374 150-0", 4),
  "openside-blue": photo("openside", "Full opening container 20ft IICL, 613 033-4", 4),
  "openside-open": photo("openside", "Full opening container 20ft IICL, 613 033-4", 1),
  "openside-doors": photo("openside", "Full opening container 20ft IICL, 613 033-4", 6),
  "openside-interior": photo("openside", "Full opening container 20ft IICL, 613 033-4", 9),
  "office-front": photo("office", "BASIC 6 m insulated construction container, 152 544 730", 1),
  "office-rear": photo("office", "BASIC 6 m insulated construction container, 152 544 730", 15),
  "office-interior": photo("office", "BASIC 6 m insulated construction container, 152 544 730", 2),
  "office-window": photo("office", "BASIC 6 m insulated construction container, 152 544 730", 7),
  "used-grey": photo("used", "20ft Shipping Container After Multiple Trips IICL5, 251 692-2, RAL 7015", 1),
  "used-side": photo("used", "20ft Shipping Container After Multiple Trips IICL5, 251 692-2, RAL 7015", 2),
  "used-open": photo("used", "20ft Shipping Container After Multiple Trips IICL5, 251 692-2, RAL 7015", 3),
};

export const suppliedPhoto = (key) => `/images/baltes/project/${key}.webp`;
export const SUPPLIED_HERO_SOURCE = SUPPLIED_PHOTO_SOURCES["twenty-anthracite"];

// Only exact size/type matches. These are representative images of demo products;
// their example RAL colours, grade and stock values are not verified photo metadata.
export const DEMO_PHOTO_GALLERIES = {
  ten: ["ten-red", "ten-angle", "ten-open", "ten-doors"],
  twenty: ["twenty-red", "twenty-red-angle", "twenty-red-open", "twenty-red-interior"],
  forty: ["forty-grey", "forty-side", "forty-open", "forty-interior"],
  highcube: ["forty-hc-blue", "forty-hc-angle", "forty-hc-open", "forty-hc-interior"],
  storage: ["twenty-white", "twenty-white-angle", "twenty-white-open", "twenty-white-interior"],
  reefer: ["reefer-unit", "reefer-doors", "reefer-front"],
  openside: ["openside-blue", "openside-open", "openside-doors", "openside-interior"],
  office: ["office-front", "office-rear", "office-interior", "office-window"],
  used: ["used-grey", "used-side", "used-open"],
};

export function suppliedDemoImages(profile) {
  const gallery = DEMO_PHOTO_GALLERIES[profile]?.map(suppliedPhoto);
  return gallery ? { main_image: gallery[0], additional_images: gallery.slice(1) } : null;
}

export const DEMO_PHOTO_COPY = {
  de: "Beispielfotos des Containertyps. Farbe, Zustand und Ausstattung können vom Demoartikel abweichen.",
  cs: "Ilustrační fotografie typu kontejneru. Barva, stav a vybavení se mohou lišit od ukázkového produktu.",
  nl: "Voorbeeldfoto's van het containertype. Kleur, staat en uitvoering kunnen afwijken van het demoproduct.",
};

export function hasSuppliedDemoPhoto(product) {
  return /^DEMO-\d{3}$/.test(product?.sku || "") && product?.main_image?.startsWith("/images/baltes/");
}
