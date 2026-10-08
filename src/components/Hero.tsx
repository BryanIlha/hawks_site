import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { FRONT_STATES, type FrontId } from "../lib/fronts";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";
import type { HawksCubeHandle } from "./HawksCube";
import { CubePreview } from "./CubePreview";

export function Hero() {
  const cubeRef = useRef<HawksCubeHandle>(null);
  const [Cube, setCube] = useState<typeof import("./HawksCube").HawksCube | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [cubeLoading, setCubeLoading] = useState(false);
  const [cubeError, setCubeError] = useState(false);
  const loadCube = useCallback(() => {
    setCubeLoading(true);
    setCubeError(false);
    void import("./HawksCube").then(({ HawksCube }) => {
      setCube(() => HawksCube);
      setInteractive(true);
    }).catch(() => setCubeError(true)).finally(() => setCubeLoading(false));
  }, []);
  useEffect(() => {
    let mounted = true;
    // Phones get immediate geometry and controls; the full renderer is opt-in.
    if (window.matchMedia("(max-width: 899px)").matches) return;
    const timer = window.setTimeout(() => {
      void import("./HawksCube").then(({ HawksCube }) => {
        if (mounted) { setCube(() => HawksCube); setInteractive(true); }
      }).catch(() => { /* The static representation and all page content remain usable. */ });
    }, 600);
    return () => { mounted = false; clearTimeout(timer); };
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
              {Cube && interactive ? <Cube ref={cubeRef} front={activeFront} reducedMotion={reducedMotion} expanded={expanded} motionPaused={motionPaused} onFrontChange={handleFrontChange} /> : <CubePreview front={activeFront} paused={motionPaused || reducedMotion} />}
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
              <span className="cube-instruction cube-instruction--mouse">{interactive ? "Passe o mouse nas peças · arraste para girar" : "Escolha uma frente para explorar"}</span>
              <span className="cube-instruction cube-instruction--touch">{interactive ? "Deslize na horizontal para girar" : "Escolha uma frente"}</span>
              <div className="cube-toolbar__actions">
              <button className="cube-expand" type="button" aria-pressed={interactive && expanded} disabled={cubeLoading} onClick={() => interactive ? setExpanded((value) => !value) : loadCube()}>
                <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                  {expanded ? <path d="M2 7h5V2m11 11h-5v5M7 7 2 2m11 11 5 5" /> : <path d="M7 2H2v5m11 11h5v-5M2 2l5 5m11 11-5-5" />}
                </svg>
                {cubeLoading ? "Abrindo 3D…" : !interactive ? "Explorar em 3D" : expanded ? "Fechar peças" : "Explorar peças"}
              </button>
              {interactive && <button className="cube-expand cube-exit" type="button" onClick={() => { setInteractive(false); setExpanded(false); }}>Sair do 3D</button>}
              {!reducedMotion && <button className="cube-expand cube-motion" type="button" aria-label={motionPaused ? "Retomar movimento automático" : "Pausar movimento automático"} title={motionPaused ? "Retomar movimento automático" : "Pausar movimento automático"} aria-pressed={motionPaused} onClick={() => setMotionPaused((value) => !value)}>
                <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                  {motionPaused ? <path d="m7 4 9 6-9 6Z" /> : <path d="M6 4v12M14 4v12" />}
                </svg>
              </button>}
              </div>
            </div>
            {cubeError && <p className="cube-load-error" role="status">Não foi possível abrir o 3D. Toque em Explorar para tentar novamente.</p>}
          </div>

        </div>
      </div>
    </section>
  );
}
