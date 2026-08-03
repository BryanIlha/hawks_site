import { logoWordmarkReverse } from "../lib/brandAssets";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-frame footer-layout">
        <a className="footer-brand" href="#top" aria-label="HAWKS BI — início"><span className="footer-lockup"><img src={logoWordmarkReverse} alt="HAWKS BI" width="2111" height="745" /></span></a>
        <div className="footer-services"><span>Dados</span><span>Automação</span><span>Tecnologia</span></div>
        <span className="footer-base">Gravataí · RS · © {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
