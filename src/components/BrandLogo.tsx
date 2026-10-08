import { useId } from "react";
import { logoIcon, logoLockup } from "../lib/brandAssets";

// Display the artwork, rather than the transparent padding in the source exports.
export function BrandLogo({ icon = false, light = false }: { icon?: boolean; light?: boolean }) {
  const filterId = useId().replace(/:/g, "");
  return (
    <svg
      viewBox={icon ? "278 190 720 805" : "287 210 1515 310"}
      role="img"
      aria-label="HAWKS BI"
      focusable="false"
    >
      {light && (
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 0.961  0 0 0 0 0.941  0 0 0 0 0.906  -5 5 0 1 0" />
          </filter>
        </defs>
      )}
      <image
        href={icon ? logoIcon : logoLockup}
        width={icon ? 1254 : 2111}
        height={icon ? 1254 : 745}
      />
      {light && <image href={icon ? logoIcon : logoLockup} width={icon ? 1254 : 2111} height={icon ? 1254 : 745} filter={`url(#${filterId})`} />}
    </svg>
  );
}
