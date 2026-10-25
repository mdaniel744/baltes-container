import React from "react";
import { HERO_CONTAINER_SIZES, HERO_PHOTO, heroShopLink } from "@/lib/heroContainer";
import { Link } from "@/lib/router";

export default function HeroContainer({ copy }) {
  return (
    <div className="hero-showcase" data-testid="hero-showcase">
      <img
        src={HERO_PHOTO.large}
        srcSet={`${HERO_PHOTO.small} 800w, ${HERO_PHOTO.large} 1600w`}
        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1319px) 52vw, 690px"
        width="1600"
        height="1200"
        alt={copy.imageAlt}
        className="hero-container-photo"
        fetchPriority="high"
        loading="eager"
      />
      <nav className="hero-size-links" aria-label={copy.sizeLabel}>
        {HERO_CONTAINER_SIZES.map((size) => (
          <Link key={size} to={heroShopLink(size)} aria-label={copy.viewSize.replace("{size}", size)}>
            {size} ft
          </Link>
        ))}
      </nav>
    </div>
  );
}
