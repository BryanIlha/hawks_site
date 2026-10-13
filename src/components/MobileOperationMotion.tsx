import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";

// User-approved native vector composition in Hawks-Criacao-Mobile.tsrct.
// Labels remain HTML: the motion is illustrative, never a dependency for reading.
export function MobileOperationMotion({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [pausedByUser, setPausedByUser] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || !enabled) return;
    let inView = false;
    let disposed = false;
    const sync = () => {
      if (!inView || document.hidden || pausedByUser || reduced) {
        video.pause();
        return;
      }
      // Fetch the small render only when its visible motion can be used.
      if (!video.getAttribute("src")) video.src = "/assets/video/hawks-criacao-mobile.mp4";
      void video.play().then(() => {
        if (disposed || !inView || document.hidden || pausedByUser || reduced) video.pause();
        else setBlocked(false);
      }).catch(() => { if (!disposed) setBlocked(true); });
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: .25 });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [enabled, reduced, pausedByUser]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (playing) {
      setPausedByUser(true);
      video.pause();
    } else {
      setPausedByUser(false);
      if (!enabled || reduced) return;
      if (!video.getAttribute("src")) video.src = "/assets/video/hawks-criacao-mobile.mp4";
      void video.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
    }
  };

  return <figure className="mobile-operation" aria-label="Ilustração: uma ideia dá origem a software personalizado e automações conectadas">
    <video ref={ref} width="640" height="300" poster={enabled ? "/assets/video/hawks-criacao-mobile-poster.png" : undefined} muted loop playsInline preload="none" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setBlocked(true)} />
    <div className="mobile-operation__labels" aria-hidden="true"><span>Software</span><span>Automações</span></div>
    <figcaption>{!reduced && <button type="button" onClick={toggle} aria-label={playing ? "Pausar animação das conexões" : "Reproduzir animação das conexões"}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{playing ? <path d="M8 5v14M16 5v14" /> : <path d="m8 5 11 7-11 7Z" />}</svg><span>{playing ? "Pausar" : blocked ? "Reproduzir" : "Animar"}</span>
    </button>}</figcaption>
  </figure>;
}
