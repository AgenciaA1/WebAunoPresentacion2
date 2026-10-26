import { useEffect, useRef } from 'react';
import type { Project } from '../data/projects';

interface Props {
  projects: Project[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Full-screen case-study view built on native <dialog> (focus trap + Esc for free). */
export default function ProjectDialog({ projects, index, onClose, onNavigate }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const project = index === null ? null : projects[index];

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) {
      d.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!project && d.open) {
      d.close();
    }
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project]);

  if (!project || index === null) {
    return <dialog ref={ref} className="project-dialog" onClose={() => { document.body.style.overflow = ''; onClose(); }} />;
  }

  const next = (index + 1) % projects.length;
  const prev = (index - 1 + projects.length) % projects.length;
  const [hero, ...rest] = project.images;

  return (
    <dialog
      ref={ref}
      className="project-dialog m-0 h-[100dvh] max-h-none w-full max-w-none bg-ink p-0 text-white"
      aria-labelledby="project-title"
      onClose={() => {
        document.body.style.overflow = '';
        onClose();
      }}
    >
      <div ref={scrollRef} className="h-full overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex h-[72px] items-center justify-between border-b border-line bg-ink/95 px-4 backdrop-blur md:px-10">
          <p className="font-mono text-sm text-mute">
            <span className="text-sun">{String(index + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')}
          </p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => onNavigate(prev)} className="grid h-11 w-11 place-items-center border border-line hover:border-sun hover:text-sun" aria-label="Proyecto anterior">←</button>
            <button type="button" onClick={() => onNavigate(next)} className="grid h-11 w-11 place-items-center border border-line hover:border-sun hover:text-sun" aria-label="Proyecto siguiente">→</button>
            <button type="button" onClick={() => ref.current?.close()} className="ml-2 flex h-11 items-center gap-2 bg-sun px-4 text-sm font-extrabold tracking-widest text-ink uppercase" aria-label="Cerrar proyecto">
              Cerrar <span aria-hidden="true">✕</span>
            </button>
          </div>
        </div>

        <article key={project.slug}>
          <header className="px-4 pt-14 pb-10 md:px-10 md:pt-20">
            <p className="mb-4 text-xs font-bold tracking-[0.22em] text-sun uppercase">{project.category}</p>
            <h2 id="project-title" className="text-5xl leading-[0.95] font-black tracking-tight md:text-8xl">{project.title}</h2>
            <p className="mt-6 max-w-[720px] text-xl leading-relaxed text-white/80 md:text-2xl">{project.summary}</p>
          </header>

          <img src={hero} alt={`${project.title} — imagen principal`} className="max-h-[85vh] w-full bg-ink-2 object-cover" />

          <div className="grid gap-12 px-4 py-16 md:px-10 lg:grid-cols-12">
            <dl className="space-y-8 border-t-2 border-sun pt-6 lg:col-span-4">
              {project.client && (<div>
                <dt className="text-xs font-bold tracking-[0.2em] text-mute uppercase">Cliente</dt>
                <dd className="mt-2 text-lg font-bold">{project.client}</dd>
              </div>)}
              {project.services.length > 0 && (<div>
                <dt className="text-xs font-bold tracking-[0.2em] text-mute uppercase">Servicios</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.services.map(s => (
                    <span key={s} className="border border-line px-3 py-1.5 text-sm">{s}</span>
                  ))}
                </dd>
              </div>)}
              {project.result && (<div>
                <dt className="text-xs font-bold tracking-[0.2em] text-mute uppercase">Resultado</dt>
                <dd className="mt-2 text-lg leading-relaxed font-semibold text-sun">{project.result}</dd>
              </div>)}
            </dl>
            <div className="space-y-6 text-lg leading-[1.8] text-white/80 lg:col-span-7 lg:col-start-6">
              {project.body.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>

          {rest.length > 0 && (
            <div className="grid gap-2 px-2 md:grid-cols-2 md:px-10 md:gap-4">
              {rest.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} — imagen ${i + 2}`}
                  loading="lazy"
                  decoding="async"
                  className={`w-full bg-ink-2 object-cover ${rest.length % 2 === 1 && i === 0 ? 'md:col-span-2' : 'aspect-[4/3]'}`}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => onNavigate(next)}
            className="group mt-20 flex w-full items-center justify-between border-t border-line px-4 py-14 text-left transition-colors hover:bg-sun hover:text-ink md:px-10"
          >
            <span>
              <span className="block text-xs font-bold tracking-[0.22em] text-mute uppercase group-hover:text-ink/70">Siguiente proyecto</span>
              <span className="mt-2 block text-4xl font-black md:text-6xl">{projects[next].title}</span>
            </span>
            <span aria-hidden="true" className="text-5xl transition-transform duration-500 group-hover:translate-x-3">→</span>
          </button>
        </article>
      </div>
    </dialog>
  );
}
