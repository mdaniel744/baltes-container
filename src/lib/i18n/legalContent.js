import de from "./legal/de.js";
import cs from "./legal/cs.js";
import nl from "./legal/nl.js";

// Open release requirements are recorded in docs/policy-release-checklist.txt.
// Removing publication dates does not approve incomplete legal documents.
export const LEGAL_REVIEW_REQUIRED = true;
export const LEGAL_CONTENT = { de, cs, nl };
export const LEGAL_ROUTES = {
  terms: "/agb",
  withdrawal: "/widerruf",
  returns: "/rueckgabe-erstattung",
  shipping: "/versand-lieferung",
  payments: "/zahlungsarten",
  privacy: "/datenschutz",
  cookies: "/cookies",
  imprint: "/impressum",
};
export function getLegalContent(locale) {
  return LEGAL_CONTENT[locale] ?? LEGAL_CONTENT.de;
}
