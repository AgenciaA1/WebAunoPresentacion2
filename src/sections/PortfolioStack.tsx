import { useCallback, useState, type CSSProperties } from 'react';
import { allProjects } from '../data/all-projects';
import type { Project } from '../data/projects';
import { useReveal } from '../hooks/useReveal';
import ProjectDialog from '../components/ProjectDialog';
import { track } from '../lib/track';

/**
 * Propuesta 2 — Portfolio as a scroll story: each project appears as a group of
 * three images that reveal as you scroll, up to SHOWN projects; then "Ver todos"
 * expands a card grid with every loaded project.
 */
const SHOWN = 6;
const pad = (n: number) => String(n + 1).padStart(2, '0');
const delay = (n: number) => ({ '--i': n }) as CSSProperties;

function ProjectRow({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const ref = useReveal<HTMLElement>();
  const flip = index % 2 === 1; // alternate the big image left / right
  const imgs = [0, 1, 2].map(i => project.images[i % project.images.length]);

  return (
    <article ref={ref} className="relative border-t border-line px-4 py-16 md:px-10 md:py-24" aria-labelledby={`p2-${project.slug}`}>
      <div className={`mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${flip ? 'md:flex-row-reverse md:text-right' : ''}`}>
        <div data-reveal>
          <p className="font-mono text-sm text-sun">{pad(index)} <span className="text-mute">/ {pad(allProjects.length - 1)}</span></p>
          <h3 id={`p2-${project.slug}`} className="mt-3 text-4xl leading-none font-black tracking-tight md:text-7xl">{project.title}</h3>
          <p className="mt-4 text-xs font-bold tracking-[0.2em] text-sun uppercase">{project.category}</p>
        </div>
        <div data-reveal style={delay(1)} className={`max-w-[420px] ${flip ? 'md:items-start md:text-left' : 'md:items-end'} flex flex-col gap-5`}>
          {project.summary && <p className="text-mute">{project.summary}</p>}
          <button type="button" onClick={onOpen} className="btn-sun self-start">
            Ver proyecto <span className="arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* The trio: one hero image + two stacked, angular clip reveals staggered */}
      <div className={`grid gap-2 md:h-[78vh] md:grid-cols-12 md:grid-rows-2 md:gap-3`}>
        {imgs.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={onOpen}
            aria-label={`Abrir ${project.title}`}
            data-reveal="clip"
            style={delay(i * 2)}
            className={`group relative overflow-hidden bg-ink-2 ${
              i === 0
                ? `aspect-[4/3] md:row-span-2 md:row-start-1 md:aspect-auto md:col-span-7 ${flip ? 'md:col-start-6' : ''}`
                : `aspect-[16/10] md:aspect-auto md:col-span-5 ${flip ? 'md:col-start-1' : ''} ${i === 1 ? 'md:row-start-1' : 'md:row-start-2'}`
            }`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full scale-110 object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] [.is-in_&]:scale-100"
            />
            <span aria-hidden="true" className="absolute right-0 bottom-0 h-0 w-0 border-r-0 border-b-0 border-r-transparent border-b-sun transition-all duration-300 group-hover:border-r-[28px] group-hover:border-b-[28px]" />
          </button>
        ))}
      </div>
    </article>
  );
}

function AllProjectsGrid({ onOpen }: { onOpen: (i: number) => void }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} id="todos-los-proyectos" className="px-4 pt-6 pb-10 md:px-10">
      <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {allProjects.map((p, i) => (
          <li key={p.slug} data-reveal style={delay(i % 8)} className="bg-ink">
            <button type="button" onClick={() => onOpen(i)} className="group block w-full text-left">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-2">
                <img src={p.images[0]} alt="" loading="lazy" decoding="async"
                  className="h-full w-full object-cover grayscale-[60%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                <span className="absolute top-0 left-0 bg-ink px-3 py-2 font-mono text-xs text-sun">{pad(i)}</span>
                <span className="absolute right-3 bottom-3 bg-ink/80 px-2 py-1 font-mono text-[0.7rem] text-white/80">{p.images.length} img</span>
              </div>
              <div className="relative flex min-h-[112px] items-start justify-between gap-4 border-t border-line p-5 transition-colors duration-300 group-hover:bg-sun group-hover:text-ink">
                <span>
                  <span className="block text-xl font-extrabold">{p.title}</span>
                  <span className="mt-1 block text-xs font-bold tracking-[0.14em] text-mute uppercase group-hover:text-ink/70">{p.category}</span>
                </span>
                <span aria-hidden="true" className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PortfolioStack() {
  const headRef = useReveal<HTMLDivElement>();
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => {
    setOpenIndex(i);
    track('project_open', { project: allProjects[i].slug, version: 'propuesta-2' });
  }, []);

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="relative w-full bg-ink-2 pt-28 md:pt-36">
      <div ref={headRef} className="mb-16 flex flex-col justify-between gap-8 px-4 md:flex-row md:items-end md:px-10">
        <div>
          <p className="eyebrow mb-6" data-reveal><b>02</b> Portfolio</p>
          <h2 id="portfolio-title" data-reveal className="max-w-[760px] text-4xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
            Marcas que <span className="text-sun">construimos</span> para crecer.
          </h2>
        </div>
        <p data-reveal className="max-w-[360px] text-mute">
          {allProjects.length} proyectos de branding, packaging, web y comunicación digital. Sigue bajando.
        </p>
      </div>

      {allProjects.slice(0, SHOWN).map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} onOpen={() => open(i)} />
      ))}

      {/* Limit reached → expand to every project */}
      <div className="border-t border-line px-4 py-16 md:px-10">
        <button
          type="button"
          aria-expanded={showAll}
          aria-controls="todos-los-proyectos"
          onClick={() => {
            setShowAll(s => !s);
            if (!showAll) track('projects_show_all');
          }}
          className="group flex w-full flex-col items-start justify-between gap-6 text-left md:flex-row md:items-center"
        >
          <span>
            <span className="block text-xs font-bold tracking-[0.22em] text-mute uppercase">
              {showAll ? 'Mostrando todo' : `+${allProjects.length - SHOWN} proyectos más`}
            </span>
            <span className="mt-2 block text-4xl font-black tracking-tight transition-colors group-hover:text-sun md:text-7xl">
              {showAll ? 'Ocultar proyectos' : 'Ver todos los proyectos'}
            </span>
          </span>
          <span aria-hidden="true" className={`grid h-20 w-20 shrink-0 place-items-center bg-sun text-3xl text-ink transition-transform duration-500 ${showAll ? 'rotate-45' : 'group-hover:rotate-90'}`}>+</span>
        </button>
      </div>

      {showAll && <AllProjectsGrid onOpen={open} />}

      <ProjectDialog projects={allProjects} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </section>
  );
}
