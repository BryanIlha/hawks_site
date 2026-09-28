import { readFile, writeFile } from "node:fs/promises";
import { render } from "../.ssr/entry-server.js";

const indexPath = new URL("../dist/index.html", import.meta.url);
const html = await readFile(indexPath, "utf8");
const root = '<div id="root"></div>';

if (!html.includes(root)) {
  throw new Error("O ponto de montagem do React não foi encontrado no HTML gerado.");
}

await writeFile(indexPath, html.replace(root, `<div id="root">${render()}</div>`));
