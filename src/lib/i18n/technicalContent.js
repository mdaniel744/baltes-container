export const TECHNICAL_CONTENT = {
  de: {
    title: "Maße & Ausstattung auf einen Blick",
    exterior: "Außenmaße", interior: "Innenmaße", dimensionView: "Maßansicht",
    length: "Länge", width: "Breite", height: "Höhe",
    schematic: "Vereinfachte 3D Ansicht. Maßangaben für dieses Produkt, keine Konstruktionszeichnung.",
    missing: "Nicht hinterlegte Angaben erhalten Sie auf Anfrage.",
    allSpecs: "Alle technischen Daten", equipment: "Zustand & Ausstattung",
    door: "Türöffnung · Breite × Höhe", diagram: "3D Volumen mit Länge, Breite und Höhe",
  },
  cs: {
    title: "Rozměry a vybavení přehledně",
    exterior: "Vnější rozměry", interior: "Vnitřní rozměry", dimensionView: "Zobrazení rozměrů",
    length: "Délka", width: "Šířka", height: "Výška",
    schematic: "Zjednodušený 3D pohled. Rozměry tohoto produktu, nikoli konstrukční výkres.",
    missing: "Neuvedené údaje jsou k dispozici na vyžádání.",
    allSpecs: "Všechny technické údaje", equipment: "Stav a vybavení",
    door: "Dveřní otvor · šířka × výška", diagram: "3D objem s délkou, šířkou a výškou",
  },
  nl: {
    title: "Afmetingen en uitrusting in één oogopslag",
    exterior: "Buitenmaten", interior: "Binnenmaten", dimensionView: "Afmetingenweergave",
    length: "Lengte", width: "Breedte", height: "Hoogte",
    schematic: "Vereenvoudigde 3D weergave. Afmetingen van dit product, geen constructietekening.",
    missing: "Ontbrekende gegevens zijn op aanvraag beschikbaar.",
    allSpecs: "Alle technische gegevens", equipment: "Conditie en uitrusting",
    door: "Deuropening · breedte × hoogte", diagram: "3D volume met lengte, breedte en hoogte",
  },
};

export function getTechnicalContent(locale) {
  return TECHNICAL_CONTENT[locale] ?? TECHNICAL_CONTENT.de;
}
