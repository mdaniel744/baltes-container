import { formatContainerTitle } from "../catalogPresentation.js";

export const DEFAULT_LOCALE = "de";

export const SUPPORTED_LOCALES = [
  { code: "de", short: "DE", name: "Deutsch" },
  { code: "cs", short: "CS", name: "Čeština" },
  { code: "nl", short: "NL", name: "Nederlands" },
];

export const LOCALE_TAGS = {
  de: "de-DE",
  cs: "cs-CZ",
  nl: "nl-NL",
};

const messages = {
  de: {
    meta: { title: "Baltes Container – Container kaufen seit 1983" },
    common: {
      hours: "Mo–Fr, 09:00–19:00 Uhr",
      nationwideDelivery: "Lieferung deutschlandweit",
      customerService: "Kundenservice",
      locations: "Standorte",
      search: "Suche",
      chooseLanguage: "Sprache wählen",
      cart: "Warenkorb",
      requestQuote: "Angebot anfordern",
      openMenu: "Menü öffnen",
      call: "Anrufen",
      contact: "Kontakt",
      yes: "Ja",
      no: "Nein",
      onRequest: "Auf Anfrage",
      price: "Preis",
      backToShop: "Zurück zum Shop",
      skipToContent: "Zum Inhalt springen",
      variousColors: "Je nach Bestand",
    },
    nav: {
      home: "Startseite",
      shop: "Container kaufen",
      bySize: "Nach Größe",
      solutions: "Lösungen & Umbauten",
      delivery: "Lieferung & Service",
      guide: "Ratgeber",
      about: "Über uns",
    },
    footer: {
      companyCopy: "Seit 1983 Ihr Experte für neue und gebrauchte Container. Transparent beraten, sorgfältig ausgewählt und deutschlandweit geliefert.",
      address: "Im Wiesengrund 43, 66787 Wadgassen, Deutschland",
      containers: "Container",
      allContainers: "Alle Container",
      newContainers: "Neue Container",
      usedContainers: "Gebrauchte Container",
      refrigeratedContainers: "Kühlcontainer",
      service: "Service",
      deliverySetup: "Lieferung & Aufstellung",
      conversions: "Containerumbauten",
      conditionClasses: "Zustandsklassen",
      legal: "Rechtliches",
      imprint: "Impressum",
      privacy: "Datenschutz",
      terms: "AGB",
      withdrawal: "Widerrufsbelehrung",
      returns: "Rückgabe & Erstattung",
      shipping: "Versand & Lieferung",
      payment: "Zahlungsarten",
      rights: "Alle Rechte vorbehalten.",
      vat: "USt-IdNr.",
    },
    shop: {
      eyebrow: "Container-Shop",
      title: "Container kaufen",
      intro: "Direkt verfügbare Container mit festem Preis, definierter Lieferzeit und klarem Zustand. Wählen Sie nach Größe, Typ und Zustand.",
      product: "Produkt",
      products: "Produkte",
      filter: "Filter",
      size: "Größe",
      condition: "Zustand",
      type: "Typ",
      resetFilters: "Filter zurücksetzen",
      noResults: "Keine Container entsprechen Ihren Filtern.",
    },
    product: {
      notFound: "Container nicht gefunden",
      view: "Ansicht {number}",
      unitsAvailable: "Auf Lager ({count} Stk.)",
      grossPrice: "Bruttopreis inkl. MwSt.",
      grossPriceTax: "Bruttopreis inkl. 19% MwSt.",
      details: "Zum Produkt",
      addToCart: "In den Warenkorb",
      buyNow: "Jetzt kaufen",
      requestAdvice: "Beratung anfragen",
      calculateShipping: "Lieferkosten berechnen",
      postcode: "PLZ",
      calculate: "Berechnen",
      estimatedShipping: "Geschätzte Lieferkosten:",
      estimatedDelivery: "Geschätzte Lieferzeit: 5–10 Werktage [VERIFY]",
      technicalData: "Technische Daten",
      conditionCertificates: "Zustand & Zertifikate",
      conditionSummary: "Zustand: {condition} ({grade}). CSC-Status: {csc}. Wind- und wasserdicht: {watertight}.",
      delivery: "Lieferung",
      deliveryCopy: "Lieferung deutschlandweit. Aufstellung mit Lkw-Kran (HIAB) möglich. Zugangsprüfung vorab erforderlich.",
      deliveryDetails: "Lieferdetails ansehen",
      description: "Produktbeschreibung",
      foot: "Fuß",
      generatedTitle: "{size}-Fuß-{type}",
      generatedShort: "{condition}er {size}-Fuß-{type}, verfügbar ab {depot}.",
      generatedDescription: "Dieser {condition}e {size}-Fuß-{type} ist eine zuverlässige Lösung für Lagerung, Transport oder individuelle Projekte. Verfügbarkeit und Lieferoptionen erhalten Sie auf Anfrage.",
    },
    cart: {
      title: "Warenkorb",
      close: "Warenkorb schließen",
      emptyTitle: "Ihr Warenkorb ist leer",
      emptyCopy: "Entdecken Sie unsere sofort verfügbaren Container und fügen Sie Ihre Auswahl hier hinzu.",
      continueShopping: "Weiter einkaufen",
      removeItem: "{product} entfernen",
      decreaseQuantity: "Menge verringern",
      increaseQuantity: "Menge erhöhen",
      subtotal: "Zwischensumme",
      netShort: "netto",
      destinationCountry: "Lieferland für die Schätzung",
      netGoods: "Warenwert netto",
      deliveryEstimate: "Lieferung (Schätzung, netto)",
      vat: "{rate}% MwSt. ({country})",
      estimatedTotal: "Voraussichtlicher Gesamtpreis",
      shippingNote: "Vorläufige Berechnung für {country}. An der Kasse wird die Lieferadresse für MwSt. und Lieferkosten verwendet.",
      checkout: "Zur Kasse",
    },
    checkout: {
      eyebrow: "Sicher bestellen",
      title: "Kasse",
      intro: "Geben Sie Ihre Rechnungs- und Lieferdaten ein, wählen Sie die Zahlungsart und prüfen Sie anschließend Ihre Bestellung.",
      progressLabel: "Fortschritt beim Bestellvorgang",
      step1: "Rechnung & Lieferung",
      step2: "Zahlung",
      step3: "Prüfen",
      billingTitle: "Rechnungsinformationen",
      deliveryTitle: "Lieferinformationen",
      customerType: "Kundentyp",
      privateCustomer: "Privatkunde",
      businessCustomer: "Geschäftskunde",
      name: "Vor- und Nachname",
      company: "Firma (optional)",
      email: "E-Mail-Adresse",
      phone: "Telefonnummer",
      vatNumber: "USt-IdNr. (optional)",
      address: "Straße und Hausnummer",
      postcode: "PLZ",
      city: "Ort",
      country: "Land",
      countryDE: "Deutschland",
      countryCZ: "Tschechien",
      countryNL: "Niederlande",
      sameAddress: "Lieferadresse entspricht der Rechnungsadresse",
      requiredError: "Bitte füllen Sie alle Pflichtfelder aus.",
      emailError: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      paymentError: "Bitte wählen Sie eine Zahlungsart aus.",
      termsError: "Bitte stimmen Sie den AGB und der Datenschutzerklärung zu.",
      toPayment: "Weiter zur Zahlung",
      paymentTitle: "Zahlungsart",
      paymentIntro: "Wählen Sie, wie Sie nach der Auftragsbestätigung bezahlen möchten.",
      bankTransfer: "Vorkasse / Banküberweisung",
      bankTransferCopy: "Sie erhalten nach der Prüfung Ihrer Lieferadresse die Auftragsbestätigung und Zahlungsdaten.",
      invoice: "Kauf auf Rechnung",
      invoiceCopy: "Für Geschäftskunden nach erfolgreicher Bonitätsprüfung. Zahlungsziel: 14 Tage nach Lieferung.",
      paymentSecurity: "Auf dieser Seite werden keine Bank- oder Kartendaten erfasst. Zahlungsdaten erhalten Sie erst mit der Auftragsbestätigung.",
      back: "Zurück",
      toReview: "Bestellung prüfen",
      reviewTitle: "Bestellung prüfen und absenden",
      note: "Hinweis zur Lieferung (optional)",
      notePlaceholder: "Zum Beispiel Zufahrt, Kranstellung oder bevorzugtes Lieferdatum",
      termsPrefix: "Ich akzeptiere die",
      terms: "AGB",
      and: "und die",
      privacy: "Datenschutzerklärung",
      termsSuffix: ".",
      placeOrder: "Zahlungspflichtig bestellen",
      submitting: "Bestellung wird übermittelt …",
      submitError: "Die Bestellung konnte nicht gespeichert werden. Ihr Warenkorb bleibt erhalten. Bitte versuchen Sie es erneut.",
      summary: "Bestellübersicht",
      quantity: "Menge",
      deliveryCost: "Lieferung & Aufstellung",
      afterCheck: "Nach Lieferprüfung",
      goodsTotal: "Warenwert",
      deliveryNotice: "MwSt. und Lieferkostenschätzung basieren auf der Lieferadresse in {country}. Zufahrt und Kranstellung werden vor der Lieferung bestätigt.",
      emptyTitle: "Ihr Warenkorb ist leer",
      emptyCopy: "Legen Sie zuerst einen verfügbaren Container in den Warenkorb, um zur Kasse zu gehen.",
      backToShop: "Zurück zum Shop",
      successEyebrow: "Bestellung eingegangen",
      successTitle: "Vielen Dank für Ihre Bestellung",
      successCopy: "Ihre Bestellung wurde gespeichert. Die Auftragsbestätigung mit den Liefer- und Zahlungsdetails senden wir an {email}.",
      orderNumber: "Bestellnummer",
      successPayment: "Bitte leisten Sie noch keine Zahlung, bevor Sie die Auftragsbestätigung mit den geprüften Lieferkosten erhalten haben.",
    },
    specs: {
      productType: "Produkttyp",
      size: "Größe",
      condition: "Zustand",
      conditionGrade: "Zustandsklasse",
      color: "Farbe",
      depot: "Depot",
      exteriorLength: "Länge außen",
      exteriorWidth: "Breite außen",
      exteriorHeight: "Höhe außen",
      interiorLength: "Länge innen",
      interiorWidth: "Breite innen",
      interiorHeight: "Höhe innen",
      doorWidth: "Türbreite",
      doorHeight: "Türhöhe",
      tareWeight: "Leergewicht",
      maxWeight: "Max. Gesamtgewicht",
      payload: "Nutzlast",
      volume: "Volumen",
      cscStatus: "CSC-Status",
      watertight: "Wind- und wasserdicht",
      cargoWorthy: "Cargo Worthy",
      floor: "Boden",
      lockbox: "Lockbox",
      ventilation: "Ventilation",
      forkliftPockets: "Gabelstapeltaschen",
    },
    catalog: {
      new: "Neu",
      oneTrip: "One-Trip",
      used: "Gebraucht",
      shippingContainer: "Seecontainer",
      storageContainer: "Lagercontainer",
      highCube: "High-Cube-Container",
      openSide: "Open-Side-Container",
      reefer: "Kühlcontainer",
      special: "Sondercontainer",
      office: "Bürocontainer",
      sanitary: "Sanitärcontainer",
      inStock: "Auf Lager",
      orderable: "Bestellbar",
      soldOut: "Ausverkauft",
      valid: "Gültig",
      expired: "Abgelaufen",
      notRequired: "Nicht erforderlich",
      white: "Weiß",
    },
  },
  nl: {
    meta: { title: "Baltes Container – containers sinds 1983" },
    common: { hours: "Ma–vr, 09:00–19:00", nationwideDelivery: "Levering in heel Duitsland", customerService: "Klantenservice", locations: "Locaties", search: "Zoeken", chooseLanguage: "Taal kiezen", cart: "Winkelwagen", requestQuote: "Offerte aanvragen", openMenu: "Menu openen", call: "Bellen", contact: "Contact", yes: "Ja", no: "Nee", onRequest: "Op aanvraag", price: "Prijs", backToShop: "Terug naar de shop", skipToContent: "Naar de inhoud", variousColors: "Afhankelijk van voorraad" },
    nav: { home: "Home", shop: "Containers kopen", bySize: "Op maat", solutions: "Oplossingen & ombouw", delivery: "Levering & service", guide: "Advies", about: "Over ons" },
    footer: { companyCopy: "Sinds 1983 uw specialist voor nieuwe en gebruikte containers. Transparant advies, zorgvuldig geselecteerd en geleverd in heel Duitsland.", address: "Im Wiesengrund 43, 66787 Wadgassen, Duitsland", containers: "Containers", allContainers: "Alle containers", newContainers: "Nieuwe containers", usedContainers: "Gebruikte containers", refrigeratedContainers: "Koelcontainers", service: "Service", deliverySetup: "Levering & plaatsing", conversions: "Containerombouw", conditionClasses: "Conditieklassen", legal: "Juridisch", imprint: "Colofon", privacy: "Privacy", terms: "Voorwaarden", withdrawal: "Herroepingsrecht", returns: "Retouren & terugbetaling", shipping: "Verzending & levering", payment: "Betaalmethoden", rights: "Alle rechten voorbehouden.", vat: "Btw-id" },
    shop: { eyebrow: "Containershop", title: "Containers kopen", intro: "Direct beschikbare containers met vaste prijzen, duidelijke levertijden en transparante conditie. Filter op maat, type en conditie.", product: "product", products: "producten", filter: "Filters", size: "Maat", condition: "Conditie", type: "Type", resetFilters: "Filters wissen", noResults: "Geen containers komen overeen met uw filters." },
    product: { notFound: "Container niet gevonden", view: "Weergave {number}", unitsAvailable: "Op voorraad ({count})", grossPrice: "Brutoprijs incl. btw", grossPriceTax: "Brutoprijs incl. 19% btw", details: "Bekijk product", addToCart: "In winkelwagen", buyNow: "Nu kopen", requestAdvice: "Advies aanvragen", calculateShipping: "Levering berekenen", postcode: "Postcode", calculate: "Berekenen", estimatedShipping: "Geschatte leveringskosten:", estimatedDelivery: "Geschatte levertijd: 5–10 werkdagen [VERIFY]", technicalData: "Technische gegevens", conditionCertificates: "Conditie & certificaten", conditionSummary: "Conditie: {condition} ({grade}). CSC-status: {csc}. Wind- en waterdicht: {watertight}.", delivery: "Levering", deliveryCopy: "Levering in heel Duitsland. Plaatsing met vrachtwagenkraan (HIAB) is mogelijk. Toegang wordt vooraf gecontroleerd.", deliveryDetails: "Leveringsdetails bekijken", description: "Productbeschrijving", foot: "ft", generatedTitle: "{size} ft {type}", generatedShort: "Een {condition} {type} van {size} ft, beschikbaar vanaf {depot}.", generatedDescription: "Deze {condition} {type} van {size} ft is een betrouwbare oplossing voor opslag, transport of individuele projecten. Beschikbaarheid en levering op aanvraag." },
    cart: { title: "Winkelwagen", close: "Winkelwagen sluiten", emptyTitle: "Uw winkelwagen is leeg", emptyCopy: "Bekijk onze direct beschikbare containers en voeg uw selectie hier toe.", continueShopping: "Verder winkelen", removeItem: "{product} verwijderen", decreaseQuantity: "Aantal verlagen", increaseQuantity: "Aantal verhogen", subtotal: "Subtotaal", netShort: "netto", destinationCountry: "Land van levering voor schatting", netGoods: "Goederen netto", deliveryEstimate: "Levering (schatting, netto)", vat: "{rate}% btw ({country})", estimatedTotal: "Geschat totaal", shippingNote: "Voorlopige berekening voor {country}. Bij het afrekenen bepaalt het afleveradres de btw en leveringskosten.", checkout: "Naar afrekenen" },
    checkout: {
      eyebrow: "Veilig bestellen", title: "Afrekenen", intro: "Vul uw factuur- en aflevergegevens in, kies een betaalmethode en controleer daarna uw bestelling.", progressLabel: "Voortgang van het afrekenen", step1: "Factuur & levering", step2: "Betaling", step3: "Controleren", billingTitle: "Factuurgegevens", deliveryTitle: "Aflevergegevens", customerType: "Klanttype", privateCustomer: "Particuliere klant", businessCustomer: "Zakelijke klant", name: "Voor- en achternaam", company: "Bedrijf (optioneel)", email: "E-mailadres", phone: "Telefoonnummer", vatNumber: "Btw-nummer (optioneel)", address: "Straat en huisnummer", postcode: "Postcode", city: "Plaats", country: "Land", countryDE: "Duitsland", countryCZ: "Tsjechië", countryNL: "Nederland", sameAddress: "Het afleveradres is gelijk aan het factuuradres", requiredError: "Vul alle verplichte velden in.", emailError: "Vul een geldig e-mailadres in.", paymentError: "Kies een betaalmethode.", termsError: "Ga akkoord met de algemene voorwaarden en het privacybeleid.", toPayment: "Verder naar betaling", paymentTitle: "Betaalmethode", paymentIntro: "Kies hoe u na de orderbevestiging wilt betalen.", bankTransfer: "Vooruitbetaling / bankoverschrijving", bankTransferCopy: "Na controle van het afleveradres ontvangt u de orderbevestiging en betaalgegevens.", invoice: "Betalen op factuur", invoiceCopy: "Voor zakelijke klanten na een geslaagde kredietcontrole. Betaling binnen 14 dagen na levering.", paymentSecurity: "Op deze pagina worden geen bank- of kaartgegevens verzameld. U ontvangt betaalgegevens pas bij de orderbevestiging.", back: "Terug", toReview: "Bestelling controleren", reviewTitle: "Bestelling controleren en verzenden", note: "Opmerking voor levering (optioneel)", notePlaceholder: "Bijvoorbeeld toegang, kraanplaatsing of gewenste leverdatum", termsPrefix: "Ik ga akkoord met de", terms: "algemene voorwaarden", and: "en het", privacy: "privacybeleid", termsSuffix: ".", placeOrder: "Bestelling met betalingsverplichting plaatsen", submitting: "Bestelling wordt verzonden …", submitError: "De bestelling kon niet worden opgeslagen. Uw winkelwagen blijft bewaard. Probeer het opnieuw.", summary: "Besteloverzicht", quantity: "Aantal", deliveryCost: "Levering & plaatsing", afterCheck: "Na leveringscontrole", goodsTotal: "Waarde goederen", deliveryNotice: "De btw en leveringsschatting zijn gebaseerd op het afleveradres in {country}. Toegang en kraanplaatsing worden voor levering bevestigd.", emptyTitle: "Uw winkelwagen is leeg", emptyCopy: "Plaats eerst een beschikbare container in uw winkelwagen om af te rekenen.", backToShop: "Terug naar de shop", successEyebrow: "Bestelling ontvangen", successTitle: "Bedankt voor uw bestelling", successCopy: "Uw bestelling is opgeslagen. We sturen de orderbevestiging met leverings- en betaalgegevens naar {email}.", orderNumber: "Bestelnummer", successPayment: "Betaal nog niet voordat u de orderbevestiging met de gecontroleerde leveringskosten hebt ontvangen."
    },
    specs: { productType: "Producttype", size: "Maat", condition: "Conditie", conditionGrade: "Conditieklasse", color: "Kleur", depot: "Depot", exteriorLength: "Buitenlengte", exteriorWidth: "Buitenbreedte", exteriorHeight: "Buitenhoogte", interiorLength: "Binnenlengte", interiorWidth: "Binnenbreedte", interiorHeight: "Binnenhoogte", doorWidth: "Deurbreedte", doorHeight: "Deurhoogte", tareWeight: "Leeggewicht", maxWeight: "Max. totaalgewicht", payload: "Laadvermogen", volume: "Volume", cscStatus: "CSC-status", watertight: "Wind- en waterdicht", cargoWorthy: "Cargo worthy", floor: "Vloer", lockbox: "Lockbox", ventilation: "Ventilatie", forkliftPockets: "Heftruckkokers" },
    catalog: { new: "Nieuw", oneTrip: "One-trip", used: "Gebruikt", shippingContainer: "Zeecontainer", storageContainer: "Opslagcontainer", highCube: "High-cubecontainer", openSide: "Open-sidecontainer", reefer: "Koelcontainer", special: "Speciale container", office: "Kantoorcontainer", sanitary: "Sanitaircontainer", inStock: "Op voorraad", orderable: "Bestelbaar", soldOut: "Uitverkocht", valid: "Geldig", expired: "Verlopen", notRequired: "Niet vereist", white: "Wit" },
  },
  cs: {
    meta: { title: "Baltes Container – kontejnery od roku 1983" },
    common: { hours: "Po–pá, 09:00–19:00", nationwideDelivery: "Doručení po celém Německu", customerService: "Zákaznický servis", locations: "Pobočky", search: "Hledat", chooseLanguage: "Zvolit jazyk", cart: "Košík", requestQuote: "Vyžádat nabídku", openMenu: "Otevřít menu", call: "Zavolat", contact: "Kontakt", yes: "Ano", no: "Ne", onRequest: "Na vyžádání", price: "Cena", backToShop: "Zpět do obchodu", skipToContent: "Přejít na obsah", variousColors: "Dle dostupnosti" },
    nav: { home: "Domů", shop: "Koupit kontejner", bySize: "Podle velikosti", solutions: "Řešení a úpravy", delivery: "Doprava a servis", guide: "Poradna", about: "O nás" },
    footer: { companyCopy: "Od roku 1983 specialista na nové a použité kontejnery. Transparentní poradenství, pečlivý výběr a doručení po celém Německu.", address: "Im Wiesengrund 43, 66787 Wadgassen, Německo", containers: "Kontejnery", allContainers: "Všechny kontejnery", newContainers: "Nové kontejnery", usedContainers: "Použité kontejnery", refrigeratedContainers: "Chladicí kontejnery", service: "Servis", deliverySetup: "Doprava a umístění", conversions: "Úpravy kontejnerů", conditionClasses: "Třídy stavu", legal: "Právní informace", imprint: "Tiráž", privacy: "Ochrana soukromí", terms: "Obchodní podmínky", withdrawal: "Odstoupení od smlouvy", returns: "Vrácení a refundace", shipping: "Přeprava a doručení", payment: "Platební metody", rights: "Všechna práva vyhrazena.", vat: "DIČ" },
    shop: { eyebrow: "Obchod s kontejnery", title: "Koupit kontejner", intro: "Dostupné kontejnery s pevnou cenou, stanovenou dobou dodání a jasným stavem. Filtrujte podle velikosti, typu a stavu.", product: "produkt", products: "produktů", filter: "Filtry", size: "Velikost", condition: "Stav", type: "Typ", resetFilters: "Zrušit filtry", noResults: "Žádný kontejner neodpovídá filtrům." },
    product: { notFound: "Kontejner nebyl nalezen", view: "Pohled {number}", unitsAvailable: "Skladem ({count} ks)", grossPrice: "Cena včetně DPH", grossPriceTax: "Cena včetně 19% DPH", details: "Zobrazit produkt", addToCart: "Přidat do košíku", buyNow: "Koupit nyní", requestAdvice: "Vyžádat konzultaci", calculateShipping: "Vypočítat dopravu", postcode: "PSČ", calculate: "Vypočítat", estimatedShipping: "Odhadovaná cena dopravy:", estimatedDelivery: "Odhadované dodání: 5–10 pracovních dnů [VERIFY]", technicalData: "Technické údaje", conditionCertificates: "Stav a certifikáty", conditionSummary: "Stav: {condition} ({grade}). Stav CSC: {csc}. Větru a vodě odolný: {watertight}.", delivery: "Doručení", deliveryCopy: "Doručení po celém Německu. Umístění nákladním jeřábem HIAB je možné. Přístup je nutné ověřit předem.", deliveryDetails: "Podrobnosti o doručení", description: "Popis produktu", foot: "stop", generatedTitle: "{type} {size} stop", generatedShort: "{condition} {type} o délce {size} stop, dostupný v depu {depot}.", generatedDescription: "Tento {condition} {type} o délce {size} stop je spolehlivým řešením pro skladování, dopravu nebo individuální projekty. Dostupnost a doprava na vyžádání." },
    cart: { title: "Košík", close: "Zavřít košík", emptyTitle: "Váš košík je prázdný", emptyCopy: "Prohlédněte si kontejnery dostupné ihned a přidejte sem svůj výběr.", continueShopping: "Pokračovat v nákupu", removeItem: "Odebrat {product}", decreaseQuantity: "Snížit množství", increaseQuantity: "Zvýšit množství", subtotal: "Mezisoučet", netShort: "bez DPH", destinationCountry: "Země doručení pro odhad", netGoods: "Zboží bez DPH", deliveryEstimate: "Doprava (odhad bez DPH)", vat: "DPH {rate}% ({country})", estimatedTotal: "Odhadovaná celková cena", shippingNote: "Předběžný výpočet pro {country}. U pokladny určí dodací adresa DPH a cenu dopravy.", checkout: "K pokladně" },
    checkout: {
      eyebrow: "Bezpečná objednávka", title: "Pokladna", intro: "Vyplňte fakturační a dodací údaje, vyberte způsob platby a poté objednávku zkontrolujte.", progressLabel: "Průběh objednávky", step1: "Fakturace a dodání", step2: "Platba", step3: "Kontrola", billingTitle: "Fakturační údaje", deliveryTitle: "Dodací údaje", customerType: "Typ zákazníka", privateCustomer: "Soukromá osoba", businessCustomer: "Firemní zákazník", name: "Jméno a příjmení", company: "Společnost (volitelné)", email: "E-mailová adresa", phone: "Telefonní číslo", vatNumber: "DIČ (volitelné)", address: "Ulice a číslo domu", postcode: "PSČ", city: "Město", country: "Země", countryDE: "Německo", countryCZ: "Česko", countryNL: "Nizozemsko", sameAddress: "Dodací adresa je stejná jako fakturační", requiredError: "Vyplňte všechna povinná pole.", emailError: "Zadejte platnou e-mailovou adresu.", paymentError: "Vyberte způsob platby.", termsError: "Souhlaste s obchodními podmínkami a zásadami ochrany soukromí.", toPayment: "Pokračovat k platbě", paymentTitle: "Způsob platby", paymentIntro: "Vyberte, jak chcete zaplatit po potvrzení objednávky.", bankTransfer: "Platba předem / bankovní převod", bankTransferCopy: "Po ověření dodací adresy obdržíte potvrzení objednávky a platební údaje.", invoice: "Platba na fakturu", invoiceCopy: "Pro firemní zákazníky po úspěšné kontrole bonity. Splatnost 14 dní po dodání.", paymentSecurity: "Na této stránce neshromažďujeme bankovní údaje ani údaje o kartě. Platební údaje obdržíte až s potvrzením objednávky.", back: "Zpět", toReview: "Zkontrolovat objednávku", reviewTitle: "Zkontrolovat a odeslat objednávku", note: "Poznámka k dodání (volitelné)", notePlaceholder: "Například přístup, umístění jeřábu nebo preferované datum dodání", termsPrefix: "Souhlasím s", terms: "obchodními podmínkami", and: "a", privacy: "zásadami ochrany osobních údajů", termsSuffix: ".", placeOrder: "Odeslat závaznou objednávku", submitting: "Objednávka se odesílá …", submitError: "Objednávku se nepodařilo uložit. Obsah košíku zůstává zachován. Zkuste to znovu.", summary: "Souhrn objednávky", quantity: "Množství", deliveryCost: "Doprava a umístění", afterCheck: "Po kontrole dodání", goodsTotal: "Hodnota zboží", deliveryNotice: "DPH a odhad dopravy vycházejí z dodací adresy v zemi {country}. Přístup a umístění jeřábu budou potvrzeny před dodáním.", emptyTitle: "Váš košík je prázdný", emptyCopy: "Nejprve přidejte dostupný kontejner do košíku a poté přejděte k pokladně.", backToShop: "Zpět do obchodu", successEyebrow: "Objednávka přijata", successTitle: "Děkujeme za objednávku", successCopy: "Vaše objednávka byla uložena. Potvrzení s údaji o dodání a platbě zašleme na {email}.", orderNumber: "Číslo objednávky", successPayment: "Neplaťte, dokud neobdržíte potvrzení objednávky s ověřenými náklady na dopravu."
    },
    specs: { productType: "Typ produktu", size: "Velikost", condition: "Stav", conditionGrade: "Třída stavu", color: "Barva", depot: "Depo", exteriorLength: "Vnější délka", exteriorWidth: "Vnější šířka", exteriorHeight: "Vnější výška", interiorLength: "Vnitřní délka", interiorWidth: "Vnitřní šířka", interiorHeight: "Vnitřní výška", doorWidth: "Šířka dveří", doorHeight: "Výška dveří", tareWeight: "Hmotnost prázdného", maxWeight: "Max. celková hmotnost", payload: "Užitečné zatížení", volume: "Objem", cscStatus: "Stav CSC", watertight: "Odolný proti větru a vodě", cargoWorthy: "Cargo worthy", floor: "Podlaha", lockbox: "Lockbox", ventilation: "Větrání", forkliftPockets: "Kapsy pro vysokozdvižný vozík" },
    catalog: { new: "Nový", oneTrip: "One-trip", used: "Použitý", shippingContainer: "Námořní kontejner", storageContainer: "Skladový kontejner", highCube: "High-cube kontejner", openSide: "Open-side kontejner", reefer: "Chladicí kontejner", special: "Speciální kontejner", office: "Kancelářský kontejner", sanitary: "Sanitární kontejner", inStock: "Skladem", orderable: "Na objednávku", soldOut: "Vyprodáno", valid: "Platný", expired: "Platnost skončila", notRequired: "Není vyžadováno", white: "Bílá" },
  },
};

