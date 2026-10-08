import type { FrontId } from "../lib/fronts";

/** The same three tiled faces, composited by CSS without starting a WebGL context. */
export function CubePreview({ front, paused }: { front: FrontId; paused: boolean }) {
  const faces = [
    { id: "dados", label: "Dados" },
    { id: "inteligencia", label: "Inteligência" },
    { id: "automacao", label: "Automação" },
  ];
  return (
    <div className={`hawks-cube cube-preview${paused ? " is-paused" : ""}`} data-front={front} role="img" aria-label="Cubo Hawks BI: dados, inteligência e automação">
      <div className="cube-preview__float" aria-hidden="true">
        <div className="cube-preview__solid">
          {faces.map((face) => (
            <div key={face.id} className={`cube-preview__face cube-preview__face--${face.id}`}>
              {Array.from({ length: 9 }, (_, index) => (
                <span key={index} className={`cube-preview__tile${index === 2 || index === 5 ? " cube-preview__tile--pulse" : ""}`}>
                  {index === 4 && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                    {face.id === "dados" ? <path d="M4 18V9m8 9V4m8 14v-6M2 21h20" /> : face.id === "inteligencia" ? <><path d="m4 17 8-10 8 10M4 17h16" /><circle cx="4" cy="17" r="2" /><circle cx="12" cy="7" r="2" /><circle cx="20" cy="17" r="2" /></> : <><path d="M6 6h11l3 3v9H8l-4-4V8Z" /><path d="m15 4 3 3-3 3M9 16l-3 3 3 3" /></>}
                  </svg>}
                  {index === 7 && <small>{face.label}</small>}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
