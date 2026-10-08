import { products, productPath } from '../lib/editorial';
import { services, servicePath, type Service } from '../lib/services';

function Arrow() { return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>; }
export function ServicePage({ service }: { service: Service }) {
  const product = products.find((item) => item.id === service.product)!;
  const related = services.find((item) => item.slug !== service.slug)!;
  return <main id="top" className="editorial-page service-detail section-light"><div className="section-frame">
    <nav className="breadcrumbs" aria-label="Caminho da página"><a href="/">Início</a><span><span aria-hidden="true">/</span><a href="/#servicos">Serviços</a></span><span><span aria-hidden="true">/</span><span aria-current="page">{service.name}</span></span></nav>
    <header className="service-detail__hero"><h1>{service.heading}<br /><em>em Gravataí.</em></h1><div><p className="page-lede">{service.intro}</p><a className="button button-dark" href="mailto:contato@hawksbi.com.br">Conversar sobre meu projeto<span className="arrow-capsule"><Arrow /></span></a><p className="service-detail__local">Base em Gravataí, RS. Atendimento presencial.</p></div></header>
    <section className="service-detail__situations" aria-label="Situações em que podemos ajudar">{service.situations.map((situation) => <article key={situation.title}><h2>{situation.title}</h2><p>{situation.text}</p></article>)}</section>
    <section className="product-audience"><h2>Comece pelo<br /><em>trabalho real.</em></h2><div><p>{service.scope}</p><ol className="service-detail__steps">{service.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>
    <section className="product-audience"><h2>Um exemplo<br /><em>da Hawks.</em></h2><div><p>{service.proof}</p><a className="text-link" href={productPath(product.id)}>Conhecer o {product.name}<Arrow /></a></div></section>
    <section className="product-audience service-detail__faq"><h2>Antes de<br /><em>começar.</em></h2><div>{service.questions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
    <section className="service-detail__contact"><h2>Vamos olhar para<br /><em>a sua operação.</em></h2><div><p>Conte o que sua equipe faz hoje e o que precisa mudar. A primeira conversa começa por esse contexto.</p><a className="button button-dark" href="mailto:contato@hawksbi.com.br">Conversar sobre meu projeto<span className="arrow-capsule"><Arrow /></span></a><a className="text-link" href={servicePath(related.slug)}>Explorar {related.name.toLocaleLowerCase('pt-BR')}<Arrow /></a></div></section>
  </div></main>;
}
