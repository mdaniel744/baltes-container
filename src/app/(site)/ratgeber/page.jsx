"use client";

import { ArrowRight, Boxes, CircleHelp, Truck } from "lucide-react";
import FAQ from "@/components/home/FAQ";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { Link } from "@/lib/router";

const COPY = {
  de: {
    eyebrow: "Container-Ratgeber",
    title: "Gut vorbereitet zum richtigen Container",
    intro: "Antworten zu Auswahl, Zustand, Lieferung und Aufstellung – kompakt an einem Ort.",
    cards: [
      { title: "Container auswählen", copy: "Größe, Bauart und Zustand passend zum Einsatzzweck vergleichen.", action: "Container ansehen" },
      { title: "Lieferung planen", copy: "Zufahrt, Untergrund und Kranstellung vor der Anlieferung prüfen.", action: "Lieferung verstehen" },
      { title: "Häufige Fragen", copy: "Schnelle Antworten rund um Kauf, Bezahlung, Lieferung und Rückgabe.", action: "Zu den Antworten" },
    ],
  },
  nl: {
    eyebrow: "Containergids",
    title: "Goed voorbereid naar de juiste container",
    intro: "Antwoorden over keuze, conditie, levering en plaatsing – overzichtelijk op één plek.",
    cards: [
      { title: "Container kiezen", copy: "Vergelijk maat, type en conditie voor uw toepassing.", action: "Bekijk containers" },
      { title: "Levering plannen", copy: "Controleer toegang, ondergrond en kraanplaatsing vóór levering.", action: "Lees over levering" },
      { title: "Veelgestelde vragen", copy: "Snelle antwoorden over aankoop, betaling, levering en retouren.", action: "Bekijk antwoorden" },
    ],
  },
  cs: {
    eyebrow: "Průvodce kontejnery",
    title: "Jak se připravit na výběr správného kontejneru",
    intro: "Odpovědi k výběru, stavu, dopravě a umístění přehledně na jednom místě.",
    cards: [
      { title: "Výběr kontejneru", copy: "Porovnejte velikost, typ a stav podle zamýšleného využití.", action: "Zobrazit kontejnery" },
      { title: "Plánování dopravy", copy: "Před dodáním ověřte přístup, podklad a prostor pro jeřáb.", action: "Informace o dopravě" },
      { title: "Časté dotazy", copy: "Rychlé odpovědi k nákupu, platbě, dopravě a vrácení.", action: "Zobrazit odpovědi" },
    ],
  },
};

const CARD_LINKS = ["/container-kaufen", "/lieferung-aufstellung", "#faq"];
const CARD_ICONS = [Boxes, Truck, CircleHelp];

export default function GuidePage() {
  const { locale } = useLocale();
  const copy = COPY[locale] || COPY.de;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary/65">
        <div className="mx-auto max-w-terminal px-6 section-space">
          <h1 className="max-w-4xl font-heading text-3xl font-extrabold tracking-tight md:text-4xl">{copy.title}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{copy.intro}</p>
        </div>
      </header>

      <section className="mx-auto grid max-w-terminal gap-6 px-6 py-14 md:grid-cols-3">
        {copy.cards.map((card, index) => {
          const Icon = CARD_ICONS[index];
          return (
            <Link key={card.title} to={CARD_LINKS[index]} className="group bg-card p-7 shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(0,0,0,0.13)]">
              <Icon className="h-8 w-8 text-foreground" />
              <h2 className="mt-5 font-heading text-xl font-extrabold">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.copy}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                {card.action} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 text-foreground" />
              </span>
            </Link>
          );
        })}
      </section>

      <div id="faq">
        <FAQ />
      </div>
    </div>
  );
}
