import { useEffect, useState } from 'react';
import { STATS } from '../data/site';
import { useInView } from '../hooks/useInView';

/** Counts from 0 → value with an expo ease once `start` flips true. */
function Counter({ value, start }: { value: number; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now();
    const dur = reduce ? 1 : 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(2, -10 * p))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);
  return <>{n}</>;
}

export default function Stats() {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <section
      ref={ref}
      id="estadisticas"
      aria-labelledby="stats-title"
      className="relative overflow-hidden bg-ink-2 px-4 py-28 md:px-10 md:py-36 xl:pr-[300px]"
    >
      <p className="eyebrow mb-6"><b>04</b> Estadísticas</p>
      <h2 id="stats-title" className="mb-16 max-w-[640px] text-4xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
        Números que <span className="text-sun">respaldan</span> el trabajo.
      </h2>

      <dl className="relative z-10 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`group relative flex flex-col gap-10 border-r border-b border-line p-8 transition-colors duration-500 hover:bg-sun md:p-10 ${
              inView ? 'stat-in' : 'opacity-0'
            }`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <dt className="order-2 text-sm font-bold tracking-[0.16em] text-white/80 uppercase group-hover:text-ink">
              {s.label}
              <span className="mt-2 block text-xs font-medium tracking-normal text-mute normal-case group-hover:text-ink/70">{s.note}</span>
            </dt>
            <dd className="order-1 text-7xl leading-none font-black tracking-tighter text-sun tabular-nums group-hover:text-ink md:text-8xl">
              {s.value === null ? (
                // Pending real data — set the value in src/data/site.ts
                <span title="Dato pendiente" className="text-white/25 group-hover:text-ink/40">00</span>
              ) : (
                <>
                  <Counter value={s.value} start={inView} />
                  {s.suffix}
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <span aria-hidden="true" className="pointer-events-none absolute -right-6 -bottom-10 text-[22vw] leading-none font-black text-white/[0.03]">
        A1
      </span>
    </section>
  );
}
