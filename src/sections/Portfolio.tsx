import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { projects } from '../data/projects';
import { useInView } from '../hooks/useInView';
import { useReveal } from '../hooks/useReveal';
import ProjectDialog from '../components/ProjectDialog';
import { track } from '../lib/track';

// WebGL carousel is code-split and only mounted once the section is near the viewport
const FlexCarousel = lazy(() => import('../components/reactbits/FlexCarousel'));

const MAX_PROJECTS = 12;

export default function Portfolio() {
  const list = projects.slice(0, MAX_PROJECTS);
  const [nearRef, near] = useInView<HTMLDivElement>('400px 0px 400px 0px');
  const revealRef = useReveal<HTMLElement>();
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const items = useMemo(
    () => list.map(p => ({ src: p.images[0], alt: `${p.title} — ${p.category}`, title: p.title, subtitle: p.category })),
    [list],
  );

  const open = useCallback((i: number) => {
    setOpenIndex(i);
    track('project_open', { project: list[i].slug });
  }, [list]);

  return (
    <section ref={revealRef} id="portfolio" aria-labelledby="portfolio-title" className="relative w-full bg-ink-2 py-28 md:py-36">
      <div className="mb-12 flex flex-col justify-between gap-8 px-4 md:flex-row md:items-end md:px-10">
        <div>
          <p className="eyebrow mb-6" data-reveal><b>02</b> Portfolio</p>
          <h2 id="portfolio-title" data-reveal className="max-w-[760px] text-4xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
            Marcas que <span className="text-sun">construimos</span> para crecer.
          </h2>
        </div>
        <p data-reveal className="max-w-[360px] text-mute">
          Arrastra para explorar. Haz clic en un proyecto para ver el caso completo.
        </p>
      </div>

      {/* Full-bleed carousel stage */}
      <div ref={nearRef} className="a1-carousel relative h-[72svh] min-h-[420px] w-full md:h-[86svh] md:min-h-[560px]">
        {near && (
          <Suspense fallback={<div className="grid h-full place-items-center text-mute">Cargando proyectos…</div>}>
            <FlexCarousel
              items={items}
              preset="liquid"
              intro="rise"
              cardHeight={mobile ? 0.62 : 0.5}
              gap={mobile ? 8 : 12}
              radius={0}
              focusOnClick={false}
              captions
              onChange={i => setActive(i)}
              onSelect={i => open(i)}
            />
          </Suspense>
        )}
        {/* angular frame corners */}
        <span aria-hidden="true" className="pointer-events-none absolute top-0 left-4 h-6 w-6 border-t-2 border-l-2 border-sun md:left-10" />
        <span aria-hidden="true" className="pointer-events-none absolute right-4 bottom-0 h-6 w-6 border-r-2 border-b-2 border-sun md:right-10" />
      </div>

      {/* Project index — synced with the carousel; accessible path to each case */}
      <ol className="mt-12 grid grid-cols-2 border-t border-line sm:grid-cols-3 lg:grid-cols-6" aria-label="Lista de proyectos">
        {list.map((p, i) => (
          <li key={p.slug} className="border-r border-b border-line">
            <button
              type="button"
              onClick={() => open(i)}
              className={`group flex min-h-[72px] w-full items-center gap-3 px-4 py-4 text-left transition-colors duration-300 md:px-6 ${
                active === i ? 'bg-sun text-ink' : 'hover:bg-ink-3'
              }`}
              aria-current={active === i ? 'true' : undefined}
            >
              <span className={`font-mono text-xs ${active === i ? 'text-ink' : 'text-sun'}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm font-bold">{p.title}</span>
              <span aria-hidden="true" className="ml-auto opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
            </button>
          </li>
        ))}
      </ol>

      <ProjectDialog
        projects={list}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
