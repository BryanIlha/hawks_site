import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";

export function Constellation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !desktop) return;
    let visible = false;
    let disposed = false;
    const sync = () => {
      if (visible && !document.hidden && !userPaused && !reducedMotion) {
        void video.play().then(() => {
          if (disposed || !visible || document.hidden) video.pause();
        }).catch(() => { /* The play control remains available when autoplay is blocked. */ });
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.15 });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [desktop, userPaused, reducedMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      setUserPaused(true);
      video.pause();
    } else {
      setUserPaused(false);
      void video.play().catch(() => setPlaying(false));
    }
  };

  return <section id="constelacao" className="constellation section-light" aria-labelledby="constellation-title">
    <div className="constellation__content section-frame">
      <div className="constellation__heading"><h2 id="constellation-title">Conexões que<br /><em>revelam o todo.</em></h2><p>De pontos isolados a uma visão conectada.<br />Uma expressão visual da Hawks.</p></div>
      <figure className="constellation__film">
        <video ref={videoRef} controls={!desktop} loop={desktop} muted playsInline preload="none" poster="/assets/video/hawks-constelacao-poster.jpg" width="1920" height="1080" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Constelação Hawks BI — vídeo sem áudio" aria-describedby="constellation-caption">
          <source src="/assets/video/hawks-constelacao.mp4" type="video/mp4" />
          Seu navegador não reproduz este vídeo. <a href="/assets/video/hawks-constelacao.mp4">Abrir o vídeo Constelação</a>.
        </video>
        <figcaption id="constellation-caption"><span>Constelação — Hawks BI</span><span>10 segundos · Sem áudio</span></figcaption>
      </figure>
      {desktop && <button className="constellation__playback" onClick={togglePlayback} aria-label={playing ? "Pausar vídeo da constelação" : "Reproduzir vídeo da constelação"}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{playing ? <path d="M8 5v14M16 5v14" /> : <path d="m8 5 11 7-11 7Z" />}</svg>
        {playing ? "Pausar" : "Reproduzir"}
      </button>}
      <details className="constellation__description"><summary>Descrição do vídeo</summary><p>Sobre um fundo claro, pontos pretos e laranjas se movem e se conectam, formando uma constelação. À esquerda, a frase “Dado vira visão.” acompanha a marca Hawks BI.</p></details>
    </div>
  </section>;
}
