import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Proof } from "./components/Proof";
import { Services } from "./components/Services";
import { Method } from "./components/Method";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import "./styles.css";

export default function App() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <Proof />
        <Services />
        <Method />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
