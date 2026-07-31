import { useRef } from "react";
import { revealSection, useGSAP } from "../lib/gsap";

const proofPoints = [
  ["CONTEXTO", "Começamos pela decisão que precisa ficar mais clara."],
  ["MODELO", "Construímos a camada certa para o seu negócio, sem plataforma engessada."],
  ["ROTINA", "Colocamos a inteligência dentro do fluxo que o time já opera."],
  ["ACOMPANHAMENTO", "Acompanhamos o que foi entregue até virar parte da operação."],
] as const;

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => revealSection(sectionRef.current), { scope: sectionRef });

  return (
    <section ref={sectionRef} id="resultados" className="proof-section section-dark">
      <div className="section-frame proof-intro">
        <p className="eyebrow" data-reveal><span className="eyebrow-mark" />O que fica depois da entrega</p>
        <p className="proof-intro__lead" data-reveal>
          O resultado não é uma tela bonita. É uma operação que encontra a resposta, reconhece o próximo risco e consegue agir sem improviso.
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
