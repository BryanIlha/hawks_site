import { useRef } from "react";
import { revealSection, useGSAP } from "../lib/gsap";

const services = [
  {
    id: "dados",
    number: "01",
    label: "Dados",
    subtitle: "Business intelligence",
    description: "Uma camada confiável para entender o que acontece antes de decidir o próximo movimento.",
    bullets: ["Data warehouse", "Modelagem semântica", "Decisão executiva"],
    accent: "cream",
  },
  {
    id: "inteligencia",
    number: "02",
    label: "Inteligência",
    subtitle: "Machine learning",
    description: "Modelos preditivos treinados no contexto real da operação — não em um benchmark distante.",
    bullets: ["Forecasting", "Recomendação", "Detecção de anomalia"],
    accent: "signal",
  },
  {
    id: "automacao",
    number: "03",
    label: "Automação",
    subtitle: "Agentes & fluxos",
    description: "Software e fluxos que conectam seus sistemas e transformam uma decisão clara em ação repetível.",
    bullets: ["WhatsApp & CRM", "RPA & integrações", "Agentes com LLM"],
    accent: "orange",
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
