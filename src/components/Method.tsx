import { useRef } from "react";
import { revealSection, useGSAP } from "../lib/gsap";

const steps = [
  ["01", "Leitura", "Encontramos onde a decisão trava, o dado se perde e a rotina pede clareza."],
  ["02", "Construção", "Pipelines, modelos e interfaces feitos sob medida para o contexto que importa."],
  ["03", "Operação", "Monitoramento, versionamento e responsabilidade pelo que precisa rodar em produção."],
] as const;

export function Method() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => revealSection(sectionRef.current), { scope: sectionRef });

  return (
    <section ref={sectionRef} id="metodo" className="method-section section-dark">
      <div className="section-frame method-layout">
        <div className="method-aside" data-reveal>
          <p className="eyebrow"><span className="eyebrow-mark" />Método</p>
          <span className="method-stamp">HAWKS BI / DOUTRINA</span>
        </div>
        <div className="method-main">
          <h2 data-reveal>Dado bruto.<br /><em>Decisão clara.</em></h2>
          <p className="method-lede" data-reveal>Organizamos dados, construímos tecnologia e automatizamos o que precisa rodar.</p>
          <div className="method-steps">
            {steps.map(([number, title, description]) => (
              <div className="method-step" key={number} data-reveal>
                <span>{number}</span><h3>{title}</h3><p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
