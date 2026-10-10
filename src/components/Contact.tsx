import { CONTACT_EMAIL, ContactArrow, useContact } from "./ContactDialog";

export function Contact() {
  const openContact = useContact();
  return <section id="contato" className="contact-invitation" aria-labelledby="contact-title">
    <div className="section-frame">
      <div className="contact-invitation__main">
        <h2 id="contact-title">O que você<br />quer <em>criar?</em></h2>
        <div className="contact-invitation__action">
          <p>Um software próprio, sistemas conectados ou uma rotina automatizada. Conte sua ideia e vamos definir o próximo passo.</p>
          <button type="button" onClick={() => openContact()} className="contact-launch" aria-haspopup="dialog">Conversar sobre meu projeto<ContactArrow /></button>
          <span>Direto com a equipe Hawks.</span>
        </div>
      </div>
      <div className="contact-invitation__facts">
        <div><span>Fale com a Hawks</span><button type="button" onClick={() => openContact()} aria-haspopup="dialog">{CONTACT_EMAIL}</button><a href="tel:+5551995614866">(51) 99561-4866</a></div>
        <div><span>Encontre a gente</span><address>Rua Bernardo Joaquim Ferreira, 1780<br />Parque dos Anjos · Gravataí, RS<br /><small>CEP 94190-000</small></address></div>
        <div><span>Atendimento presencial e online</span><p>Segunda a sexta<br />09h às 20h</p></div>
      </div>
    </div>
  </section>;
}
