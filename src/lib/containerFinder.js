export const FINDER_USE_TYPES = {
  Lagerung: ["Seecontainer", "Lagercontainer", "High-Cube-Container", "Open-Side-Container"],
  Transport: ["Seecontainer", "High-Cube-Container", "Open-Side-Container"],
  Büro: ["Bürocontainer"],
  Werkstatt: ["Bürocontainer", "Seecontainer", "High-Cube-Container", "Sondercontainer"],
  Kühlung: ["Kühlcontainer"],
  Unterkunft: ["Bürocontainer"],
};

export function normalizeContainerSize(value) {
  if (value === "Sonstige") return value;
  return String(value ?? "").match(/\d+/)?.[0] ?? "";
}

export function getFinderUseTypes(use) {
  return FINDER_USE_TYPES[use] ?? null;
}
