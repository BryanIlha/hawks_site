import { useRef } from "react";
import { revealSection, useGSAP } from "../lib/gsap";

const services = [
  {
    id: "dados",
    number: "01",
    label: "Dados",
    subtitle: "Fluxos de dados",
    description: "Dados organizados para decisões claras.",
    bullets: ["Pipelines", "Data warehouse", "Modelagem semântica"],
    accent: "cream",
  },
  {
    id: "automacao",
    number: "02",
    label: "Automação",
    subtitle: "Automações & fluxos",
    description: "Automações que conectam sistemas e fazem a operação avançar.",
    bullets: ["Integrações", "Fluxos operacionais", "Agentes"],
    accent: "orange",
  },
  {
    id: "tecnologia",
    number: "03",
    label: "Tecnologia",
    subtitle: "Softwares & integrações",
    description: "Softwares sob medida para a operação que você precisa escalar.",
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
        <h2 data-reveal>Três frentes.<br />Um único objetivo:<br /><em>operar com evidência.</em></h2>
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
            <a href="#contato" className="service-card__link">Discutir escopo <span aria-hidden="true">↗</span></a>
          </article>
        ))}
      </div>
    </section>
  );
}
