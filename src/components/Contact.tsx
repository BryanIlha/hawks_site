import { useRef } from "react";
import { revealSection, useGSAP } from "../lib/gsap";

const contactEmail = "contato@hawksbi.com.br";
const contactMailto = `mailto:${contactEmail}?subject=${encodeURIComponent("Contato pelo site HAWKS BI")}`;

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => revealSection(sectionRef.current), { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contato" className="contact-section section-orange">
      <div className="section-frame contact-layout">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow eyebrow-dark"><span className="eyebrow-mark" />Próximo passo</p>
          <h2>Entre em<br /><em>contato.</em></h2>
          <p>Uma conversa objetiva sobre dados, automação e tecnologia para a sua operação.</p>
        </div>
        <div className="contact-details" data-reveal>
          <div className="contact-line"><span>E-mail</span><a href={contactMailto}>{contactEmail}</a></div>
          <div className="contact-line"><span>Telefone</span><a href="tel:+5551995614866">55 51995614866</a></div>
          <div className="contact-line">
            <span>Endereço</span>
            <address>Rua Bernardo Joaquim Ferreira, 1780<br />Parque dos Anjos<br />Gravataí - RS, 94190-000</address>
          </div>
          <a href={contactMailto} className="button button-dark">
            <span>Entre em contato.</span><span className="arrow-capsule" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
