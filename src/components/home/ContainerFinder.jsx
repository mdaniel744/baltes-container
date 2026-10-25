import React, { useState } from "react";
import { Link } from "@/lib/router";
import SectionHeading from "@/components/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";
import { formatContainerTitle } from "@/lib/catalogPresentation";

export default function ContainerFinder() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).finder;
  const [use, setUse] = useState("Lagerung");
  const [size, setSize] = useState("20");
  const [cond, setCond] = useState("Gebraucht");
  const selectedSizeLabel = copy.sizes.find((option) => option.value === size)?.label ?? size;
  const finderQuery = new URLSearchParams({ use, size, condition: cond }).toString();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/45 section-space">
      <div className="max-w-terminal mx-auto px-6">
        <SectionHeading
          title={copy.title}
          description={copy.description}
          align="center"
        />

        <div className="relative mt-8 overflow-hidden bg-card p-5 shadow-[0_12px_35px_rgba(0,0,0,0.07)] md:p-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FinderGroup label={copy.useLabel} options={copy.uses} value={use} onChange={setUse} />
            <FinderGroup label={copy.sizeLabel} options={copy.sizes} value={size} onChange={setSize} />
            <FinderGroup label={copy.conditionLabel} options={copy.conditions} value={cond} onChange={setCond} />
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 bg-secondary/70 p-4 sm:flex-row">
            <div className="text-sm text-muted-foreground">
              {copy.recommendation}{" "}
              <span className="text-foreground font-medium">
                {formatContainerTitle(copy.conditions.find((option) => option.value === cond)?.label)} {selectedSizeLabel} Container {copy.recommendationFor}{" "}
                {copy.uses.find((option) => option.value === use)?.label}
              </span>
            </div>
            <Link
              to={`/container-kaufen?${finderQuery}`}
              className="bg-primary group flex min-h-12 items-center gap-2 px-7 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 active:translate-y-0 active:scale-[0.98]"
            >
              {copy.cta}

            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinderGroup({ label, options, value, onChange }) {
  return (
    <div>
      <div className="mb-3 font-mono-tech text-xs font-bold uppercase tracking-wider text-foreground/70">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`min-h-11 px-4 py-2.5 text-sm font-semibold transition duration-200 active:scale-[0.97] ${
              value === opt.value
                ? "bg-primary -translate-y-0.5 text-primary-foreground shadow-lg shadow-black/10"
                : "bg-secondary text-muted-foreground shadow-sm hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary hover:shadow-md"
            }`}
          >
            {formatContainerTitle(opt.label)}
          </button>
        ))}
      </div>
    </div>
  );
}
