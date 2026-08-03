import { useCallback, useRef, useState } from "react";
import { FRONT_STATES, type FrontId } from "../lib/fronts";
import { gsap, useGSAP } from "../lib/gsap";
import { logoMarkLight } from "../lib/brandAssets";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";
import { HawksCube, type HawksCubeHandle } from "./HawksCube";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HawksCubeHandle>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeFront, setActiveFront] = useState<FrontId>("dados");
  const active = FRONT_STATES.find((front) => front.id === activeFront) ?? FRONT_STATES[0];

  const handleFrontChange = useCallback((front: FrontId) => setActiveFront(front), []);

  const selectFront = (front: (typeof FRONT_STATES)[number]) => {
    setActiveFront(front.id);
    cubeRef.current?.setFront(front.id);
  };

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add({ desktop: "(min-width: 900px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      const conditions = context.conditions as { desktop?: boolean; reduced?: boolean };
      const shouldAnimate = !conditions.reduced && !reducedMotion;

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      if (shouldAnimate) {
        intro
          .from("[data-hero-brand]", { autoAlpha: 0, y: 14, scale: 0.96, duration: 0.55 })
          .from("[data-hero-title]", { autoAlpha: 0, y: 52, duration: 0.92 }, "<0.08")
          .from("[data-hero-copy]", { autoAlpha: 0, y: 22, duration: 0.72 }, "<0.18")
          .from("[data-hero-actions]", { autoAlpha: 0, y: 18, duration: 0.62 }, "<0.12")
          .from("[data-hero-object]", { autoAlpha: 0, scale: 0.92, duration: 1.1 }, "<0.06");
      }

      if (!conditions.desktop || !shouldAnimate || !stickyRef.current || !heroRef.current) return;

      const playhead = { value: 0 };
      const scrollTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "hawks-hero-fronts",
          trigger: heroRef.current,
          pin: stickyRef.current,
          start: "top top",
          end: () => `+=${Math.max(1300, window.innerHeight * 1.75)}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: [0, 0.5, 1],
            delay: 0.08,
            duration: { min: 0.18, max: 0.56 },
            ease: "power3.out",
          },
        },
      });

      scrollTimeline.to(playhead, {
        value: 1,
        duration: 1,
        onUpdate: () => cubeRef.current?.setProgress(playhead.value),
      });
      return undefined;
    });

    return () => media.revert();
  }, { scope: heroRef, dependencies: [reducedMotion], revertOnUpdate: true });

  return (
    <section ref={heroRef} id="top" className="hero-section">
      <div ref={stickyRef} className="hero-sticky">
        <div className="hero-layout section-frame">
          <div className="hero-copy">
            <p className="eyebrow hero-brandline" data-hero-brand>
              <span className="hero-brandline__mark"><img src={logoMarkLight} alt="" width="1254" height="1254" /></span>
              <span>Dados · Automação · Tecnologia</span>
            </p>
            <div className="hero-copy__body">
              <h1 data-hero-title>Problemas reais.<br /><em>Soluções sob medida.</em></h1>
              <p className="hero-lede" data-hero-copy>
                Criamos sistemas para empresas que buscam mais controle e eficiência.
              </p>
            </div>
            <div className="hero-actions" data-hero-actions>
              <a href="#contato" className="button button-primary">
                <span>Entre em contato.</span><span className="arrow-capsule" aria-hidden="true">↗</span>
              </a>
              <a href="#servicos" className="text-link">Ver as três frentes <span aria-hidden="true">↘</span></a>
            </div>
          </div>

          <div className="hero-object" data-hero-object aria-label={`Frente ativa: ${active.label}`}>
            <div className="hero-object__stage">
              <HawksCube ref={cubeRef} reducedMotion={reducedMotion} onFrontChange={handleFrontChange} />
              <div className="cube-readout" aria-live="polite">
                <span className="cube-readout__index">0{active.index + 1}</span>
                <div>
                  <strong>{active.label}</strong>
                  <small>{active.kicker}</small>
                  <span className="cube-readout__detail">{active.detail}</span>
                </div>
              </div>
            </div>
            <div className="front-selector" role="radiogroup" aria-label="Frentes HAWKS BI">
              {FRONT_STATES.map((front, index) => (
                <button
                  type="button"
                  key={front.id}
                  className={front.id === active.id ? "is-active" : ""}
                  role="radio"
                  aria-checked={front.id === active.id}
                  onClick={() => selectFront(front)}
                >
                  <span>0{index + 1}</span>{front.label}
                </button>
              ))}
            </div>
            <p className="front-selector-note">Toque para explorar cada frente</p>
          </div>
        </div>
        <div className="hero-scroll-note"><span className="scroll-line" />Role para revelar o sistema</div>
      </div>
    </section>
  );
}
