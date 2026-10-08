import { useRef } from "react";
import { revealSection, useGSAP } from "../lib/gsap";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => revealSection(sectionRef.current), { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contato" className="contact-section section-orange">
      <div className="section-frame contact-layout">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow eyebrow-dark"><span className="eyebrow-mark" />Próximo passo</p>
          <h2>Entre em<br /><em>contato.</em></h2>
          <p>Atendimento presencial em Gravataí para conversar sobre software e automações. Conte onde o trabalho trava e o que sua equipe precisa conectar.</p>
        </div>
        <div className="contact-details" data-reveal>
          <div className="contact-line"><span>E-mail</span><a href="mailto:contato@hawksbi.com.br">contato@hawksbi.com.br</a></div>
          <div className="contact-line"><span>Base</span><strong>Gravataí · RS · Brasil</strong></div>
          <a href="mailto:contato@hawksbi.com.br" className="button button-dark">
            <span>Entre em contato.</span><span className="arrow-capsule" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
