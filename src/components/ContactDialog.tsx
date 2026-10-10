import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { loadContactChallenge } from "../lib/contactChallenge";
import "./contact-products.css";

const ContactContext = createContext<(topic?: string) => void>(() => {});
export const useContact = () => useContext(ContactContext);
export const CONTACT_EMAIL = "comercial@hawksbi.com.br";
const topics = ["Software sob medida", "Automação", "Visto", "Agendo", "Outro assunto"];
type Fields = { name: string; email: string; topic: string; message: string; website: string };
type Errors = Partial<Record<keyof Fields, string>>;
const initial: Fields = { name: "", email: "", topic: "", message: "", website: "" };

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [failure, setFailure] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const busy = useRef(false);
  const challengeElement = useRef<HTMLDivElement>(null);
  const challengeWidget = useRef<string | null>(null);
  const token = useRef("");
  const [challengeState, setChallengeState] = useState<"loading" | "ready" | "error">("loading");
  const [challengeAttempt, setChallengeAttempt] = useState(0);
  const submissionId = useRef("");
  const openContact = useCallback((topic?: string) => {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (topic && topics.includes(topic)) setFields(previous => ({ ...previous, topic }));
    setMounted(true);
    setOpen(true);
  }, []);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!mounted || !dialog.current) return;
    if (!open) {
      dialog.current.close();
      returnFocus.current?.focus({ preventScroll: true });
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current.showModal();
    dialog.current.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open, mounted]);

  useEffect(() => {
    if (!open || state === "success" || !challengeElement.current) return;
    let cancelled = false;
    setChallengeState("loading");
    void loadContactChallenge().then(({ siteKey, turnstile }) => {
      if (cancelled || !challengeElement.current) return;
      challengeWidget.current = turnstile.render(challengeElement.current, {
        sitekey: siteKey, action: "contact", theme: "light", size: "flexible", appearance: "interaction-only",
        callback: (value: string) => { token.current = value; setChallengeState("ready"); },
        "expired-callback": () => { token.current = ""; setChallengeState("loading"); if (challengeWidget.current) turnstile.reset(challengeWidget.current); },
        "error-callback": () => { token.current = ""; setChallengeState("error"); },
      });
    }).catch(() => { if (!cancelled) setChallengeState("error"); });
    return () => { cancelled = true; token.current = ""; if (challengeWidget.current) window.turnstile?.remove(challengeWidget.current); challengeWidget.current = null; };
  }, [open, challengeAttempt, state === "success"]);

  useEffect(() => {
    const followContact = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin === window.location.origin && destination.pathname === "/" && destination.hash === "#contato") { event.preventDefault(); openContact(); }
    };
    document.addEventListener("click", followContact);
    return () => document.removeEventListener("click", followContact);
  }, [openContact]);

  const change = (key: keyof Fields, value: string) => {
    setFields(previous => ({ ...previous, [key]: value }));
    setErrors(previous => ({ ...previous, [key]: undefined }));
    submissionId.current = "";
    if (state === "error") setState("idle");
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy.current) return;
    const nextErrors: Errors = {};
    if (fields.name.trim().length < 2) nextErrors.name = "Digite seu nome para sabermos com quem conversar.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) nextErrors.email = "Confira o e-mail. Por exemplo: nome@empresa.com.br.";
    if (fields.message.trim().length < 10) nextErrors.message = "Conte um pouco mais sobre o que você precisa (ao menos 10 caracteres).";
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) { dialog.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }
    if (!token.current && challengeState === "error") { dialog.current?.querySelector<HTMLButtonElement>(".contact-verification button")?.focus(); return; }
    if (!token.current) { setFailure("A verificação de segurança ainda não terminou. Aguarde ou tente carregá-la novamente."); setState("error"); return; }
    busy.current = true;
    setState("sending");
    submissionId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, submissionId: submissionId.current, token: token.current }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        throw new Error(response.status === 429 ? "Você enviou mensagens há pouco. Aguarde alguns minutos e tente novamente." : "Não conseguimos enviar agora. Seu texto está aqui; tente novamente ou ligue para (51) 99561-4866.");
      }
      setState("success");
    } catch (error) {
      setFailure(error instanceof Error && error.name === "Error" ? error.message : "O envio demorou mais que o esperado. Tente novamente; seu texto foi preservado.");
      setState("error");
    } finally { busy.current = false; token.current = ""; if (challengeWidget.current) window.turnstile?.reset(challengeWidget.current); }
  };

  return <ContactContext.Provider value={openContact}>{children}{mounted && createPortal(
    <dialog ref={dialog} className="contact-dialog" aria-labelledby="contact-dialog-title" aria-describedby={state === "success" ? "contact-success" : "contact-dialog-intro"} onKeyDown={event => {
      if (event.key !== "Tab") return;
      const items = [...(dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled):not([tabindex="-1"]), select:not(:disabled), textarea:not(:disabled), a[href]') ?? [])].filter(element => element.offsetParent !== null);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement?.id === "contact-dialog-title")) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="contact-dialog__body">
        <button type="button" className="contact-dialog__close" onClick={close} aria-label="Fechar formulário"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button>
        <h2 id="contact-dialog-title" tabIndex={-1}>{state === "success" ? <>Vamos conversar.</> : <>Conte sua <em>ideia.</em></>}</h2>
        {state === "success" ? <div className="contact-success" role="status"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="24" cy="24" r="22" /><path d="m14 24 7 7 14-15" /></svg><p id="contact-success">Sua mensagem foi enviada à Hawks. Vamos responder pelo e-mail que você informou.</p><button type="button" className="contact-submit" onClick={() => { setFields(initial); setState("idle"); submissionId.current = ""; close(); }}>Voltar ao site<ContactArrow /></button></div> : <>
          <p id="contact-dialog-intro">O que você quer criar ou melhorar no seu negócio?</p>
          <form onSubmit={submit} noValidate aria-busy={state === "sending"}>
            <div className="contact-field"><label htmlFor="contact-name">Seu nome</label><input id="contact-name" name="name" autoComplete="name" value={fields.name} onChange={e => change("name", e.target.value)} maxLength={100} required disabled={state === "sending"} aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} />{errors.name && <span className="field-error" id="contact-name-error">{errors.name}</span>}</div>
            <div className="contact-field"><label htmlFor="contact-email">E-mail para resposta</label><input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" value={fields.email} onChange={e => change("email", e.target.value)} maxLength={254} required disabled={state === "sending"} aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} />{errors.email && <span className="field-error" id="contact-email-error">{errors.email}</span>}</div>
            <div className="contact-field"><label htmlFor="contact-topic">Assunto <span>opcional</span></label><select id="contact-topic" name="topic" value={fields.topic} onChange={e => change("topic", e.target.value)} disabled={state === "sending"}><option value="">Ainda estou definindo</option>{topics.map(topic => <option key={topic}>{topic}</option>)}</select></div>
            <div className="contact-field"><label htmlFor="contact-message">O que você precisa?</label><textarea id="contact-message" name="message" rows={4} placeholder="Conte a ideia ou a parte do trabalho que você quer melhorar." value={fields.message} onChange={e => change("message", e.target.value)} minLength={10} maxLength={4000} required disabled={state === "sending"} aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined} />{errors.message && <span className="field-error" id="contact-message-error">{errors.message}</span>}</div>
            <div className="contact-trap" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={e => change("website", e.target.value)} /></div>
            <div ref={challengeElement} className="contact-challenge" />
            {challengeState === "error" && <p className="contact-verification" role="status">Não foi possível carregar a verificação. <button type="button" onClick={() => setChallengeAttempt(value => value + 1)}>Tentar novamente</button></p>}
            {state === "error" && challengeState !== "error" && <p className="contact-error" role="alert">{failure}</p>}
            <button type="submit" className="contact-submit" disabled={state === "sending"}>{state === "sending" ? "Enviando mensagem…" : "Enviar mensagem"}<ContactArrow /></button>
            <p className="contact-privacy">Usaremos seu e-mail para responder a este contato.</p>
          </form>
        </>}
      </div>
    </dialog>, document.body)}</ContactContext.Provider>;
}

export function ContactArrow() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>; }
