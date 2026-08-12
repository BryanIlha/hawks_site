import { useEffect, useRef, useState } from "react";
import { logoWordmark } from "../lib/brandAssets";
import { gsap, useGSAP } from "../lib/gsap";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";
import { ArrowIcon } from "./ArrowIcon";

const links = [
  ["Serviços", "#servicos"],
  ["Soluções", "#solucoes"],
  ["Método", "#metodo"],
  ["Contato", "#contato"],
] as const;

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);
  const [open, setOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const close = () => setOpen(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => firstLinkRef.current?.focus());
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      triggerRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useGSAP(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-menu-item]", menu);
    if (reducedMotion) {
      gsap.set(menu, { autoAlpha: open ? 1 : 0, y: 0 });
      gsap.set(items, { autoAlpha: open ? 1 : 0, y: 0 });
      return;
    }

    if (!open) {
      gsap.set([menu, ...items], { autoAlpha: 0, y: -14 });
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .fromTo(menu, { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.42 })
      .fromTo(items, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.46, stagger: 0.07 }, "<0.12");

    return () => timeline.kill();
  }, { scope: headerRef, dependencies: [open, reducedMotion], revertOnUpdate: true });

  return (
    <header ref={headerRef} className="site-header">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="nav-island">
        <a className="nav-brand" href="#top" onClick={close} aria-label="HAWKS BI — início">
          <img src={logoWordmark} alt="HAWKS BI" width="2111" height="745" />
        </a>

        <nav className="nav-links" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={close}>
              {label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#contato" onClick={close}>
          <span>Falar sobre a operação.</span>
          <span className="arrow-capsule"><ArrowIcon /></span>
        </a>

        <button
          ref={triggerRef}
          type="button"
          className="menu-trigger"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="menu-trigger__label">{open ? "Fechar" : "Menu"}</span>
          <span className={`menu-trigger__icon ${open ? "is-open" : ""}`} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <div
        ref={menuRef}
        id="mobile-navigation"
        className={`mobile-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Navegação mobile">
          {links.map(([label, href], index) => (
            <a
              key={href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={href}
              onClick={close}
              data-menu-item
              tabIndex={open ? 0 : -1}
            >
              <span>0{index + 1}</span>
              {label}
            </a>
          ))}
        </nav>
        <a className="mobile-menu__cta" href="#contato" onClick={close} data-menu-item tabIndex={open ? 0 : -1}>
          Falar sobre a operação. <ArrowIcon />
        </a>
      </div>
    </header>
  );
}
