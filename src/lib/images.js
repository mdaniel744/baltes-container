import { suppliedPhoto } from "./suppliedPhotos.js";

// Owner-supplied photos; remaining licensed application photos in photography.js.
export const IMAGES = {
  logo: "/baltes-logo.png",
  hero: suppliedPhoto("twenty-anthracite"),
  container20: suppliedPhoto("twenty-blue"),
  highcube: suppliedPhoto("forty-hc-blue"),
  kuehl: suppliedPhoto("reefer-new"),
  used: suppliedPhoto("used-grey"),
  openSide: suppliedPhoto("openside-open"),
  office: suppliedPhoto("office-window"),
  delivery: "/images/photography/delivery.jpg",
};

// Kept as a compatibility export for existing catalog consumers.
export const CUTOUTS = {
  standard: IMAGES.container20,
  highcube: IMAGES.highcube,
  reefer: IMAGES.kuehl,
  openside: IMAGES.openSide,
};

export const CATEGORIES = [
  { name: "10-Fuß-Container", slug: "10-fuss", image: suppliedPhoto("ten-red"), filters: { size: "10" }, benefit: "Kompakte Lagerlösung für beengte Flächen." },
  { name: "20-Fuß-Container", slug: "20-fuss", image: CUTOUTS.standard, filters: { size: "20" }, benefit: "Der Standard für Lagerung und Transport." },
  { name: "40-Fuß-Container", slug: "40-fuss", image: suppliedPhoto("forty-grey"), filters: { size: "40" }, benefit: "Maximale Kapazität für großvolumige Güter." },
  { name: "Lagercontainer", slug: "lagercontainer", image: suppliedPhoto("twenty-white"), filters: { type: "Lagercontainer" }, benefit: "Sichere Lagerung direkt am Einsatzort." },
  { name: "High-Cube-Container", slug: "high-cube", image: CUTOUTS.highcube, filters: { type: "High-Cube-Container" }, benefit: "30 cm mehr Innenhöhe, mehr Stauraum." },
  { name: "Kühlcontainer", slug: "kuehlcontainer", image: CUTOUTS.reefer, filters: { type: "Kühlcontainer" }, benefit: "Temperaturgeregelt von -25 °C bis +25 °C." },
  { name: "Open-Side-Container", slug: "open-side", image: CUTOUTS.openside, filters: { type: "Open-Side-Container" }, benefit: "Voll öffnende Längsseite für bequeme Beladung." },
  { name: "Gebrauchte Container", slug: "gebrauchte", image: IMAGES.used, filters: { condition: "Gebraucht" }, benefit: "Geprüfte Qualität zu fairen Preisen." },
];
