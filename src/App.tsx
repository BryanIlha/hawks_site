import { useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import type { ReactNode } from "react";
import { normalizePath, updateDocumentMeta } from "./lib/seo";
import "./styles.css";

export default function App({ path = "/", children }: { path?: string; children: ReactNode }) {
  const route = normalizePath(path);
  useEffect(() => {
    updateDocumentMeta(route);
    if (!window.location.hash) return;
    let cancelled = false;
    const followAnchor = () => {
      void document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          if (!cancelled) document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
        });
      });
    };
    if (document.readyState === "complete") followAnchor();
    else window.addEventListener("load", followAnchor, { once: true });
    return () => { cancelled = true; window.removeEventListener("load", followAnchor); };
  }, [route]);
  return <div className="site-shell"><Header />{children}<Footer /></div>;
}
