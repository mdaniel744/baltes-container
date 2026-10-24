import { LEGAL_COMPANY as company } from "../../legalCompany.js";

const contact = `${company.name}\n${company.address}, Německo\nE-mail: ${company.email}\nTelefon: ${company.phone}`;
const freight = "Baltes Container GmbH hradí nezbytnou zpětnou přepravu při oprávněném zákonném odstoupení, dobrovolném vrácení splňujícím tyto podmínky i oprávněné reklamaci. Organizaci přepravy s námi předem koordinujte, aby bylo zajištěno vhodné vozidlo a bezpečné místo převzetí. Tato koordinace není podmínkou schválení zákonného odstoupení.";

const legalContent = {
  common: {
    navigation: "Právní informace", contents: "Na této stránce", contactTitle: "Dotazy k objednávce nebo podmínkám?",
    contactCopy: "Kontaktujte nás přímo. U existující objednávky pomůže její číslo.", country: "Německo", email: "Napsat e-mail", phone: "Zavolat",
    draft: "Pracovní návrh ke kontrole – dosud neschválený ke zveřejnění.", review: "Před zveřejněním je třeba doplnit",
    labels: { terms: "Obchodní podmínky", withdrawal: "Odstoupení", returns: "Vrácení a refundace", shipping: "Přeprava a dodání", payments: "Platební podmínky", privacy: "Ochrana údajů", cookies: "Cookies", imprint: "Právní údaje" },
  },
  terms: {
    title: "Všeobecné obchodní podmínky",
    intro: "Podmínky nákupu nových a použitých kontejnerů od Baltes Container GmbH pro spotřebitele i firmy.",
    reviewItems: ["Doplnit rejstříkové údaje a potvrdit platební a dodací podmínky. Závazná celková cena a smluvní dokumenty musí být dostupné před uzavřením smlouvy."],
    sections: [
      { id: "seller", title: "1. Prodávající a působnost", paragraphs: [contact, "Podmínky platí pro nákup kontejnerů a sjednanou dopravu či úpravy. Individuální ujednání mají přednost. Kogentní práva spotřebitelů nejsou dotčena."] },
      { id: "order", title: "2. Objednávka, nebo poptávka", paragraphs: ["Poptávka nabídky je nezávazná a nezakládá platební povinnost. V obchodě vyberete kontejner, zadáte fakturační a dodací údaje a zkontrolujete objednávku. Před odesláním lze údaje opravit. Tlačítkem závazné objednávky předkládáte nabídku k uzavření kupní smlouvy.", "Potvrzení přijetí zprávy ještě není přijetím nabídky. Smlouva vzniká naším výslovným potvrzením objednávky. Změna ceny či rozsahu oproti vaší objednávce vyžaduje váš souhlas; dodatečné náklady nejsou závazné jednostranně. Uchovejte si objednávkové a smluvní dokumenty. Obchod je dostupný německy, česky a nizozemsky."] },
      { id: "prices", title: "3. Ceny a DPH", paragraphs: ["Ceny jsou v eurech; částky bez DPH a s DPH jsou označeny. Německá katalogová cena zahrnuje 19 % DPH. Košík a pokladna přepočítávají základ bez daně podle země dodání: Německo 19 %, Česko 21 %, Nizozemsko 21 %. Doprava a daň jsou uvedeny samostatně.", "Rozhoduje dodací adresa, nikoli jazyk. Samotné zadání DIČ nezakládá osvobození od daně. Zvláštní daňové případy se ověřují před přijetím objednávky. Označený odhad dopravy nenahrazuje sjednanou cenu přepravy."] },
      { id: "payment", title: "4. Platba a vlastnictví", paragraphs: ["Nabízíme bankovní převod předem a nákup na fakturu pro výslovně schválené firemní zákazníky. Pokladna neprovádí platbu kartou ani PayPal. Bankovní údaje a pokyny obdržíte se smluvními dokumenty. Do úplného zaplacení zůstává zboží naším majetkem."] },
      { id: "delivery", title: "5. Dodání a stav kontejneru", paragraphs: ["Oblast dodání, příjezd, vykládka, umístění, cena a termín se sjednávají pro konkrétní objednávku. Rozhodují sjednané údaje o velikosti, stavu, barvě, výbavě a certifikaci vybraného kontejneru. Ilustrační fotografie nenahrazuje popis stavu.", "Označení „použitý“ samo nevylučuje práva z vad. Odchylky musí být oznámeny a sjednány v zákonem požadovaném rozsahu. Při spotřebitelském nákupu neseme přepravní riziko zásadně do předání; zákonné výjimky zůstávají zachovány."] },
      { id: "rights", title: "6. Odstoupení, vrácení a vady", paragraphs: ["Spotřebitel má při nákupu na dálku zpravidla 14 dní na odstoupení, i u standardního použitého kontejneru. Navíc poskytujeme dobrovolné 30denní vrácení popsané v zásadách vrácení. Nezbytnou zpětnou přepravu oprávněného vrácení hradí Baltes.", "Platí zákonná práva z vad a odpovědnost. Reklamace není omezena lhůtou pro odstoupení ani dobrovolné vrácení. Dodatečná záruka platí pouze při výslovném poskytnutí s vlastním rozsahem a podmínkami."] },
      { id: "law", title: "7. Rozhodné právo", paragraphs: ["Použije se německé právo. Spotřebitel si zachovává ochranu kogentních předpisů země svého obvyklého bydliště, pokud se použijí. Zákonná příslušnost soudů pro spotřebitele není omezena. Zpracování údajů popisují zásady ochrany osobních údajů."] },
    ],
  },
  withdrawal: {
    title: "Poučení o odstoupení od smlouvy",
    intro: "Zákonné odstoupení spotřebitele platí nezávisle na reklamaci a dodatečném 30denním vrácení. Nezbytnou zpětnou přepravu hradí Baltes.",
    sections: [
      { id: "period", title: "1. Čtrnáct dní bez udání důvodu", paragraphs: ["Od smlouvy uzavřené na dálku na standardní nový či použitý kontejner můžete odstoupit do 14 dní bez uvedení důvodu. Lhůta začíná převzetím vámi nebo určenou třetí osobou odlišnou od dopravce. U více položek jedné objednávky doručovaných odděleně rozhoduje převzetí poslední položky. Lhůta nezačne před poskytnutím požadovaného poučení."] },
      { id: "notice", title: "2. Jak odstoupit", paragraphs: [`Sdělte nám své jednoznačné rozhodnutí například e-mailem či dopisem na:\n${contact}`, "Včasné odeslání oznámení zachová lhůtu. Důvod, konkrétní formulář ani předchozí schválení vrácení nejsou nutné. Jméno a číslo objednávky pomohou s identifikací."] },
      { id: "refund", title: "3. Vrácení plateb", paragraphs: ["Přijaté platby včetně ceny nejlevnější nabízené standardní dopravy vrátíme bez zbytečného odkladu, nejpozději do 14 dní od přijetí odstoupení. Příplatek za vámi zvolenou dražší dopravu je vyňat. Použijeme stejný platební prostředek, pokud výslovně nesjednáme jiný bezplatný způsob.", "Platbu můžeme zadržet do převzetí zboží zpět nebo doložení jeho odeslání, podle toho, co nastane dříve. To neplatí, pokud jsme nabídli vyzvednutí zboží."] },
      { id: "transport", title: "4. Zpětná přeprava na naše náklady", paragraphs: [freight, "Nenabídneme-li vyzvednutí, odešlete nebo předejte zboží bez zbytečného odkladu, nejpozději do 14 dní od oznámení odstoupení. Včasné odeslání stačí. Při nabídnutém vyzvednutí vlastní odeslání není nutné. Kontejner vyžaduje těžkou přepravu a vhodné zdvihací zařízení. Domluvte s námi přístup a místo převzetí; kontaktní adresa není automaticky vratným depem."] },
      { id: "value", title: "5. Prohlídka a snížení hodnoty", paragraphs: ["Za skutečné snížení hodnoty odpovídáte pouze při nakládání nad rámec nutné kontroly povahy, vlastností a funkčnosti a po řádném poučení. Za zákonné odstoupení se neúčtuje paušální poplatek za opětovné naskladnění."] },
      { id: "exceptions", title: "6. Zakázková výroba a firemní nákup", paragraphs: ["Zákonná výjimka se může týkat neprefabrikovaného zboží vyrobeného podle individuální volby zákazníka nebo jednoznačně přizpůsobeného osobním potřebám. Výběr velikosti či stavu dostupného standardního kontejneru sám o sobě není zakázkovou výrobou. Podnikatel při firemním nákupu zpravidla nemá zákonné spotřebitelské právo odstoupit; práva z vad tím nejsou dotčena."] },
      { id: "form", title: "7. Vzorový formulář", paragraphs: [`Použití je dobrovolné.\nAdresát: ${company.name}, ${company.address}, Německo, ${company.email}\nOznamuji/oznamujeme (*), že tímto odstupuji/odstupujeme (*) od smlouvy o nákupu tohoto zboží (*) / poskytnutí této služby (*):\n________________________________\nObjednáno dne (*) / přijato dne (*): ________________________________\nJméno spotřebitele/spotřebitelů: ________________________________\nAdresa spotřebitele/spotřebitelů: ________________________________\nPodpis (pouze na papíře): ________________________________\nDatum: ________________________________\n(*) Nehodící se škrtněte.`] },
    ],
  },
  returns: {
    title: "Vrácení zboží a refundace",
    intro: "Dobrovolné vrácení standardních kontejnerů do 30 dní. Zákonná spotřebitelská práva a práva z vad zůstávají zachována. Oprávněnou zpětnou přepravu hradí Baltes.",
    sections: [
      { id: "withdrawal", title: "1. Zákonné odstoupení", paragraphs: ["Spotřebitel může od standardního nákupu na dálku zpravidla odstoupit do 14 dní od převzetí, včetně použitého standardního kontejneru. Úplné poučení a formulář jsou na stránce Odstoupení. Tato lhůta neomezuje práva z vad."] },
      { id: "voluntary", title: "2. Navíc: dobrovolné vrácení do 30 dní", paragraphs: ["Standardní kontejner ve stavu při dodání lze dobrovolně vrátit s dokladem o nákupu do 30 dní po nákupu. Nabídka platí pro nové i použité standardní kontejnery, nikoli pro individuální zakázky. Je doplňkem zákonného odstoupení a platí i pro firemní zákazníky. Vrácení nám oznamte ve lhůtě; dopravu a převzetí dohodneme.", "Podmínky této dobrovolné služby neomezují zákonné odstoupení. Stav při dodání ani předložení konkrétního dokladu nejsou dalšími podmínkami zákonných spotřebitelských práv."] },
      { id: "process", title: "3. Postup vrácení", paragraphs: [`Kontaktujte ${company.email} nebo ${company.phone}. Pokud možno uveďte číslo objednávky, kontejner a jeho umístění. U vady popište problém; fotografie pomohou, nejsou však obecnou podmínkou zákonného nároku. Důvod zákonného odstoupení je dobrovolný.`, "Dohodneme místo převzetí a bezpečnou přepravu. Nezasílejte kontejner bez ohlášení na kontaktní adresu. Logistická domluva nenahrazuje včasné oznámení odstoupení."] },
      { id: "costs", title: "4. Zpětnou přepravu hradí Baltes", paragraphs: [freight, "Ani při způsobilém dobrovolném vrácení zákazník nehradí nezbytnou zpětnou přepravu. Před vlastním objednáním dopravy sjednejte způsob a cenu; zákonná práva tím nejsou dotčena."] },
      { id: "defects", title: "5. Vady, nesprávné dodání a škody", paragraphs: ["Při vadách platí zákonná práva na nápravu a při splnění zákonných podmínek slevu, odstoupení či náhradu škody. Nezbytné náklady nápravy na dopravu, práci a materiál hradíme my.", "Viditelné poškození pokud možno zdokumentujte při převzetí a oznamte včas. Chybějící protokol řidiče ani pozdější oznámení neznamenají automatickou ztrátu spotřebitelských práv. Reklamace nejsou paušálně vyloučeny po 30 dnech."] },
      { id: "repayment", title: "6. Refundace a výměna", paragraphs: ["Při zákonném odstoupení platí 14denní lhůta refundace, vrácení standardního původního dopravného a pravidla zadržení platby z poučení. Vrací se skutečně zaplacená částka včetně odpovídající daně, nikoli pouze cena bez DPH.", "U výhradně dobrovolného vrácení po kontrole vrátíme zaplacenou cenu zboží původní platební cestou. Původní doprava není v této doplňkové službě zahrnuta. Toto omezení neplatí pro zákonné nároky. U reklamace se náprava řídí příslušným zákonným nárokem."] },
    ],
  },
  shipping: {
    title: "Přeprava a dodání",
    intro: "Dopravu, vykládku a umístění plánujeme podle konkrétního kontejneru a místa.",
    reviewItems: ["Dodací částky jsou odhady, nikoli potvrzený ceník. Potvrdit lhůty podle země, zahrnuté služby a závaznou celkovou cenu před dokončením objednávky."],
    sections: [
      { id: "area", title: "1. Oblast dodání", paragraphs: ["Obchod podporuje adresy v Německu, Česku a Nizozemsku. Přístupnost konkrétního místa se ověřuje. Jiné cíle a zvláštní přeprava vyžadují individuální nabídku."] },
      { id: "costs", title: "2. Dopravné a odhady", paragraphs: ["Košík a pokladna zobrazují odhad podle země, PSČ a množství včetně samostatné DPH. Přístup, vzdálenost a zdvihací zařízení mohou cenu ovlivnit. Odhad nenahrazuje ověřenou nabídku přepravy.", "Doprava, vykládka a další služby musí být sjednány včetně ceny. Odchylka od objednávky vyžaduje váš souhlas. Tyto zásady nezakládají neznámé jeřábové či jiné příplatky."] },
      { id: "timing", title: "3. Termín a uvolnění expedice", paragraphs: ["Rozhoduje sjednaná dodací lhůta podle zásob, úprav a plánování. Jednotná dodací lhůta pro všechny kontejnery není zaručena. Při platbě předem uvolníme expedici po přijetí platby, při schváleném nákupu na fakturu podle dohody. Den příjezdu s vámi koordinujeme."] },
      { id: "site", title: "4. Příjezd a místo umístění", paragraphs: ["Sdělte šířku brány, průjezdnou výšku, hmotnostní omezení, povrch, sklon a překážky. Místo musí být připravené, únosné a rovné. Dosah jeřábu a pracovní plocha se posuzují konkrétně; obecné rozměry na webu nejsou bezpečnostním schválením.", "Základy, povolení, uzavírky a další jeřáby jsou zahrnuty jen při výslovné dohodě. Za nebezpečných podmínek nelze vykládat. Náklady opakované jízdy či čekání závisejí na příčině, dohodě a právu, nikoli na automatickém paušálu."] },
      { id: "handover", title: "5. Předání", paragraphs: ["Pokud možno zkontrolujte kontejner s řidičem. Fotografie a protokol usnadní řešení škody. Spotřebitel neztrácí zákonná práva jen proto, že škodu zjistí později nebo nemá protokol. Škody a nesprávné dodání oznamte přímo nám."] },
    ],
  },
  payments: {
    title: "Platební metody a podmínky",
    intro: "Objednáte v obchodě, zaplatíte následně podle potvrzených objednávkových a fakturačních údajů.",
    reviewItems: ["Potvrdit dosavadní lhůty (7 pracovních dní pro platbu předem, 14 dní pro fakturu) a zálohu 50 % u zakázek."],
    sections: [
      { id: "checkout", title: "1. Bez stržení platby v pokladně", paragraphs: ["Pokladna ukládá objednávku a způsob platby. Nevyžaduje údaje karty ani bankovního přístupu a neprovádí online platbu. Poptávka naopak ještě není objednávkou. Plaťte až po výslovném potvrzení objednávky a obdržení ověřených platebních údajů."] },
      { id: "transfer", title: "2. Bankovní převod předem", paragraphs: ["Obdržíte fakturu s firemním účtem a platební referencí. Dosavadní splatnost je 7 pracovních dní od vystavení, není-li v objednávce sjednáno jinak. Při platbě předem expedujeme po přijetí peněz."] },
      { id: "invoice", title: "3. Faktura pro firmy", paragraphs: ["Nákup na fakturu vyžaduje naše výslovné schválení a případně kontrolu bonity. Volba v pokladně není schválením úvěru. Dosavadní splatnost je 14 dní po dodání bez srážky, není-li sjednáno jinak."] },
      { id: "custom", title: "4. Zakázková výroba", paragraphs: ["Dosavadní pravidla pro individuální úpravy stanoví zálohu 50 % před výrobou a doplatek před dodáním. Konkrétní platební plán musí být výslovně sjednán v individuální objednávce."] },
      { id: "security", title: "5. Ověření údajů a refundace", paragraphs: [`Plaťte pouze na firemní účet uvedený v ověřené faktuře. Neočekávanou změnu bankovních údajů před platbou ověřte přes ${company.phone} nebo ${company.email}. Neověřený IBAN zde nezveřejňujeme.`, "Refundace se řídí poučením o odstoupení a pravidly vrácení či reklamace. DIČ samo nezakládá nákup na fakturu ani osvobození od DPH."] },
    ],
  },
  privacy: {
    title: "Zásady ochrany osobních údajů",
    intro: "Pracovní návrh popisuje zpracování patrné v aktuálním obchodě. Údaje o produkčním provozu je nutné před zveřejněním doplnit.",
    reviewItems: ["Potvrdit hosting, smluvní společnost Base44, subdodavatele, úložiště a záruky předávání do třetích zemí. Doplnit lhůty mazání, případného pověřence a postup kontroly bonity. Prověřit produkční síťový provoz a cookies."],
    sections: [
      { id: "controller", title: "1. Správce", paragraphs: [contact, `Zastoupen jednatelem ${company.managingDirector}. Dotazy k ochraně údajů posílejte na uvedený e-mail.`] },
      { id: "data", title: "2. Poptávka, objednávka a účet", paragraphs: ["Zpracováváme poskytnuté jméno, firemní a případně daňové údaje, e-mail, telefon, fakturační a dodací adresu, výběr kontejneru a zprávy. Povinné údaje slouží vyřízení; ostatní jsou dobrovolné. Neposílejte zbytečné údaje dalších osob.", "Nabídka a plnění smlouvy včetně dodání vycházejí z čl. 6 odst. 1 písm. b GDPR, zákonné účetní a archivační povinnosti z písm. c. Obecná korespondence, ochrana před zneužitím a uplatnění či obrana nároků slouží oprávněným zájmům podle písm. f.", "Dobrovolný účet využívá ověřování Base44. Při vlastní volbě přihlášení Google je zapojen také tento poskytovatel identity. Pokladna nezískává údaje karty ani přístupu do banky. Objednávka či poptávka není souhlas s reklamou."] },
      { id: "technical", title: "3. Provoz a příjemci", paragraphs: ["Technické přístupové údaje, například IP adresa, čas, zdroj a prohlížeč, slouží dostupnosti a bezpečnosti. Oprávněným zájmem je spolehlivý a bezpečný provoz (čl. 6 odst. 1 písm. f GDPR). Netvrdíme paušální zkracování IP ani pevné mazání po sedmi dnech.", "Base44 slouží aplikačním datům, objednávkám, poptávkám a přihlášení. Média mohou být načítána z infrastruktury Base44/Wix, při čemž vznikají přístupové údaje. Poskytovatelé hostingu, IT, komunikace, logistiky, bankovních a účetních služeb získávají údaje podle své úlohy; úřady na základě zákona."] },
      { id: "storage", title: "4. Uchovávání a předávání", paragraphs: ["Poptávková data jsou potřebná pro vyřízení, data účtu pro jeho funkci a smluvní podklady pro plnění. Další uložení závisí na druhu dokladu, daňových a obchodních povinnostech a případných promlčecích lhůtách. Po zániku účelu a právního základu se údaje mažou.", "Produkční úložiště a možné předávání mimo EHP je nutné potvrdit. Před zveřejněním se případně doplní příjemci, země a skutečné záruky podle čl. 44 a násl. GDPR. Výhradní uložení v Německu není zaručeno."] },
      { id: "browser", title: "5. Úložiště a analytika SDK", paragraphs: ["Košík, jazyk a technické přihlašovací či aplikační údaje se ukládají v prohlížeči. Použité SDK Base44 navíc standardně aktivuje analytické události inicializace, aktivity a délky relace. Mohou obsahovat cestu stránky, čas, odkazující stránku, identifikátor relace a při přihlášení identifikátor uživatele. Při místním testu byly pozorovány odpovídající pokusy o přenos.", "Podrobnosti o úložišti obsahuje stránka Cookies. Právní základ, příjemce, uchovávání a případný nutný předchozí souhlas pro analytiku SDK je třeba před zveřejněním vyjasnit a technicky zajistit. Analytika není paušálně považována za nezbytnou funkci košíku. Pouhá návštěva nenahrazuje souhlas."] },
      { id: "rights", title: "6. Vaše práva", paragraphs: [`Za zákonných podmínek máte právo na přístup, opravu, výmaz, omezení a přenositelnost. Proti oprávněným zájmům lze vznést námitku z důvodů vaší zvláštní situace, proti přímému marketingu kdykoli. Souhlas lze do budoucna odvolat. Kontakt: ${company.email}.`, "Stížnost můžete podat dozorovému úřadu, zejména v místě bydliště, práce nebo domnělého porušení. V Sársku připadá v úvahu Unabhängiges Datenschutzzentrum Saarland. Obchod aktuálně neprovádí výhradně automatizované úvěrové rozhodování; případná externí kontrola bonity musí být vyjasněna před použitím."] },
    ],
  },
  cookies: {
    title: "Cookies a úložiště prohlížeče",
    intro: "Obchod používá zejména místní úložiště pro košík, jazyk a technické funkce aplikace.",
    reviewItems: ["Před spuštěním prověřit produkční chování SDK, přihlášení, hostingu a CDN. Další nepovinné služby zapnout jen s odpovídajícím souhlasem."],
    sections: [
      { id: "cart", title: "1. Košík", paragraphs: ["„baltes-container-cart“ ukládá produkty a množství do Local Storage pro další návštěvu. Aplikace neurčuje pevnou dobu platnosti. Změny aktualizují obsah; úspěšná objednávka košík vyprázdní. Záznam lze odstranit v datech webu v prohlížeči."] },
      { id: "language", title: "2. Jazyk", paragraphs: ["„baltes_locale“ pamatuje němčinu, češtinu nebo nizozemštinu. Jazykový přepínač volbu změní. Záznam zůstává do přepsání či smazání dat webu, bez automaticky stanovené expirace."] },
      { id: "app", title: "3. Přihlášení a konfigurace", paragraphs: ["Záznamy „base44_…“ slouží technické konfiguraci, návratové adrese a případně přihlášení. Podle způsobu přihlášení mohou vzniknout další položky SDK. Neznamenají souhlas se statistikou či reklamou. Po smazání může být nutné nové přihlášení."] },
      { id: "analytics", title: "4. Analytický identifikátor Base44", paragraphs: ["„base44_analytics_session_id“ ukládá náhodný identifikátor do Local Storage bez pevné aplikační expirace. SDK jej používá pro standardně aktivní události používání. Liší se od košíku a přihlášení. Souhlas nebo deaktivaci, přesné zpracování a mazání je třeba vyjasnit před zveřejněním; samotný text zásad funkci neřídí."] },
      { id: "basis", title: "5. Právní základy", paragraphs: ["Uložení a přístup nezbytné pro výslovně požadovanou službu lze opřít o § 25 odst. 2 TDDDG. Zpracování osobních údajů navíc vyžaduje základ podle GDPR. Nepotřebné uložení či vyhodnocování zpravidla vyžaduje předchozí souhlas.", "Vlastní kód obchodu aktuálně neobsahuje skripty Google Analytics ani Meta Pixel. Neznamená to absenci analytiky SDK. Neslibujeme zde neexistující ovladač nastavení cookies."] },
      { id: "control", title: "6. Vaše kontrola", paragraphs: ["Data webu lze prohlížet a mazat v nastavení prohlížeče. Košík, jazyk a přihlášení se přitom mohou ztratit. Aktivní služba může záznamy vytvořit znovu; smazání nenahrazuje správu souhlasu. Odeslané objednávky tím smazány nejsou. Pro osobní údaje platí práva uvedená v zásadách ochrany údajů."] },
    ],
  },
  imprint: {
    title: "Právní údaje",
    intro: "Údaje o poskytovateli a kontakt podle § 5 DDG. Chybějící povinné údaje jsou označeny.",
    reviewItems: ["Doplnit rejstříkový soud a číslo HRB, potvrdit adresu společnosti pro právní doručování a prohlášení o řešení spotřebitelských sporů."],
    sections: [
      { id: "provider", title: "1. Poskytovatel a kontakt", paragraphs: [contact] },
      { id: "representation", title: "2. Zastoupení a rejstřík", paragraphs: [`Jednatel: ${company.managingDirector}\nRejstříkový soud: čeká na potvrzení.\nČíslo obchodního rejstříku: čeká na potvrzení.`] },
      { id: "vat", title: "3. Identifikace pro DPH", paragraphs: [`DIČ: ${company.vatId}`] },
      { id: "disputes", title: "4. Spotřebitelské spory", paragraphs: ["Ochotu či povinnost účastnit se mimosoudního řešení sporů musí společnost potvrdit před zveřejněním. Návrh netvrdí neověřenou účast ani neúčast."] },
      { id: "content", title: "5. Obsah a práva", paragraphs: ["Za vlastní obsah platí zákonná odpovědnost. Externí odkazy vedou na nabídky příslušných provozovatelů; zákonná odpovědnost tím není vyloučena. Texty, obrázky a design lze použít v zákonem povoleném rozsahu nebo se souhlasem nositele práv."] },
    ],
  },
};

export default legalContent;
