import { useRef, useState, type KeyboardEvent } from "react";

const scenes = [
  { id: "overview", label: "Visão geral", title: "Encontre o que precisa de atenção.", text: "Rotinas, pendências e desvios no mesmo lugar. A gestão sabe por onde começar." },
  { id: "execution", label: "Execução", title: "O próximo passo fica claro.", text: "A fila organiza o trabalho por horário e setor. O time acompanha o que está atrasado, em andamento ou pendente." },
  { id: "evidence", label: "Evidência", title: "O registro acompanha a ação.", text: "Resposta, horário e correção permanecem juntos. O contexto fica disponível para quem acompanha a operação." },
] as const;

const products = [
  { name: "Conexo", symbol: "/assets/products/conexo-symbol.svg", wordmark: "/assets/products/conexo-wordmark.svg", status: "Em validação", category: "Atendimento multicanal", description: "Reúne conversas de WhatsApp, Instagram e e-mail em um histórico e passa o contexto para a equipe assumir o atendimento.", href: "/produtos/conexo/", action: "Conhecer o Conexo" },
  { name: "Agendo", symbol: undefined, wordmark: "/assets/products/agendo-logo.png", status: "Em validação", category: "Agendamentos", description: "Organiza pedidos de horário pela web, respeitando a forma de atender e aprovar de cada negócio. O atendimento pelo WhatsApp está em validação.", href: "https://agendo.hawksbi.com.br/", action: "Conhecer o Agendo" },
];

function CheckMark() {
  return <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg>;
}

export function Products() {
  const [scene, setScene] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const active = scenes[scene];
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % scenes.length;
    else if (event.key === "ArrowLeft") next = (index + scenes.length - 1) % scenes.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = scenes.length - 1;
    else return;
    event.preventDefault();
    setScene(next);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("button")[next].focus();
  };

  return (
    <section id="ferramentas" className="products-section section-light" aria-labelledby="products-title">
      <div className="section-frame products-heading">
        <h2 id="products-title">Inteligência que<br /><em>entra na rotina.</em></h2>
        <p>Criamos produtos a partir de problemas de operação. Explore um exemplo e veja como o trabalho ganha contexto.</p>
      </div>
      <div className="section-frame product-feature">
        <div className="product-feature__intro">
          <div className="product-feature__brand" role="img" aria-label="Visto">
            <img src="/assets/products/visto-symbol.svg" alt="" width="42" height="48" loading="lazy" />
            <img src="/assets/products/visto-wordmark.svg" alt="" width="118" height="42" loading="lazy" />
          </div>
          <span className="product-status"><i aria-hidden="true" />Em operação</span>
          <h3>Uma rotina.<br />Todo o contexto.</h3>
          <p>Orienta a execução de rotinas, registra evidências e deixa as exceções visíveis para quem precisa agir.</p>
          <a href="/produtos/visto/" className="product-card__link">Conhecer o Visto <span aria-hidden="true">↗</span></a>
        </div>
        <div className="product-demo">
          <div className="product-demo__bar"><span>Visto / Operação</span><span>Dados fictícios</span></div>
          <div className="product-demo__heading"><h4>Visão da operação</h4><span>Turno da manhã</span></div>
          <div ref={tabsRef} className="product-demo__tabs" role="tablist" aria-label="Explorar demonstração do Visto">
            {scenes.map((item, index) => <button key={item.id} id={`visto-tab-${item.id}`} type="button" role="tab" aria-selected={scene === index} aria-controls={`visto-panel-${item.id}`} tabIndex={scene === index ? 0 : -1} onClick={() => setScene(index)} onKeyDown={(event) => navigate(event, index)}>{item.label}</button>)}
          </div>
          {scenes.map((item, index) => (
            <div key={item.id} role="tabpanel" id={`visto-panel-${item.id}`} aria-labelledby={`visto-tab-${item.id}`} tabIndex={0} hidden={scene !== index} className="product-demo__panel">
              {index === 0 && <>
                <div className="demo-summary"><div><span>Rotinas de hoje</span><strong>09 <small>/ 12</small></strong><span>concluídas</span></div><div className="demo-summary__attention"><span>Em atenção</span><strong>03</strong><span>exigem ação hoje</span></div></div>
                <div className="demo-list">
                  <div><span className="demo-status-dot" /><div><strong>Temperatura da câmara fria</strong><span>Produção · 08:05</span></div><span className="demo-tag">Atenção</span></div>
                  <div><span className="demo-status-dot" /><div><strong>Limpeza de bancada</strong><span>Produção · 08:16</span></div><span className="demo-tag">Atrasada</span></div>
                  <div><span className="demo-check"><CheckMark /></span><div><strong>Conferência final</strong><span>Expedição · 08:42</span></div><span className="demo-tag demo-tag--done">Concluída</span></div>
                </div>
              </>}
              {index === 1 && <>
                <p className="demo-section-title">Fila do dia <span>O que precisa acontecer agora.</span></p>
                <div className="demo-list demo-list--schedule">
                  <div><time>08:00</time><div><strong>Limpeza de bancada</strong><span>Produção · 8 itens</span></div><span className="demo-tag">Atrasada</span></div>
                  <div><time>13:30</time><div><strong>Conferência final</strong><span>Expedição · 6 itens</span></div><span className="demo-tag demo-tag--neutral">Em andamento</span></div>
                  <div><time>15:00</time><div><strong>Temperatura da vitrine</strong><span>Atendimento · 2 itens</span></div><span className="demo-tag demo-tag--neutral">Pendente</span></div>
                </div>
              </>}
              {index === 2 && <>
                <p className="demo-section-title">Registro em contexto <span>Produção · Limpeza de bancada</span></p>
                <div className="demo-record"><div><span>Item 04 de 08</span><span className="demo-tag">Não conforme</span></div><p>Higienização refeita antes do início da produção.</p><span className="demo-record__saved"><CheckMark />Correção registrada</span></div>
                <p className="demo-record__foot">Foto anexada · 08:16 · histórico disponível</p>
              </>}
            </div>
          ))}
          <div className="product-demo__caption" aria-live="polite" aria-atomic="true"><strong>{active.title}</strong><p>{active.text}</p></div>
        </div>
        <p className="product-demo__disclaimer">Demonstração ilustrativa baseada no fluxo público do Visto. Os dados exibidos são fictícios.</p>
      </div>
      <div className="section-frame products-grid">
        {products.map((product) => <article className="product-card" key={product.name}>
          <div className={`product-card__brand${product.symbol ? " product-card__brand--split" : ""}`} role="img" aria-label={`Logo ${product.name}`}>
            {product.symbol && <img className="product-card__symbol" src={product.symbol} alt="" loading="lazy" />}
            <img className="product-card__wordmark" src={product.wordmark} alt="" loading="lazy" />
          </div>
          <div className="product-card__body"><div className="product-card__meta"><span>{product.category}</span><span>{product.status}</span></div><h3>{product.name}</h3><p>{product.description}</p><a href={product.href} className="product-card__link">{product.action}<span aria-hidden="true">↗</span></a></div>
        </article>)}
      </div>
    </section>
  );
}
