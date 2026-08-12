import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Proof } from "./components/Proof";
import { Services } from "./components/Services";
import { SolutionsCarousel } from "./components/SolutionsCarousel";
import { SolutionLanding } from "./components/SolutionLanding";
import { Method } from "./components/Method";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { getSolution } from "./lib/solutions";
import "./styles.css";

function getSolutionRoute() {
  const match = window.location.hash.match(/^#\/solucoes\/([^/]+)$/);
  return getSolution(match?.[1]);
}

export default function App() {
  const [solution, setSolution] = useState(getSolutionRoute);

  useEffect(() => {
    const syncRoute = () => setSolution(getSolutionRoute());
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  useEffect(() => {
    document.title = solution ? "HAWKS BI — " + solution.name : "HAWKS BI — Clareza para a operação.";
    const hash = window.location.hash;
    const focusTargetId = solution ? "solution-detail-title" : hash === "#solucoes" ? "solucoes" : undefined;

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(focusTargetId ?? hash.slice(1));
      target?.scrollIntoView();

      if (focusTargetId && target instanceof HTMLElement) {
        target.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [solution]);

  return (
    <div className="site-shell">
      <Header />
      <main id="conteudo">
        {solution ? (
          <SolutionLanding solution={solution} />
        ) : (
          <>
            <Hero />
            <Proof />
            <Services />
            <SolutionsCarousel />
            <Method />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
