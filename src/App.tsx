import Header from './components/Header';
import SideNav from './components/SideNav';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Stats from './sections/Stats';
import Portfolio from './sections/Portfolio';
import Clients from './sections/Clients';
import Team from './sections/Team';
import Contact from './sections/Contact';
import { SECTIONS } from './data/site';
import { useScrollSpy } from './hooks/useScrollSpy';
import type { ComponentType } from 'react';

const IDS = SECTIONS.map(s => s.id);

/** Shared page shell. Propuesta 2 (propuesta-2.html) swaps only the portfolio section. */
export default function App({ PortfolioSection = Portfolio }: { PortfolioSection?: ComponentType }) {
  const active = useScrollSpy(IDS);
  return (
    <>
      <a href="#nosotros" className="sr-only z-[70] bg-sun px-4 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        Saltar al contenido
      </a>
      <Header active={active} />
      <SideNav active={active} />
      <main>
        <Hero />
        <About />
        <PortfolioSection />
        <Clients />
        <Stats />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
