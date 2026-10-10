type Turnstile = { render: (element: HTMLElement, options: Record<string, unknown>) => string; reset: (id: string) => void; remove: (id: string) => void };
declare global { interface Window { turnstile?: Turnstile } }
let script: Promise<void> | undefined;
export async function loadContactChallenge() {
  const response = await fetch("/api/contact", { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("config");
  const { siteKey } = await response.json();
  if (typeof siteKey !== "string" || !siteKey) throw new Error("config");
  if (!window.turnstile) {
    script ??= new Promise<void>((resolve, reject) => {
      const element = document.createElement("script");
      element.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      element.async = true;
      element.onload = () => resolve();
      element.onerror = () => { element.remove(); script = undefined; reject(new Error("script")); };
      document.head.append(element);
    });
    await script;
  }
  if (!window.turnstile) throw new Error("script");
  return { siteKey, turnstile: window.turnstile };
}
