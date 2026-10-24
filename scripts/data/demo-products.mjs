// Editable, offline sample catalog. Measurements and prices are illustrative,
// not an offer or a certification for a real container.
import { suppliedDemoImages } from "../../src/lib/suppliedPhotos.js";
const asset = (name) => `/images/catalog/${name}.png`;

const profiles = {
  compact: { size: "Sonstige", type: "Sondercontainer", image: "compact", interior: "dry-interior", color: "RAL 7016", exterior: [2438, 2200, 2260], inside: [2287, 2112, 2059], door: [2106, 1949], tare: 900, max: 6000, floor: "wood", cargo: false },
  ten: { size: "10", type: "Seecontainer", image: "10-foot", interior: "dry-interior", color: "RAL 3020", exterior: [2991, 2438, 2591], inside: [2831, 2352, 2393], door: [2340, 2280], tare: 1300, max: 10160, floor: "wood", cargo: true },
  twenty: { size: "20", type: "Seecontainer", image: "20-foot", interior: "dry-interior", color: "RAL 3020", exterior: [6058, 2438, 2591], inside: [5898, 2352, 2393], door: [2340, 2280], tare: 2200, max: 30480, floor: "wood", cargo: true },
  forty: { size: "40", type: "Seecontainer", image: "40-foot", interior: "dry-interior", color: "RAL 7016", exterior: [12192, 2438, 2591], inside: [12032, 2352, 2393], door: [2340, 2280], tare: 3700, max: 30480, floor: "wood", cargo: true },
  storage: { size: "20", type: "Lagercontainer", image: "storage", interior: "dry-interior", color: "RAL 7035", exterior: [6058, 2438, 2591], inside: [5898, 2352, 2393], door: [2340, 2280], tare: 2150, max: 24000, floor: "wood", cargo: false },
  highcube: { size: "40", type: "High-Cube-Container", image: "high-cube", interior: "dry-interior", color: "RAL 5011", exterior: [12192, 2438, 2896], inside: [12032, 2352, 2698], door: [2340, 2585], tare: 3900, max: 30480, floor: "wood", cargo: true },
  reefer: { size: "20", type: "Kühlcontainer", image: "reefer", interior: "reefer-interior", color: "RAL 9010", exterior: [6058, 2438, 2591], inside: [5450, 2290, 2260], door: [2290, 2210], tare: 3050, max: 30480, floor: "aluminum", cargo: true },
  openside: { size: "20", type: "Open-Side-Container", image: "open-side", interior: "dry-interior", color: "RAL 3020", exterior: [6058, 2438, 2591], inside: [5898, 2287, 2302], door: [2340, 2280], tare: 3200, max: 24000, floor: "wood", cargo: true },
  used: { size: "20", type: "Seecontainer", image: "used", interior: "dry-interior", color: "RAL 5010", exterior: [6058, 2438, 2591], inside: [5898, 2352, 2393], door: [2340, 2280], tare: 2300, max: 30480, floor: "wood", cargo: true },
  office: { size: "20", type: "Bürocontainer", image: "office", interior: "office-interior", color: "RAL 9010 / RAL 7016", exterior: [6058, 2438, 2800], inside: [5820, 2200, 2500], door: [900, 2000], tare: 2500, max: 8000, floor: "vinyl", cargo: false },
  sanitary: { size: "20", type: "Sanitärcontainer", image: "sanitary", interior: "sanitary-interior", color: "RAL 9010 / RAL 7016", exterior: [6058, 2438, 2800], inside: [5820, 2200, 2500], door: [900, 2000], tare: 2900, max: 8000, floor: "wetroom", cargo: false },
  workshop: { size: "30", type: "Sondercontainer", image: "workshop", interior: "workshop-interior", color: "RAL 7016", exterior: [9125, 2438, 2591], inside: [8900, 2280, 2300], door: [2500, 2200], tare: 3800, max: 14000, floor: "steel", cargo: false },
};

