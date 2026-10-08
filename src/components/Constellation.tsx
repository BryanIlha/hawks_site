export function Constellation() {
  return <section id="constelacao" className="constellation section-light" aria-labelledby="constellation-title">
    <div className="section-frame">
      <div className="constellation__heading"><h2 id="constellation-title">Conexões que<br /><em>revelam o todo.</em></h2><p>De pontos isolados a uma visão conectada.<br />Uma expressão visual da Hawks.</p></div>
      <figure className="constellation__film">
        <video controls playsInline preload="none" poster="/assets/video/hawks-constelacao-poster.jpg" width="1920" height="1080" aria-label="Constelação Hawks BI — vídeo sem áudio" aria-describedby="constellation-caption">
          <source src="/assets/video/hawks-constelacao.mp4" type="video/mp4" />
          Seu navegador não reproduz este vídeo. <a href="/assets/video/hawks-constelacao.mp4">Abrir o vídeo Constelação</a>.
        </video>
        <figcaption id="constellation-caption"><span>Constelação — Hawks BI</span><span>10 segundos · Sem áudio</span></figcaption>
      </figure>
      <details className="constellation__description"><summary>Descrição do vídeo</summary><p>Sobre um fundo claro, pontos pretos e laranjas se movem e se conectam, formando uma constelação. À esquerda, a frase “Dado vira visão.” acompanha a marca Hawks BI.</p></details>
    </div>
  </section>;
}
