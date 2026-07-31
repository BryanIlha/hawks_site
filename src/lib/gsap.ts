import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export function revealSection(scope: HTMLElement | null) {
  if (!scope) return;

  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
    if (!targets.length) return;

    gsap.set(targets, { autoAlpha: 0, y: 28 });
    ScrollTrigger.batch(targets, {
      start: "top 84%",
      once: true,
      interval: 0.08,
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
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
