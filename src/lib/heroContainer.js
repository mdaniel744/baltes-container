export const HERO_CONTAINER_SIZES = ["10", "20", "40"];

export const HERO_PHOTO = {
  small: "/images/hero/project-container-800.webp",
  large: "/images/hero/project-container-1600.webp",
};

export function heroShopLink(size) {
  return `/container-kaufen?size=${HERO_CONTAINER_SIZES.includes(size) ? size : "20"}`;
}
