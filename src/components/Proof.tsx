import { useRef } from "react";
import { revealSection, useGSAP } from "../lib/gsap";

const proofPoints = [
  ["CONTEXTO", "Começamos pela decisão que precisa de clareza."],
  ["MODELO", "Desenhamos a camada certa para o seu contexto, sem plataforma engessada."],
  ["ROTINA", "Levamos a solução para o fluxo que sua equipe já conhece."],
  ["ACOMPANHAMENTO", "Acompanhamos a adoção até a solução virar rotina."],
] as const;

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => revealSection(sectionRef.current), { scope: sectionRef });

  return (
    <section ref={sectionRef} id="resultados" className="proof-section section-dark">
      <div className="section-frame proof-intro">
        <p className="eyebrow" data-reveal><span className="eyebrow-mark" />O que fica depois da entrega</p>
        <p className="proof-intro__lead" data-reveal>
          A entrega não termina na tela. Ela vira uma operação que encontra respostas, enxerga riscos e age sem improviso.
        </p>
      </div>
      <div className="proof-grid section-frame">
        {proofPoints.map(([label, text]) => (
          <div key={label} className="proof-point" data-reveal>
            <span className="proof-point__label">{label}</span>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