const floors = {
  wood: { de: "28 mm Sperrholzboden", cs: "Překližková podlaha 28 mm", nl: "Multiplexvloer 28 mm" },
  aluminum: { de: "Aluminium-T-Profilboden", cs: "Hliníková podlaha s T-profily", nl: "Aluminium T-profielvloer" },
  vinyl: { de: "Gedämmter Boden mit Vinylbelag", cs: "Izolovaná podlaha s vinylem", nl: "Geïsoleerde vloer met vinyl" },
  wetroom: { de: "Rutschhemmender Nassraumboden", cs: "Protiskluzová podlaha do mokrých prostor", nl: "Antislipvloer voor natte ruimtes" },
  steel: { de: "Stahl-Riffelblechboden", cs: "Podlaha z ocelového slzičkového plechu", nl: "Stalen traanplaatvloer" },
};

const descriptions = {
  Seecontainer: {
    de: ["Robuster Stahlcontainer für Transport und geschützte Lagerung.", "Doppelflügeltüren erleichtern die Beladung. Die technische Tabelle zeigt Außen- und Innenmaße, Türöffnung, Gewichte und Ausstattung dieses Mustercontainers."],
    cs: ["Odolný ocelový kontejner pro přepravu a chráněné skladování.", "Dvoukřídlé dveře usnadňují nakládání. Technická tabulka uvádí vnější i vnitřní rozměry, dveřní otvor, hmotnosti a vybavení tohoto vzorového kontejneru."],
    nl: ["Robuuste stalen container voor transport en beschermde opslag.", "Dubbele deuren maken laden eenvoudig. De technische tabel toont buiten- en binnenmaten, deuropening, gewichten en uitrusting van deze voorbeeldcontainer."],
  },
  Lagercontainer: {
    de: ["Abschließbarer Stauraum für Werkzeuge, Material und saisonale Waren.", "Die große Türöffnung und der belastbare Boden eignen sich für den täglichen Lagerbetrieb. Dieses Modell ist für die stationäre Nutzung vorgesehen."],
    cs: ["Uzamykatelný prostor pro nářadí, materiál a sezónní zboží.", "Velký dveřní otvor a odolná podlaha jsou vhodné pro každodenní skladování. Tento model je určen pro stacionární použití."],
    nl: ["Afsluitbare opslag voor gereedschap, materiaal en seizoensgoederen.", "De grote deuropening en stevige vloer zijn geschikt voor dagelijks gebruik. Dit model is bedoeld voor stationaire opslag."],
  },
  "High-Cube-Container": {
    de: ["Zusätzliche Innenhöhe für hohe Waren und mehr Lagerkapazität.", "Die erhöhte Bauform bietet mehr Volumen bei gleicher Grundfläche wie ein Standardcontainer. Maße und Nutzlast sind in den technischen Daten aufgeführt."],
    cs: ["Větší vnitřní výška pro vysoké zboží a větší skladovou kapacitu.", "Zvýšená konstrukce poskytuje větší objem při stejné půdorysné ploše jako standardní kontejner. Rozměry a užitečné zatížení jsou v technických údajích."],
    nl: ["Extra binnenhoogte voor hoge goederen en meer opslagcapaciteit.", "De verhoogde uitvoering biedt meer volume op hetzelfde grondoppervlak als een standaardcontainer. Maten en laadvermogen staan bij de technische gegevens."],
  },
  "Open-Side-Container": {
    de: ["Vollständig öffnende Längsseite für bequemes seitliches Beladen.", "Die seitlichen Türen erlauben direkten Zugriff auf breite Güter und Paletten. Die angegebenen Türmaße beziehen sich auf die Stirntüren."],
    cs: ["Plně otevíratelná boční stěna pro snadné nakládání z boku.", "Boční dveře umožňují přímý přístup k širokému zboží a paletám. Uvedené rozměry dveří se vztahují na čelní dveře."],
    nl: ["Volledig te openen lange zijde voor eenvoudig laden vanaf de zijkant.", "De zijdeuren geven direct toegang tot brede goederen en pallets. De opgegeven deurmaten gelden voor de deuren aan het uiteinde."],
  },
  Kühlcontainer: {
    de: ["Isolierter Kühlcontainer mit eigenem Kälteaggregat.", "Der Aluminium-T-Profilboden unterstützt die Luftzirkulation. Stromversorgung und gewünschter Temperaturbereich werden vor einem realen Einsatz projektspezifisch abgestimmt."],
    cs: ["Izolovaný chladicí kontejner s vlastní chladicí jednotkou.", "Hliníková podlaha s T-profily podporuje cirkulaci vzduchu. Napájení a požadovaný teplotní rozsah se před skutečným použitím sjednávají podle projektu."],
    nl: ["Geïsoleerde koelcontainer met eigen koelinstallatie.", "De aluminium T-profielvloer ondersteunt de luchtcirculatie. Stroomvoorziening en gewenst temperatuurbereik worden voor werkelijk gebruik per project afgestemd."],
  },
  Bürocontainer: {
    de: ["Heller, gedämmter Arbeitsraum mit Fenstern und separatem Eingang.", "Das Raummodul eignet sich als temporäres Baustellen- oder Projektbüro. Elektroausstattung, Heizung und Möblierung werden passend zum Projekt geplant."],
    cs: ["Světlý izolovaný pracovní prostor s okny a samostatným vstupem.", "Modul je vhodný jako dočasná kancelář na stavbě nebo pro projektový tým. Elektroinstalace, topení a nábytek se plánují podle projektu."],
    nl: ["Lichte, geïsoleerde werkruimte met ramen en een eigen ingang.", "De module is geschikt als tijdelijk bouw- of projectkantoor. Elektrische installatie, verwarming en meubilair worden per project gepland."],
  },
  Sanitärcontainer: {
    de: ["Mobiler Sanitärraum mit getrennten Zugängen und pflegeleichten Oberflächen.", "Das Modul ist für temporäre Sanitärversorgung vorgesehen. Frischwasser-, Abwasser- und Stromanschlüsse müssen am Aufstellort vorbereitet werden."],
    cs: ["Mobilní sanitární prostor s oddělenými vstupy a snadno udržovatelnými povrchy.", "Modul je určen pro dočasné sanitární zázemí. Na místě musí být připraveny přípojky vody, kanalizace a elektřiny."],
    nl: ["Mobiele sanitaire ruimte met aparte ingangen en onderhoudsvriendelijke oppervlakken.", "De module biedt tijdelijke sanitaire voorzieningen. Water-, afvalwater- en stroomaansluitingen moeten op de locatie worden voorbereid."],
  },
  Sondercontainer: {
    de: ["Spezielle Containerlösung für individuelle Platz- und Nutzungsanforderungen.", "Abmessungen, Zugang und Ausstattung unterscheiden sich vom Standardmodell. Die dargestellte Konfiguration dient als Grundlage für die weitere Planung."],
    cs: ["Speciální kontejnerové řešení pro individuální prostorové a provozní požadavky.", "Rozměry, vstup a vybavení se liší od standardního modelu. Zobrazená konfigurace slouží jako základ pro další plánování."],
    nl: ["Speciale containeroplossing voor individuele ruimte- en gebruikseisen.", "Afmetingen, toegang en uitrusting wijken af van het standaardmodel. De getoonde configuratie vormt een basis voor verdere planning."],
  },
};

