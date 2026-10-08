import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { FRONT_STATES, type FrontId } from "../lib/fronts";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";
import type { HawksCubeHandle } from "./HawksCube";

export function Hero() {
  const cubeRef = useRef<HawksCubeHandle>(null);
  const [Cube, setCube] = useState<typeof import("./HawksCube").HawksCube | null>(null);
  useEffect(() => {
    let mounted = true;
    const frame = requestAnimationFrame(() => {
      void import("./HawksCube").then(({ HawksCube }) => {
        if (mounted) setCube(() => HawksCube);
      }).catch(() => { /* The static representation and all page content remain usable. */ });
    });
    return () => { mounted = false; cancelAnimationFrame(frame); };
  }, []);
  const selectorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeFront, setActiveFront] = useState<FrontId>("dados");
  const [expanded, setExpanded] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const active = FRONT_STATES.find((front) => front.id === activeFront) ?? FRONT_STATES[0];
  const handleFrontChange = useCallback((front: FrontId) => setActiveFront(front), []);

  const selectFront = (front: (typeof FRONT_STATES)[number]) => {
    setActiveFront(front.id);
    cubeRef.current?.setFront(front.id);
  };
  const navigateFronts = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % FRONT_STATES.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + FRONT_STATES.length - 1) % FRONT_STATES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = FRONT_STATES.length - 1;
    else return;
    event.preventDefault();
    selectFront(FRONT_STATES[next]);
    selectorRef.current?.querySelectorAll<HTMLButtonElement>("button")[next].focus();
  };

  return (
    <section id="top" className="hero-section">
      <div className="hero-sticky">
        <div className="hero-layout section-frame">
          <div className="hero-copy">
            <div className="hero-copy__body">
              <h1>Três frentes.<br /><em>Um sistema.</em></h1>
              <p className="hero-lede">
                Software sob medida e automação de processos em Gravataí. Conectamos dados, sistemas e decisões à rotina da sua operação.
              </p>
            </div>
          </div>

          <div className="hero-actions">
            <a href="#contato" className="button button-primary">
              <span>Entre em contato.</span><span className="arrow-capsule" aria-hidden="true">↗</span>
            </a>
            <a href="#ferramentas" className="text-link">Veja na prática <span aria-hidden="true">↘</span></a>
          </div>

          <div className="hero-object">
            <div className="hero-object__stage">
              {Cube ? <Cube ref={cubeRef} front={activeFront} reducedMotion={reducedMotion} expanded={expanded} motionPaused={motionPaused} onFrontChange={handleFrontChange} /> : (
                <div className="hawks-cube cube-placeholder" role="img" aria-label="Dados, Inteligência e Automação: as três faces da HAWKS BI">
                  <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
                    <path d="m120 28 82 47v94l-82 47-82-47V75Z" fill="#11110f" stroke="#484035" />
                    <path d="m38 75 82 47 82-47M120 122v94M79 51l82 47v94M161 51 79 98v94M38 122l82 47 82-47" stroke="#302b24" />
                  </svg>
                </div>
              )}
            </div>
            <div className="cube-readout" aria-live="polite" aria-atomic="true">
              <span className="cube-readout__index">0{active.index + 1}</span>
              <div>
                <strong>{active.label}</strong>
                <small>{active.kicker}</small>
              </div>
              <span className="cube-readout__detail">{active.detail}</span>
            </div>
            <div ref={selectorRef} className="front-selector" role="radiogroup" aria-label="Frentes HAWKS BI">
              {FRONT_STATES.map((front, index) => (
                <button
                  type="button"
                  key={front.id}
                  className={front.id === active.id ? "is-active" : ""}
                  role="radio"
                  aria-checked={front.id === active.id}
                  tabIndex={front.id === active.id ? 0 : -1}
                  onClick={() => selectFront(front)}
                  onKeyDown={(event) => navigateFronts(event, index)}
                >
                  <span>0{index + 1}</span>{front.label}
                </button>
              ))}
            </div>
            <div className="hero-object__toolbar">
              <span className="cube-instruction cube-instruction--mouse">Passe o mouse nas peças · arraste para girar</span>
              <span className="cube-instruction cube-instruction--touch">Toque nas frentes ou deslize para girar</span>
              <div className="cube-toolbar__actions">
              <button className="cube-expand" type="button" aria-pressed={expanded} onClick={() => setExpanded((value) => !value)}>
                <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                  {expanded ? <path d="M2 7h5V2m11 11h-5v5M7 7 2 2m11 11 5 5" /> : <path d="M7 2H2v5m11 11h5v-5M2 2l5 5m11 11-5-5" />}
                </svg>
                {expanded ? "Fechar prévia" : "Explorar peças"}
              </button>
              {!reducedMotion && <button className="cube-expand cube-motion" type="button" aria-label="Pausar movimento automático" title={motionPaused ? "Retomar movimento automático" : "Pausar movimento automático"} aria-pressed={motionPaused} onClick={() => setMotionPaused((value) => !value)}>
                <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                  {motionPaused ? <path d="m7 4 9 6-9 6Z" /> : <path d="M6 4v12M14 4v12" />}
                </svg>
              </button>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