const catalogKeys = {
  Neu: "new",
  "One-Trip": "oneTrip",
  Gebraucht: "used",
  Seecontainer: "shippingContainer",
  Lagercontainer: "storageContainer",
  "High-Cube-Container": "highCube",
  "Open-Side-Container": "openSide",
  Kühlcontainer: "reefer",
  Sondercontainer: "special",
  Bürocontainer: "office",
  Sanitärcontainer: "sanitary",
  "Auf Lager": "inStock",
  Bestellbar: "orderable",
  Ausverkauft: "soldOut",
  Gültig: "valid",
  Abgelaufen: "expired",
  "Nicht erforderlich": "notRequired",
  Weiß: "white",
};

const readMessage = (locale, key) =>
  key.split(".").reduce((value, part) => value?.[part], messages[locale]);

export function translate(locale, key, variables = {}) {
  const localizedTemplate = readMessage(locale, key);
  const germanTemplate = readMessage(DEFAULT_LOCALE, key);

  if (
    localizedTemplate === undefined &&
    locale !== DEFAULT_LOCALE &&
    process.env.NODE_ENV !== "production"
  ) {
    console.warn(
      `[i18n] Missing "${key}" for "${locale}"; using German fallback.`,
    );
  }

  if (germanTemplate === undefined && process.env.NODE_ENV !== "production") {
    console.warn(`[i18n] Missing German fallback for "${key}".`);
  }

  const template = localizedTemplate ?? germanTemplate ?? "";

  return String(template).replace(/\{(\w+)\}/g, (_, name) =>
    variables[name] === undefined ? `{${name}}` : String(variables[name]),
  );
}

