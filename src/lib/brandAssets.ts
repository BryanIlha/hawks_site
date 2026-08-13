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

/** Current Visto wordmark used by the live landing page. */
export const vistoWordmark = "/assets/visto/visto_wordmark.svg";

/** Current reverse wordmark used by the live landing page on dark surfaces. */
export const vistoWordmarkReverse = "/assets/visto/visto_wordmark_reverse.svg";

/** Conexo L1 wordmark for light product surfaces. */
export const conexoWordmark = "/assets/conexo/conexo-l1-wordmark-41.svg";

/** Reverse Conexo L1 wordmark for dark product surfaces. */
export const conexoWordmarkReverse = "/assets/conexo/conexo-l1-wordmark-41-reverse.svg";

/** Compact mark currently used by the live landing page. */
export const vistoMark = "/assets/visto/visto_icon.svg";

/** Approved standalone Visto icon supplied for favicon and compact placements. */
export const vistoIcon = "/assets/visto/visto_icon.svg";
