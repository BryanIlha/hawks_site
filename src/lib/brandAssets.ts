const brandSvg = (asset: string) => `/assets/brand/${asset}.svg`;
const brandKitSvg = (asset: string) => `/assets/brand-kit/${asset}.svg`;

/** Compact SVG mark for small, decorative placements. */
export const logoMark = brandSvg("hawks-bi-mark");

/** Light-on-dark SVG mark for the hero. */
export const logoMarkLight = brandSvg("hawks-bi-mark-light");

/** Complete SVG signature for primary brand identification. */
export const logoWordmark = brandSvg("hawks-bi-wordmark");

/** Reverse wordmark for dark surfaces. */
export const logoWordmarkReverse = brandKitSvg("hawks-bi-wordmark-reverse");
