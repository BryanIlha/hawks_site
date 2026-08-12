import type { SolutionId } from "../lib/solutions";
import { conexoWordmarkReverse, vistoWordmarkReverse } from "../lib/brandAssets";

type SolutionVisualProps = {
  solution: SolutionId;
};

export function SolutionVisual({ solution }: SolutionVisualProps) {
  if (solution === "conexo") {
    return (
      <div className="solution-visual solution-visual--conexo" data-solution-visual aria-hidden="true">
        <div className="conexo-thread" data-solution-visual-frame>
          <div className="conexo-thread__head" data-solution-visual-item><img src={conexoWordmarkReverse} alt="" /><i /></div>
          <p className="conexo-message conexo-message--incoming" data-solution-visual-item>Preciso falar sobre uma entrega.</p>
          <p className="conexo-message conexo-message--signal" data-solution-visual-item>Entendi. Qual é o seu pedido?</p>
          <div className="conexo-options" data-solution-visual-item><span>Rastrear</span><span>Comercial</span><span>Suporte</span></div>
          <p className="conexo-message conexo-message--handoff" data-solution-visual-item>Contexto entregue para a equipe.</p>
        </div>
      </div>
    );
  }

  if (solution === "visto") {
    return (
      <div className="solution-visual solution-visual--visto" data-solution-visual aria-hidden="true">
        <div className="visto-board" data-solution-visual-frame>
          <div className="visto-board__brand" data-solution-visual-item>
            <span className="visto-board__brand-lockup"><img src={vistoWordmarkReverse} alt="" /></span>
            <span>checklist operacional</span>
          </div>
          <div className="visto-board__head" data-solution-visual-item><span>Rotina de abertura</span><strong>03 / 04</strong></div>
          <div className="visto-row visto-row--done" data-solution-visual-item><i>✓</i><span>Equipamento conferido</span></div>
          <div className="visto-row visto-row--done" data-solution-visual-item><i>✓</i><span>Temperatura registrada</span></div>
          <div className="visto-row visto-row--attention" data-solution-visual-item><i>!</i><span>Exceção para revisar</span></div>
          <div className="visto-row" data-solution-visual-item><i /><span>Assinatura do responsável</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="solution-visual solution-visual--agendamento" data-solution-visual aria-hidden="true">
      <div className="agenda-board" data-solution-visual-frame>
        <div className="agenda-board__head" data-solution-visual-item><span>Semana</span><strong>12—16</strong></div>
        <div className="agenda-days" data-solution-visual-item><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span></div>
        <div className="agenda-grid" data-solution-visual-item>
          <i /><i className="agenda-slot--active" /><i /><i /><i />
          <i /><i /><i className="agenda-slot--active" /><i /><i />
          <i /><i /><i /><i /><i className="agenda-slot--active" />
        </div>
        <p data-solution-visual-item>Horários claros. Confirmações no lugar certo.</p>
      </div>
    </div>
  );
}
