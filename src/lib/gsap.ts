import { gsap, useGSAP } from "./gsapCore";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };

export function revealSection(scope: HTMLElement | null) {
  if (!scope) return;

  const media = gsap.matchMedia();

  media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
    const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
    if (!targets.length) return;

    ScrollTrigger.batch(targets, {
      start: "top 84%",
      once: true,
      interval: 0.08,
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 28,
          duration: 0.82,
          ease: "power3.out",
          stagger: 0.08,
          clearProps: "willChange",
          overwrite: "auto",
        });
      },
    });
  });

  return () => media.revert();
}
