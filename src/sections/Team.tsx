import type { CSSProperties } from 'react';
import { TEAM } from '../data/site';
import { useReveal } from '../hooks/useReveal';

const initials = (name: string) =>
  name.split(' ').filter(w => /^[A-ZÁÉÍÓÚ]/.test(w) && !w.endsWith('.')).slice(0, 2).map(w => w[0]).join('');

export default function Team() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="equipo" aria-labelledby="equipo-title" className="bg-ink px-4 py-28 md:px-10 md:py-36 xl:pr-[300px]">
      <p className="eyebrow mb-6" data-reveal><b>05</b> Equipo</p>
      <h2 id="equipo-title" data-reveal className="mb-16 max-w-[760px] text-4xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
        Personas que piensan <span className="text-sun">marcas</span>, todos los días.
      </h2>

      <ul className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {TEAM.map((m, i) => (
          <li key={m.name} data-reveal style={{ '--i': i } as CSSProperties} className="group relative bg-ink">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
              {m.photo ? (
                <img src={m.photo} alt={m.name} loading="lazy" className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              ) : (
                <div aria-hidden="true" className="relative z-10 flex h-full items-end p-6">
                  <span className="text-8xl leading-none font-black tracking-tighter text-white/10 transition-colors duration-500 group-hover:text-ink">
                    {initials(m.name)}
                  </span>
                </div>
              )}
              {/* yellow wipe from bottom-left on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-0 bg-sun mix-blend-normal transition-[clip-path] duration-500 ease-[var(--ease-out-expo)] [clip-path:polygon(0_100%,0_100%,0_100%)] group-hover:[clip-path:polygon(0_0,100%_100%,0_100%)]"
                style={{ zIndex: m.photo ? 1 : 0, opacity: m.photo ? 0.85 : 1 }}
              />
              <span className="absolute top-4 right-4 z-10 font-mono text-xs text-mute group-hover:text-ink">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="border-t border-line p-6">
              <h3 className="text-xl font-extrabold">{m.name}</h3>
              <p className="mt-1 text-sm font-semibold tracking-[0.12em] text-mute uppercase transition-colors group-hover:text-sun">{m.role}</p>
            </div>
          </li>
        ))}
        {/* Hiring / CTA tile fills the grid */}
        <li className="flex flex-col justify-between bg-sun p-6 text-ink">
          <span className="font-mono text-xs">+</span>
          <p className="text-2xl leading-tight font-extrabold">Un equipo remote-first, conectado y senior.</p>
        </li>
      </ul>
    </section>
  );
}
