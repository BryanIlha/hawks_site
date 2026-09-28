import { useRef } from "react";
import { revealSection, useGSAP } from "../lib/gsap";

type Product = {
  name: string;
  symbol?: string;
  wordmark: string;
  status: string;
  category: string;
  description: string;
  href: string;
  action: string;
};

const products: Product[] = [
  {
    name: "Visto",
    symbol: "/assets/products/visto-symbol.svg",
    wordmark: "/assets/products/visto-wordmark.svg",
    status: "Em operação",
    category: "Rotinas e checklists",
    description: "Orienta a execução de rotinas, registra evidências e deixa as exceções visíveis para quem precisa agir.",
    href: "https://visto.hawksbi.com.br",
    action: "Conhecer o Visto",
  },
  {
    name: "Agendo",
    wordmark: "/assets/products/agendo-logo.png",
    status: "Em desenvolvimento",
    category: "Agendamentos",
    description: "Em desenvolvimento para organizar pedidos de horário pela web e pelo WhatsApp, respeitando a forma de atender e aprovar de cada negócio.",
    href: "#contato",
    action: "Conversar sobre o Agendo",
  },
  {
    name: "Conexo",
    symbol: "/assets/products/conexo-symbol.svg",
    wordmark: "/assets/products/conexo-wordmark.svg",
    status: "Em validação",
    category: "Atendimento multicanal",
    description: "Reúne conversas de WhatsApp, Instagram e e-mail em um histórico e passa o contexto para a equipe assumir o atendimento.",
    href: "https://conexo.hawksbi.com.br",
    action: "Conhecer o Conexo",
  },
] as const;

export function Products() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => revealSection(sectionRef.current), { scope: sectionRef });

  return (
    <section ref={sectionRef} id="ferramentas" className="products-section section-light" aria-labelledby="products-title">
      <div className="section-frame products-heading">
        <div>
          <p className="eyebrow eyebrow-dark" data-reveal><span className="eyebrow-mark" />Ferramentas Hawks</p>
          <h2 id="products-title" data-reveal>Produtos para a <em>rotina real.</em></h2>
        </div>
        <p data-reveal>Criamos produtos a partir de problemas de operação. Cada ferramenta tem um propósito e um estágio de desenvolvimento próprio.</p>
      </div>
      <div className="section-frame products-grid">
        {products.map((product) => (
          <article className="product-card" key={product.name} data-reveal>
            <div className={`product-card__brand${product.symbol ? " product-card__brand--split" : ""}`} role="img" aria-label={`Logo ${product.name}`}>
              {product.symbol && <img className="product-card__symbol" src={product.symbol} alt="" loading="lazy" />}
              <img className="product-card__wordmark" src={product.wordmark} alt="" loading="lazy" />
            </div>
            <div className="product-card__meta">
              <span>{product.category}</span>
              <span>{product.status}</span>
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <a href={product.href} className="product-card__link">
              {product.action}<span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
