import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "./BrandLogo";

const links = [
  ["Serviços", "/#servicos"],
  ["Produtos", "/produtos/"],
  ["Método", "/#metodo"],
  ["Blog", "/blog/"],
] as const;

export function Header() {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = [...document.querySelectorAll<HTMLElement>("main, .site-footer")];
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => { element.inert = true; });
    menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
      if (event.key !== "Tab") return;
      const items = menuRef.current?.querySelectorAll<HTMLElement>("a[href], button");
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const media = window.matchMedia("(min-width: 900px)");
    const resize = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", resize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      window.removeEventListener("keydown", handleKeyDown);
      media.removeEventListener("change", resize);
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-island">
        <a className="nav-brand" href="/#top" onClick={close} aria-label="HAWKS BI — início"><BrandLogo light /></a>
        <nav className="nav-links" aria-label="Navegação principal">
          {links.map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}
        </nav>
        <a className="nav-cta" href="/#contato" onClick={close}>
          <span>Entre em contato.</span><span className="arrow-capsule" aria-hidden="true">↗</span>
        </a>
        <button ref={triggerRef} type="button" className="menu-trigger" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((current) => !current)}>
          <span className="menu-trigger__label">{open ? "Fechar" : "Menu"}</span>
          <span className={`menu-trigger__icon ${open ? "is-open" : ""}`} aria-hidden="true"><i /><i /></span>
        </button>
      </div>
      {open && <>
        <button className="menu-backdrop" tabIndex={-1} aria-label="Fechar navegação" onClick={close} />
        <div ref={menuRef} id="mobile-navigation" className="mobile-menu is-open" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
          <div className="mobile-menu__heading"><span id="mobile-menu-title">Explore a Hawks</span><button type="button" onClick={close} aria-label="Fechar menu"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button></div>
          <nav aria-label="Navegação mobile">{links.map(([label, href]) => <a key={href} href={href} onClick={close}>{label}<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg></a>)}</nav>
          <div className="mobile-menu__services"><a href="/servicos/software-sob-medida/" onClick={close}>Software sob medida</a><a href="/servicos/automacao-de-processos/" onClick={close}>Automação de processos</a></div>
          <a className="mobile-menu__cta" href="/#contato" onClick={close}>Conversar com a Hawks <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg></a>
        </div>
      </>}
    </header>
  );
}
