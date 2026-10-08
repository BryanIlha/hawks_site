import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { resolvePage } from "./routes";
export { getPageMeta, pagePaths } from "./lib/seo";
export async function render(path = "/") {
  const content = await resolvePage(path);
  return renderToString(<StrictMode><App path={path}>{content}</App></StrictMode>);
}