// sku, profile, condition, grade, availability, stock, gross EUR price, depot,
// German / Czech / Dutch title. Keep SKUs and slugs stable when editing.
const entries = [
  ["DEMO-001", "ten", "Neu", "Neu", "Auf Lager", 5, 2499, "Hamburg", "10-Fuß-Seecontainer – kompakt & neu", "Námořní kontejner 10 stop – kompaktní a nový", "10 ft zeecontainer – compact en nieuw"],
  ["DEMO-002", "twenty", "One-Trip", "One-Trip", "Auf Lager", 12, 3190, "Rotterdam", "20-Fuß-Seecontainer – One-Trip", "Námořní kontejner 20 stop – One-Trip", "20 ft zeecontainer – one-trip"],
  ["DEMO-003", "forty", "Neu", "Neu", "Auf Lager", 4, 5290, "Duisburg", "40-Fuß-Seecontainer – viel Platz", "Námořní kontejner 40 stop – velký prostor", "40 ft zeecontainer – veel ruimte"],
  ["DEMO-004", "highcube", "One-Trip", "One-Trip", "Auf Lager", 7, 5890, "Hamburg", "40-Fuß-High-Cube – extra Innenhöhe", "High-cube kontejner 40 stop – větší výška", "40 ft high-cubecontainer – extra hoogte"],
  ["DEMO-005", "reefer", "Gebraucht", "IICL", "Auf Lager", 2, 8790, "Rotterdam", "20-Fuß-Kühlcontainer – isoliert", "Chladicí kontejner 20 stop – izolovaný", "20 ft koelcontainer – geïsoleerd"],
  ["DEMO-006", "openside", "Neu", "Neu", "Auf Lager", 3, 6490, "Praha", "20-Fuß-Open-Side – seitlich beladbar", "Open-side kontejner 20 stop – boční nakládání", "20 ft open-sidecontainer – zijdelings laden"],
  ["DEMO-007", "storage", "Neu", "Neu", "Auf Lager", 8, 2890, "Wadgassen", "20-Fuß-Lagercontainer – Materiallager", "Skladový kontejner 20 stop – sklad materiálu", "20 ft opslagcontainer – materiaalopslag"],
  ["DEMO-008", "used", "Gebraucht", "CW", "Auf Lager", 9, 1790, "Hamburg", "20-Fuß-Seecontainer – gebraucht, CW", "Námořní kontejner 20 stop – použitý, CW", "20 ft zeecontainer – gebruikt, CW"],
  ["DEMO-009", "used", "Gebraucht", "WWT", "Auf Lager", 1, 1490, "Duisburg", "20-Fuß-Container – WWT-Lagerlösung", "Kontejner 20 stop – skladové řešení WWT", "20 ft container – WWT-opslag"],
  ["DEMO-010", "used", "Gebraucht", "CW", "Ausverkauft", 0, 1690, "Rotterdam", "20-Fuß-Seecontainer – ausverkauft", "Námořní kontejner 20 stop – vyprodáno", "20 ft zeecontainer – uitverkocht"],
  ["DEMO-011", "twenty", "Neu", "Neu", "Auf Lager", 6, 3490, "Praha", "20-Fuß-Seecontainer – neue Ausführung", "Námořní kontejner 20 stop – nové provedení", "20 ft zeecontainer – nieuwe uitvoering"],
  ["DEMO-012", "twenty", "Neu", "Neu", "Bestellbar", 0, 3390, "Wadgassen", "20-Fuß-Seecontainer – vorbestellbar", "Námořní kontejner 20 stop – na objednávku", "20 ft zeecontainer – te bestellen"],
  ["DEMO-013", "forty", "One-Trip", "One-Trip", "Bestellbar", 0, 4890, "Rotterdam", "40-Fuß-Seecontainer – One-Trip auf Bestellung", "Námořní kontejner 40 stop – One-Trip na objednávku", "40 ft zeecontainer – one-trip op bestelling"],
  ["DEMO-014", "office", "Neu", "Neu", "Bestellbar", 0, 0, "Wadgassen", "20-Fuß-Bürocontainer – Projektbüro", "Kancelářský kontejner 20 stop – projektová kancelář", "20 ft kantoorcontainer – projectkantoor"],
  ["DEMO-015", "sanitary", "Neu", "Neu", "Bestellbar", 0, 0, "Praha", "20-Fuß-Sanitärcontainer – flexible Versorgung", "Sanitární kontejner 20 stop – flexibilní zázemí", "20 ft sanitaircontainer – flexibele voorzieningen"],
  ["DEMO-016", "workshop", "Neu", "Neu", "Bestellbar", 0, 0, "Duisburg", "30-Fuß-Werkstattcontainer – Sonderausbau", "Dílenský kontejner 30 stop – speciální úprava", "30 ft werkplaatscontainer – maatwerk"],
  ["DEMO-017", "compact", "Neu", "Neu", "Auf Lager", 3, 1990, "Wadgassen", "8-Fuß-Kompaktcontainer – Sondermaß", "Kompaktní kontejner 8 stop – speciální rozměr", "8 ft compacte container – afwijkende maat"],
  ["DEMO-018", "ten", "One-Trip", "One-Trip", "Ausverkauft", 0, 2290, "Hamburg", "10-Fuß-Container – One-Trip, ausverkauft", "Kontejner 10 stop – One-Trip, vyprodáno", "10 ft container – one-trip, uitverkocht"],
  ["DEMO-019", "used", "Gebraucht", "IICL", "Auf Lager", 2, 2190, "Praha", "20-Fuß-Seecontainer – IICL-Ausführung", "Námořní kontejner 20 stop – provedení IICL", "20 ft zeecontainer – IICL-uitvoering"],
  ["DEMO-020", "highcube", "Neu", "Neu", "Bestellbar", 0, 6290, "Rotterdam", "40-Fuß-High-Cube – neu auf Bestellung", "High-cube kontejner 40 stop – nový na objednávku", "40 ft high-cubecontainer – nieuw op bestelling"],
];

