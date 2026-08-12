import { useRef } from "react";
import { revealSection, useGSAP } from "../lib/gsap";
import { ArrowIcon } from "./ArrowIcon";

const services = [
  {
    id: "dados",
    number: "01",
    label: "Dados",
    subtitle: "Base para decidir",
    description: "Dados confiáveis para enxergar o que está acontecendo e decidir sem adivinhação.",
    bullets: ["Dados confiáveis", "Visão unificada", "Indicadores acionáveis"],
    accent: "cream",
  },
  {
    id: "automacao",
    number: "02",
    label: "Automação",
    subtitle: "Rotinas que avançam",
    description: "Fluxos que tiram o trabalho repetitivo do caminho e conectam quem precisa agir.",
    bullets: ["Integrações", "Tarefas automáticas", "Agentes com contexto"],
    accent: "orange",
  },
  {
    id: "tecnologia",
    number: "03",
    label: "Tecnologia",
    subtitle: "Sistemas que encaixam",
    description: "Sistemas sob medida para a rotina que sua operação não resolve com ferramenta pronta.",
    bullets: ["Sistemas internos", "Integrações", "Produtos digitais"],
    accent: "signal",
  },
] as const;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => revealSection(sectionRef.current), { scope: sectionRef });

  return (
    <section ref={sectionRef} id="servicos" className="services-section section-light">
      <div className="section-frame services-heading">
        <p className="eyebrow eyebrow-dark" data-reveal><span className="eyebrow-mark" />O que fazemos</p>
        <h2 data-reveal>Três frentes.<br />Um objetivo:<br /><em>decidir com evidência.</em></h2>
      </div>

      <div className="service-rail section-frame">
        {services.map((service) => (
          <article key={service.id} className={`service-card service-card--${service.accent}`} data-reveal>
            <div className="service-card__topline"><span>{service.number} / 03</span><span className="service-card__signal" /></div>
            <div className="service-card__copy">
              <p>{service.subtitle}</p>
              <h3>{service.label}</h3>
              <span>{service.description}</span>
            </div>
            <ul>
              {service.bullets.map((bullet) => <li key={bullet}><i aria-hidden="true" />{bullet}</li>)}
            </ul>
            <a href="#contato" className="service-card__link">Falar sobre esta frente <ArrowIcon /></a>
          </article>
        ))}
      </div>
    </section>
  );
}
