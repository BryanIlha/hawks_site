import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { SOLUTIONS } from "../lib/solutions";
import { gsap, useGSAP } from "../lib/gsap";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";
import { conexoWordmark, conexoWordmarkReverse, vistoWordmark, vistoWordmarkReverse } from "../lib/brandAssets";
import { ArrowIcon } from "./ArrowIcon";
import { SolutionVisual } from "./SolutionVisual";

export function SolutionsCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const renderedIndexRef = useRef<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSolution = SOLUTIONS[activeIndex];
  const solutionLogos = {
    conexo: { regular: conexoWordmark, reverse: conexoWordmarkReverse },
    visto: { regular: vistoWordmark, reverse: vistoWordmarkReverse },
    agendamento: null,
  } as const;

  const select = (nextIndex: number) => {
    setActiveIndex((nextIndex + SOLUTIONS.length) % SOLUTIONS.length);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? SOLUTIONS.length - 1
        : event.key === "ArrowDown" || event.key === "ArrowRight"
          ? index + 1
          : index - 1;
    const normalizedIndex = (nextIndex + SOLUTIONS.length) % SOLUTIONS.length;
    select(normalizedIndex);
    requestAnimationFrame(() => document.getElementById("solution-tab-" + SOLUTIONS[normalizedIndex].id)?.focus());
  };

  useGSAP(() => {
    const track = trackRef.current;
    const activeSlide = sectionRef.current?.querySelector<HTMLElement>("[data-solution-slide='" + activeSolution.id + "']");
    const activeContent = activeSlide?.querySelector<HTMLElement>("[data-solution-content]");
    const activeVisual = activeSlide?.querySelector<HTMLElement>("[data-solution-visual]");
    const activeCut = activeSlide?.querySelector<HTMLElement>("[data-solution-cut]");
    const visualFrame = activeVisual?.querySelector<HTMLElement>("[data-solution-visual-frame]");
    const visualItems = activeVisual ? gsap.utils.toArray<HTMLElement>("[data-solution-visual-item]", activeVisual) : [];
    const animatedTargets = [activeContent, activeVisual, visualFrame, ...visualItems].filter(
      (target): target is HTMLElement => Boolean(target),
    );
    if (!track || !activeContent || !activeVisual || !visualFrame) return;

    if (reducedMotion || renderedIndexRef.current === null || renderedIndexRef.current === activeIndex) {
      gsap.set(track, { xPercent: activeIndex * -100 });
      gsap.set(animatedTargets, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", clipPath: "inset(0)" });
      if (activeCut) gsap.set(activeCut, { autoAlpha: 0, scaleY: 1 });
      renderedIndexRef.current = activeIndex;
      return;
    }

    const isCompact = window.matchMedia("(max-width: 560px)").matches;
    const copyClip = isCompact ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)";
    const visualClip = isCompact ? "inset(100% 0 0 0)" : "inset(0 0 0 100%)";
    const cutFrom = isCompact ? { scaleX: 0, scaleY: 1 } : { scaleX: 1, scaleY: 0 };
    const willChangeTargets = activeCut ? [...animatedTargets, activeCut] : animatedTargets;
    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
    renderedIndexRef.current = activeIndex;
    timeline
      .set([track, ...willChangeTargets], { willChange: "transform, opacity, filter, clip-path" })
      .to(track, { xPercent: activeIndex * -100, duration: 0.62, ease: "power3.inOut", overwrite: "auto" }, 0)
      .fromTo(activeContent, { autoAlpha: 0, y: 24, filter: "blur(5px)", clipPath: copyClip }, { autoAlpha: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0)", duration: 0.54 }, 0.12)
      .fromTo(activeVisual, { autoAlpha: 0, clipPath: visualClip }, { autoAlpha: 1, clipPath: "inset(0)", duration: 0.62 }, 0.08)
      .fromTo(visualFrame, { autoAlpha: 0, y: 26, scale: 0.975, filter: "blur(7px)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5 }, 0.22)
      .fromTo(visualItems, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.055 }, 0.36)
      .set([track, ...animatedTargets], { clearProps: "willChange,filter,clipPath" });

    if (activeCut) {
      timeline
        .fromTo(activeCut, { autoAlpha: 0, ...cutFrom }, { autoAlpha: 0.86, scaleX: 1, scaleY: 1, duration: 0.32, ease: "power3.out" }, 0.05)
        .to(activeCut, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0.38)
        .set(activeCut, { clearProps: "willChange,transform" });
    }

    return () => timeline.kill();
  }, { scope: sectionRef, dependencies: [activeIndex, activeSolution.id, reducedMotion] });

  return (
    <section ref={sectionRef} id="solucoes" className="solutions-section section-dark" aria-labelledby="solutions-title" tabIndex={-1}>
      <div className="section-frame solutions-heading">
        <h2 id="solutions-title">Soluções que viram parte da <em>operação.</em></h2>
        <p>Produtos para o trabalho que precisa avançar: atender, conferir e agendar com mais clareza.</p>
      </div>

      <div className="solutions-shell">
        <div className="section-frame solutions-carousel">
          <div className="solutions-carousel__nav">
            <div className="solutions-tabs" role="tablist" aria-label="Soluções HAWKS BI">
              {SOLUTIONS.map((solution, index) => (
                <button
                  id={"solution-tab-" + solution.id}
                  key={solution.id}
                  type="button"
                  className={"solution-tab" + (index === activeIndex ? " is-active" : "")}
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-controls={"solution-panel-" + solution.id}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <span className="solution-tab__index">{solution.index}</span>
                  {solutionLogos[solution.id] ? (
                    <>
                      <span className="solution-tab__name" aria-hidden="true">
                        <img className="solution-tab__logo solution-tab__logo--regular" src={solutionLogos[solution.id]!.regular} alt="" />
                        <img className="solution-tab__logo solution-tab__logo--reverse" src={solutionLogos[solution.id]!.reverse} alt="" />
                      </span>
                      <span className="visually-hidden">{solution.name}</span>
                    </>
                  ) : <strong>{solution.name}</strong>}
                  <small>{solution.category}</small>
                </button>
              ))}
            </div>
            <div className="solutions-controls">
              <span aria-hidden="true">{activeSolution.index} / {String(SOLUTIONS.length).padStart(2, "0")}</span>
              <span className="visually-hidden" aria-live="polite" aria-atomic="true">
                {activeSolution.name}, solução {activeIndex + 1} de {SOLUTIONS.length}
              </span>
              <div>
                <button type="button" onClick={() => select(activeIndex - 1)} aria-controls={"solution-panel-" + activeSolution.id} aria-label="Solução anterior">←</button>
                <button type="button" onClick={() => select(activeIndex + 1)} aria-controls={"solution-panel-" + activeSolution.id} aria-label="Próxima solução">→</button>
              </div>
            </div>
          </div>

          <div className="solutions-viewport">
            <div ref={trackRef} className="solutions-track">
              {SOLUTIONS.map((solution, index) => (
                <article
                  id={"solution-panel-" + solution.id}
                  key={solution.id}
                  className={"solution-slide solution-slide--" + solution.tone}
                  data-solution-slide={solution.id}
                  role="tabpanel"
                  aria-labelledby={"solution-tab-" + solution.id}
                  aria-hidden={index !== activeIndex}
                >
                  <a className="solution-slide__link" href={"#/solucoes/" + solution.id} tabIndex={index === activeIndex ? 0 : -1}>
                    <span className="solution-slide__cut" data-solution-cut aria-hidden="true" />
                    <div className="solution-slide__copy" data-solution-content={solution.id}>
                      <p className="solution-slide__category">{solution.category}</p>
                      <h3>{solution.headline}</h3>
                      <p className="solution-slide__description">{solution.description}</p>
                      <span className="solution-slide__action">{solution.cta} <ArrowIcon /></span>
                    </div>
                    <SolutionVisual solution={solution.id} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
