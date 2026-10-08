import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { resolvePage } from "./routes";

async function start() {
  const root = document.getElementById("root")!;
  const path = window.location.pathname;
  const content = await resolvePage(path);
  const app = <StrictMode><App path={path}>{content}</App></StrictMode>;
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
void start();
