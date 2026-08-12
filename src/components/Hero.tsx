import { lazy, Suspense, useCallback, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { FRONT_STATES, type FrontId } from "../lib/fronts";
import { gsap, useGSAP } from "../lib/gsap";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";
import type { HawksCubeHandle } from "./HawksCube";

const HawksCube = lazy(() => import("./HawksCube").then((module) => ({ default: module.HawksCube })));

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

  const handleFrontKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!direction && event.key !== "Home" && event.key !== "End") return;

    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? FRONT_STATES.length - 1
        : (index + direction + FRONT_STATES.length) % FRONT_STATES.length;
    const nextFront = FRONT_STATES[nextIndex];
    selectFront(nextFront);
    requestAnimationFrame(() => document.getElementById(`front-selector-${nextFront.id}`)?.focus());
  };

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add({ desktop: "(min-width: 900px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      const conditions = context.conditions as { desktop?: boolean; reduced?: boolean };
      const shouldAnimate = !conditions.reduced && !reducedMotion;

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      if (shouldAnimate) {
        intro
          .from("[data-hero-title]", { autoAlpha: 0, y: 42, duration: 0.92 })
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
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: [0, 0.5, 1],
            delay: 0.08,
            duration: { min: 0.12, max: 0.3 },
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
            <div className="hero-copy__body">
              <h1 data-hero-title>Quando a operação trava.<br /><em>A gente constrói o próximo passo.</em></h1>
              <p className="hero-lede" data-hero-copy>
                Dados, automação e tecnologia sob medida para decidir com clareza e fazer a rotina avançar.
              </p>
            </div>
            <div className="hero-actions" data-hero-actions>
              <a href="#contato" className="button button-primary">
                <span>Falar sobre a operação.</span><span className="arrow-capsule" aria-hidden="true">↗</span>
              </a>
              <a href="#servicos" className="text-link">Ver o que fazemos <span aria-hidden="true">↘</span></a>
            </div>
          </div>

          <div className="hero-object" data-hero-object aria-label={`Frente ativa: ${active.label}`}>
            <div className="hero-object__stage">
              <Suspense fallback={<div className="hawks-cube hawks-cube--loading" aria-hidden="true" />}>
                <HawksCube ref={cubeRef} reducedMotion={reducedMotion} onFrontChange={handleFrontChange} />
              </Suspense>
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
                  id={`front-selector-${front.id}`}
                  className={front.id === active.id ? "is-active" : ""}
                  role="radio"
                  aria-checked={front.id === active.id}
                  tabIndex={front.id === active.id ? 0 : -1}
                  onKeyDown={(event) => handleFrontKeyDown(event, index)}
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
