import type { Solution } from "../lib/solutions";
import { ArrowIcon } from "./ArrowIcon";
import { SolutionVisual } from "./SolutionVisual";

type SolutionLandingProps = {
  solution: Solution;
};

export function SolutionLanding({ solution }: SolutionLandingProps) {
  const destination = solution.liveUrl ?? "#contato";
    const action = solution.liveUrl ? "Conhecer o Visto" : solution.id === "agendamento" ? "Conversar sobre o MVP" : "Falar sobre o piloto";

  return (
    <section className={"solution-detail solution-detail--" + solution.tone} aria-labelledby="solution-detail-title">
      <div className="section-frame solution-detail__hero">
        <div className="solution-detail__copy">
          <a className="solution-detail__back" href="#solucoes">← Voltar para soluções</a>
          <p>{solution.category}</p>
          <h1 id="solution-detail-title" tabIndex={-1}>{solution.headline}</h1>
          <span>{solution.detail}</span>
        </div>
        <SolutionVisual solution={solution.id} />
      </div>

      <div className="section-light solution-detail__body">
        <div className="section-frame solution-detail__body-grid">
          <p className="solution-detail__lead">{solution.description}</p>
          <div className="solution-detail__points">
            {solution.points.map((point) => <span key={point}>{point}</span>)}
          </div>
          <a className="button button-primary solution-detail__cta" href={destination}>
            <span>{action}</span>
            <span className="arrow-capsule"><ArrowIcon /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
