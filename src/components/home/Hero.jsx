import React from "react";
import { Link } from "@/lib/router";
import { ArrowRight, Phone } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getHomeContent } from "@/lib/i18n/homeContent";
import HeroContainer from "@/components/home/HeroContainer";
import "./hero.css";

export default function Hero() {
  const { locale } = useLocale();
  const copy = getHomeContent(locale).hero;

  return (
    <section className="hero-section" aria-labelledby="home-hero-title" data-testid="home-hero">
      <div className="hero-layout">
        <div className="hero-copy">
          <h1 id="home-hero-title" className="hero-title">{copy.title}<span>{copy.titleSecond}</span></h1>
          <p className="hero-description">{copy.description}</p>
          <div className="hero-actions">
            <Link to="/container-kaufen" className="hero-primary group">{copy.primaryCta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
            <Link to="/angebot-anfordern" className="hero-secondary">{copy.secondaryCta}<span aria-hidden="true">↗</span></Link>
          </div>
          <Link to="/kontakt" className="hero-consultation"><Phone className="h-4 w-4" aria-hidden="true" />{copy.consultation}</Link>
          <div className="hero-history"><strong>1983</strong><span>{copy.heritage}</span></div>
        </div>
        <HeroContainer copy={copy} />
      </div>
    </section>
  );
}
