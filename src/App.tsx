import Header from './components/Header';
import SideNav from './components/SideNav';
import Logo from './components/Logo';
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
      <footer className="border-t border-line bg-ink px-4 py-12 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <Logo className="h-16 w-16" />
          <p className="text-sm text-mute">© {new Date().getFullYear()} Agencia A1 · auno.cl · Branding y comunicación digital</p>
        </div>
      </footer>
    </>
  );
}
