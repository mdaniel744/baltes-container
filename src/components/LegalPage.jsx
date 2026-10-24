import React from "react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getLegalContent } from "@/lib/i18n/legalContent";
import { LEGAL_COMPANY } from "@/lib/legalCompany";

export default function LegalPage({ title, intro, children }) {
  const { locale } = useLocale();
  const common = getLegalContent(locale).common;

  return (
    <article className="max-w-4xl mx-auto px-6 section-space">
      <header className="mb-6">
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
      </header>

      {intro && (
        <p className="text-base text-muted-foreground leading-relaxed mb-6">{intro}</p>
      )}

      <div className="prose-legal space-y-6 text-foreground/90 leading-relaxed">
        {children}
      </div>

      <footer className="mt-8 bg-secondary p-5 sm:p-6 text-sm">
        <h2 className="font-heading text-lg font-bold">{common.contactTitle}</h2>
        <p className="mt-2 text-muted-foreground">{common.contactCopy}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <address className="not-italic leading-relaxed">
            <strong>{LEGAL_COMPANY.name}</strong><br />
            {LEGAL_COMPANY.address}<br />{common.country}
          </address>
          <div className="flex flex-col items-start gap-2 min-w-0">
            <a href={`mailto:${LEGAL_COMPANY.email}`} className="break-all underline underline-offset-4 hover:text-primary focus-visible:outline focus-visible:outline-2" aria-label={`${common.email}: ${LEGAL_COMPANY.email}`}>{LEGAL_COMPANY.email}</a>
            <a href={LEGAL_COMPANY.phoneHref} className="underline underline-offset-4 hover:text-primary focus-visible:outline focus-visible:outline-2" aria-label={`${common.phone}: ${LEGAL_COMPANY.phone}`}>{LEGAL_COMPANY.phone}</a>
          </div>
        </div>
      </footer>
    </article>
  );
}
