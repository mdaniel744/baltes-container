import React from "react";
import LegalPage from "@/components/LegalPage";
import PhotoCredits from "@/components/PhotoCredits";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getLegalContent, LEGAL_ROUTES, LEGAL_REVIEW_REQUIRED } from "@/lib/i18n/legalContent";
import { Link } from "@/lib/router";

export default function LocalizedLegalDocument({ documentKey }) {
  const { locale } = useLocale();
  const content = getLegalContent(locale);
  const document = content[documentKey];
  const { common } = content;

  return (
    <LegalPage
      title={document.title}
      intro={document.intro}
    >
      <nav aria-label={common.navigation} className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
        {Object.entries(LEGAL_ROUTES).map(([key, route]) => (
          <Link key={key} to={route} aria-current={key === documentKey ? "page" : undefined}
            className={`underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 ${key === documentKey ? "font-bold underline text-foreground" : "text-muted-foreground"}`}>
            {common.labels[key]}
          </Link>
        ))}
      </nav>
      {LEGAL_REVIEW_REQUIRED && (
        <aside role="note" className="bg-secondary p-4 text-sm leading-relaxed">
          <p className="font-medium">{common.draft}</p>
          {document.reviewItems?.length > 0 && (
            <details className="mt-2">
              <summary className="cursor-pointer underline underline-offset-4">{common.review}</summary>
              <ul className="mt-2 list-disc pl-5 space-y-2 text-muted-foreground">
                {document.reviewItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </details>
          )}
        </aside>
      )}
      <details className="text-sm">
        <summary className="cursor-pointer font-medium">{common.contents}</summary>
        <nav aria-label={common.contents} className="mt-3 grid gap-2 sm:grid-cols-2">
          {document.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="text-muted-foreground underline underline-offset-4">{section.title}</a>
          ))}
        </nav>
      </details>
      {document.sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-40">
          <h2 className="font-heading text-lg font-bold mb-3">{section.title}</h2>
          <div className="space-y-3">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="whitespace-pre-line break-words text-sm sm:text-base">{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
      {documentKey === "imprint" && <PhotoCredits />}
    </LegalPage>
  );
}
