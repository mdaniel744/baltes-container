import React, { useState } from "react";
import { Link, NavLink } from "@/lib/router";
import { Menu, X, Search, ShoppingCart, Phone, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { SUPPORTED_LOCALES } from "@/lib/i18n/messages";
import { useCart } from "@/lib/CartContext";

const NAV = [
  { labelKey: "nav.home", to: "/" },
  { labelKey: "nav.shop", to: "/container-kaufen" },
  { labelKey: "nav.solutions", to: "/containerumbau" },
  { labelKey: "nav.delivery", to: "/lieferung-aufstellung" },
  { labelKey: "nav.guide", to: "/ratgeber" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const { totalItems, openCart } = useCart();
  const activeLanguage = SUPPORTED_LOCALES.find(({ code }) => code === locale);

  const chooseLanguage = (code) => {
    setLocale(code);
    setLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 shadow-[0_8px_30px_rgba(0,0,0,0.07)] backdrop-blur-md">
      {/* Utility bar */}
      <div className="hidden md:block bg-card/60">
        <div className="max-w-terminal mx-auto px-6 flex items-center justify-between text-xs text-muted-foreground h-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-foreground" />+49 163 5393159</span>
            <span>{t("common.hours")}</span>
            <span>{t("common.nationwideDelivery")}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/kontakt" className="hover:text-foreground transition-colors">{t("common.customerService")}</Link>
            <Link to="/standorte" className="hover:text-foreground transition-colors">{t("common.locations")}</Link>
            <Link to="/ueber-uns" className="hover:text-foreground transition-colors">{t("nav.about")}</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-terminal mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label={`Baltes Container ${t("nav.home")}`}>
          <img src={IMAGES.logo} alt="Baltes Container" className="h-12 w-auto object-contain md:h-14" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.labelKey}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive && "text-primary"
                )
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="hidden md:flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors" aria-label={t("common.search")}>
            <Search className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="hidden md:flex items-center gap-1 px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t("common.chooseLanguage")}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <Globe className="w-5 h-5" />
              <span>{activeLanguage?.short}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-44 overflow-hidden bg-popover py-1 shadow-xl"
                role="listbox"
                aria-label={t("common.chooseLanguage")}
              >
                {SUPPORTED_LOCALES.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => chooseLanguage(language.code)}
                    role="option"
                    aria-selected={language.code === locale}
                    className={cn("w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors", language.code === locale && "text-primary font-medium")}
                  >
                    {language.short} · {language.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={openCart}
            className="relative flex h-11 w-11 items-center justify-center bg-secondary text-foreground transition hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary"
            aria-label={t("common.cart")}
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-extrabold text-primary-foreground shadow-md">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          <Link
            to="/angebot-anfordern"
            className="hidden items-center bg-primary/10 px-4 py-2.5 text-sm font-bold text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground md:flex"
          >
            {t("common.requestQuote")}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-foreground"
            aria-label={t("common.openMenu")}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
          <nav className="max-w-terminal mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.labelKey}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn("px-3 py-3 text-base font-medium", isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary")
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
            <NavLink
              to="/ueber-uns"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn("px-3 py-3 text-base font-medium", isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary")
              }
            >
              {t("nav.about")}
            </NavLink>
            <Link
              to="/angebot-anfordern"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center px-4 py-3 text-base font-bold bg-primary text-primary-foreground"
            >
              {t("common.requestQuote")}
            </Link>
            <div className="mt-4">
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("common.chooseLanguage")}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SUPPORTED_LOCALES.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => chooseLanguage(language.code)}
                    className={cn(
                      "bg-secondary px-2 py-2 text-sm transition",
                      language.code === locale && "bg-primary text-primary-foreground shadow-md",
                    )}
                  >
                    {language.short}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <a href="tel:+491635393159" className="flex flex-1 items-center justify-center gap-2 bg-secondary py-3 text-sm">
                <Phone className="w-4 h-4 text-foreground" /> {t("common.call")}
              </a>
              <Link to="/kontakt" onClick={() => setMobileOpen(false)} className="flex flex-1 items-center justify-center gap-2 bg-secondary py-3 text-sm">
                {t("common.contact")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
