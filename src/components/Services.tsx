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
    description: "Software sob medida, integrações e automação de processos para conectar seus sistemas e executar rotinas operacionais.",
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
        <h2 data-reveal>Três frentes.<br /><em>Um único objetivo.</em></h2>
        <p data-reveal>Software sob medida e automação de processos, apoiados por dados confiáveis e modelos treinados no contexto do seu negócio.</p>
      </div>

      <div className="service-rail section-frame">
        {services.map((service) => (
          <article key={service.id} className={`service-card service-card--${service.accent}`} data-reveal>
            <div className="service-card__topline"><span>{service.number} / 03</span><span className="service-card__signal" /></div>
            <div className="service-card__copy">
              <h3>{service.label}</h3>
              <p>{service.subtitle}</p>
              <span>{service.description}</span>
            </div>
            <ul>
              {service.bullets.map((bullet) => <li key={bullet}><i aria-hidden="true" />{bullet}</li>)}
            </ul>
            <a href="#contato" className="service-card__link">Discutir escopo <span aria-hidden="true">↗</span></a>
          </article>
        ))}
      </div>
      <div className="service-paths section-frame"><p>Da rotina ao projeto.</p><nav aria-label="Conheça nossos serviços"><a href="/servicos/software-sob-medida/">Software sob medida em Gravataí <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></a><a href="/servicos/automacao-de-processos/">Automação de processos em Gravataí <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></a></nav></div>
    </section>
  );
}