export function translateCatalogValue(locale, value) {
  if (!value) return "—";
  if (value === "Sonstige") {
    return { de: "Sondermaß", cs: "Speciální rozměr", nl: "Afwijkende maat" }[locale] ?? "Sondermaß";
  }
  const key = catalogKeys[value];
  const label = key ? translate(locale, `catalog.${key}`) : value;
  return ["highCube", "openSide", "oneTrip"].includes(key) ? formatContainerTitle(label) : label;
}

export function formatCurrency(locale, value, currency = "EUR", options = {}) {
  return new Intl.NumberFormat(LOCALE_TAGS[locale] ?? LOCALE_TAGS.de, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    ...options,
  }).format(value);
}

export function getLocalizedProduct(product, locale) {
  if (!product || locale === DEFAULT_LOCALE) {
    return {
      title: formatContainerTitle(product?.title),
      shortDescription: product?.short_description ?? "",
      description: product?.description ?? "",
      floorType: product?.floor_type ?? "—",
    };
  }

  const nested = product.translations?.[locale] ?? {};
  const type = translateCatalogValue(locale, product.product_type);
  const condition = translateCatalogValue(locale, product.condition);
  const variables = {
    size: product.size_ft,
    type,
    condition,
    depot: product.depot ?? "—",
  };

  return {
    floorType: nested.floor_type ?? product.floor_type ?? "—",
    title: formatContainerTitle(
      nested.title ??
      product[`title_${locale}`] ??
      translate(locale, "product.generatedTitle", variables)),
    shortDescription:
      nested.short_description ??
      product[`short_description_${locale}`] ??
      translate(locale, "product.generatedShort", variables),
    description:
      nested.description ??
      product[`description_${locale}`] ??
      translate(locale, "product.generatedDescription", variables),
  };
}

export function formatProductColor(locale, color) {
  if (!color) return "—";

  try {
    const catalog = JSON.parse(color);
    if (Array.isArray(catalog.colors) && catalog.colors.length > 0) {
      return catalog.colors.join(", ");
    }
    return translate(locale, "common.variousColors");
  } catch {
    return translateCatalogValue(locale, color);
  }
}
