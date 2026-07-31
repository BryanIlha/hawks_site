import { logoLockup } from "../lib/brandAssets";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-frame footer-layout">
        <a className="footer-brand" href="#top" aria-label="HAWKS BI — início"><span className="footer-lockup"><img src={logoLockup} alt="HAWKS BI" /></span></a>
        <div className="footer-services"><span>Inteligência de dados</span><span>Software sob medida</span><span>Automação</span></div>
        <span className="footer-base">São Paulo · Brasil · © {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