const demoNote = {
  de: "Musterprodukt für die Gestaltung des Shops. Bilder, Preise, Bestände, Maße und Zertifizierungsangaben sind illustrative Beispieldaten und kein reales Verkaufsangebot.",
  cs: "Vzorový produkt pro návrh obchodu. Obrázky, ceny, zásoby, rozměry a údaje o certifikaci jsou ilustrační a nepředstavují skutečnou nabídku.",
  nl: "Voorbeeldproduct voor het ontwerpen van de winkel. Afbeeldingen, prijzen, voorraad, maten en certificeringsgegevens zijn illustratief en vormen geen werkelijk verkoopaanbod.",
};

export const demoProducts = entries.map(([sku, key, condition, condition_grade, availability, quantity, price_gross, depot, de, cs, nl], index) => {
  const p = profiles[key];
  const typeCopy = descriptions[p.type];
  const copy = (locale, title) => ({
    title,
    short_description: typeCopy[locale][0],
    description: `${typeCopy[locale][1]} ${demoNote[locale]}`,
    floor_type: floors[p.floor][locale],
  });
  const german = copy("de", de);
  const cargo = p.cargo && condition_grade !== "WWT";
  return {
    title: german.title,
    slug: `demo-${sku.slice(-3)}-${key}`,
    sku,
    product_type: p.type,
    size_ft: p.size,
    condition,
    condition_grade,
    color: p.color,
    depot,
    price_gross,
    currency: "EUR",
    availability,
    quantity,
    ext_length_mm: p.exterior[0], ext_width_mm: p.exterior[1], ext_height_mm: p.exterior[2],
    int_length_mm: p.inside[0], int_width_mm: p.inside[1], int_height_mm: p.inside[2],
    door_width_mm: p.door[0], door_height_mm: p.door[1],
    tare_weight_kg: p.tare,
    max_gross_weight_kg: p.max,
    payload_kg: p.max - p.tare,
    volume_m3: Math.round(p.inside.reduce((volume, mm) => volume * mm / 1000, 1) * 10) / 10,
    csc_status: !p.cargo ? "Nicht erforderlich" : condition_grade === "WWT" ? "Abgelaufen" : "Gültig",
    wwt_status: true,
    cargo_worthy: cargo,
    floor_type: german.floor_type,
    lockbox: !["office", "sanitary", "used", "reefer"].includes(key),
    vents: key !== "reefer",
    forklift_pockets: ["compact", "ten", "twenty", "storage", "used", "openside"].includes(key),
    main_image: asset(p.image),
    additional_images: [asset(p.interior)],
    ...suppliedDemoImages(key),
    short_description: german.short_description,
    description: german.description,
    is_purchasable: price_gross > 0,
    featured: index < 6,
    translations: { cs: copy("cs", cs), nl: copy("nl", nl) },
  };
});

export function missingProducts(candidates, existing) {
  const slugs = new Set(existing.map((product) => product.slug).filter(Boolean));
  const skus = new Set(existing.map((product) => product.sku).filter(Boolean));
  return candidates.filter((product) => !slugs.has(product.slug) && !skus.has(product.sku));
}
