const flow = [
  { title: "Dados", verb: "Enxergar", text: "Reunir o que está disperso e criar uma base confiável para a decisão." },
  { title: "Inteligência", verb: "Antecipar", text: "Encontrar padrões, reconhecer riscos e entender o próximo movimento." },
  { title: "Automação", verb: "Agir", text: "Conectar sistemas e colocar a decisão dentro da rotina da operação." },
];

export function Proof() {
  return (
    <section id="resultados" className="proof-section section-dark" aria-labelledby="flow-title mobile-project-title">
      <div className="section-frame desktop-only">
        <div className="proof-intro">
          <h2 id="flow-title">Da evidência <em>à ação.</em></h2>
          <p>As três frentes se conectam para que a informação continue útil depois da análise.</p>
        </div>
        <ol className="operation-flow">
          {flow.map((step, index) => (
            <li key={step.title}>
              <div className="operation-flow__line"><span>0{index + 1}</span><i aria-hidden="true" /></div>
              <p className="operation-flow__front">{step.title}</p>
              <h3>{step.verb}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="section-frame mobile-service-gateway mobile-only">
        <h2 id="mobile-project-title">Vamos criar o seu projeto.</h2>
        <nav aria-label="Projetos personalizados da Hawks">
          <a href="/servicos/software-sob-medida/">Software sob medida<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          <a href="/servicos/automacao-de-processos/">Automações e integrações<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
        </nav>
        <a href="#ferramentas" className="mobile-service-gateway__products">Conheça também nossos produtos</a>
      </div>
    </section>
  );
}
