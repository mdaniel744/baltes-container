import { Link } from "@/lib/router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { LEGAL_COMPANY } from "@/lib/legalCompany";
import { getLegalContent } from "@/lib/i18n/legalContent";
import { PHOTO_CREDIT_COPY } from "@/lib/photography";

const FOOTER_NAV = {
  container: {
    titleKey: "footer.containers",
    links: [
      { labelKey: "footer.allContainers", to: "/container-kaufen" },
      { labelKey: "footer.newContainers", to: "/container-kaufen?condition=Neu" },
      { labelKey: "footer.usedContainers", to: "/container-kaufen?condition=Gebraucht" },
      { labelKey: "nav.bySize", to: "/container-kaufen" },
      { labelKey: "footer.refrigeratedContainers", to: "/container-kaufen?type=Kühlcontainer" },
    ],
  },
  service: {
    titleKey: "footer.service",
    links: [
      { labelKey: "footer.deliverySetup", to: "/lieferung-aufstellung" },
      { labelKey: "footer.conversions", to: "/containerumbau" },
      { labelKey: "footer.conditionClasses", to: "/container-zustandsklassen" },
      { label: "FAQ", to: "/faq" },
      { labelKey: "common.contact", to: "/kontakt" },
    ],
  },
  legal: {
    titleKey: "footer.legal",
    links: [
      { labelKey: "footer.imprint", to: "/impressum" },
      { labelKey: "footer.withdrawal", to: "/widerruf" },
      { labelKey: "footer.shipping", to: "/versand-lieferung" },
      { labelKey: "footer.payment", to: "/zahlungsarten" },
    ],
  },
};

export default function Footer() {
  const year = new Date().getFullYear();
  const { t, locale } = useLocale();
  const legal = getLegalContent(locale).common;

  return (
    <footer className="bg-card shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
      <div className="max-w-terminal mx-auto px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="mb-4">
              <img src={IMAGES.logo} alt="Baltes Container" className="h-20 w-auto object-contain" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {t("footer.companyCopy")}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href={LEGAL_COMPANY.phoneHref} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-foreground shrink-0" /> {LEGAL_COMPANY.phone}
              </a>
              <a href="mailto:contact@baltescontainer.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-foreground shrink-0" /> contact@baltescontainer.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                <span>{t("footer.address")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-foreground shrink-0" /> {t("common.hours")}
              </div>
            </div>
          </div>

          {Object.values(FOOTER_NAV).map((col) => (
            <div key={col.titleKey}>
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-4">{t(col.titleKey)}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.labelKey ?? link.label}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.labelKey ? t(link.labelKey) : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 bg-secondary/65 px-6 py-5 md:flex-row">
          <div className="text-xs text-muted-foreground text-center md:text-left">
            <p>© {year} Baltes Container GmbH Alle Rechte vorbehalten.</p>
            <p className="mt-1">{t("footer.vat")}: {LEGAL_COMPANY.vatId}</p>
          </div>
          <nav aria-label={t("footer.legal")} className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs md:justify-end">
            <Link to="/agb" className="text-muted-foreground hover:text-primary transition-colors">
              {t("footer.terms")}
            </Link>
            <Link to="/datenschutz" className="text-muted-foreground hover:text-primary transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to="/rueckgabe-erstattung" className="text-muted-foreground hover:text-primary transition-colors">
              {t("footer.returns")}
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              {legal.labels.cookies}
            </Link>
            <Link to="/impressum#bildnachweise" className="text-muted-foreground hover:text-primary transition-colors">
              {(PHOTO_CREDIT_COPY[locale] || PHOTO_CREDIT_COPY.de).title}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
