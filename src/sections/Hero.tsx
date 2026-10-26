import { useEffect, useRef, useState } from 'react';
import StrokeText from '../components/reactbits/StrokeText';
import { projects } from '../data/projects';
import { scrollToId } from '../hooks/useScrollSpy';

/** Responsive StrokeText font size (the SVG scales to its container, this sets stroke detail + height). */
function useHeadlineSize() {
  const get = () => (typeof window === 'undefined' ? 128 : window.innerWidth < 640 ? 64 : window.innerWidth < 1024 ? 96 : 128);
  const [size, setSize] = useState(get);
  useEffect(() => {
    const onResize = () => setSize(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}

export default function Hero() {
  const size = useHeadlineSize();
  const rootRef = useRef<HTMLElement>(null);

  // Lightweight parallax: one rAF-throttled scroll listener writing a CSS var
  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => el.style.setProperty('--p', String(Math.min(window.scrollY / window.innerHeight, 1.2))));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const strip = projects.map(p => p.images[0]);

  return (
    <section ref={rootRef} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-[72px]" aria-label="Inicio">
      {/* Background: grid lines + yellow slab + giant outlined A1 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px)] [background-size:calc(100%/6)_100%]" />
        <div
          className="absolute -right-[10%] top-[8%] hidden h-[70%] w-[46%] bg-sun md:block"
          style={{
            clipPath: 'polygon(28% 0, 100% 0, 100% 100%, 0 100%)',
            transform: 'translate3d(0, calc(var(--p, 0) * 120px), 0)',
            animation: 'slab-in 1.4s var(--ease-out-expo) 0.5s both',
          }}
        />
        <svg
          viewBox="0 0 400 300"
          className="absolute -right-[4%] top-[10%] hidden h-[75%] w-auto md:block"
          style={{ transform: 'translate3d(0, calc(var(--p, 0) * -80px), 0)' }}
        >
          <text x="0" y="250" fontSize="300" fontWeight="900" fill="none" stroke="#1b1b1e" strokeWidth="2" fontFamily="Raleway" letterSpacing="-20">A1</text>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/0" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-10">
        <div className="max-w-[1100px]">
          <p className="eyebrow mb-8" style={{ animation: 'rise 0.9s var(--ease-out-expo) 0.9s both' }}>
            <b>A1</b> Agencia de branding · Chile
          </p>
          <h1 className="sr-only">Ideas pensadas para crecer</h1>
          <div aria-hidden="true" className="hero-stroke">
            <StrokeText text="Ideas pensadas" strokeColor="#EEC42F" fillColor="#FFFFFF" strokeWidth={1.4}
              drawDuration={1.6} fillDelay={0.2} stagger={0.05} ease="power2.out" trigger="mount" fillMode="wipe"
              fontSize={size} fontWeight={800} letterSpacing={-2} style={{ textAlign: 'left' }} />
            <StrokeText text="para crecer." strokeColor="#EEC42F" fillColor="#EEC42F" strokeWidth={1.4}
              drawDuration={1.6} fillDelay={0.35} stagger={0.05} ease="power2.out" trigger="mount" fillMode="wipe"
              fontSize={size} fontWeight={800} letterSpacing={-2} />
          </div>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:gap-16" style={{ animation: 'rise 1s var(--ease-out-expo) 1.6s both' }}>
            <p className="max-w-[520px] text-lg leading-relaxed text-white/80 md:text-xl">
              Construimos marcas como <strong className="font-bold text-white">sistemas vivos</strong>: estrategia, diseño, contenido y
              comunicación digital trabajando juntos. Hace 11 años.
            </p>
            <a href="#portfolio" onClick={e => { e.preventDefault(); scrollToId('portfolio'); }} className="btn-sun self-start md:self-auto">
              Ver proyectos <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Work strip — a teaser of the portfolio sliding under the fold */}
      <div aria-hidden="true" className="relative z-10 mt-12 overflow-hidden border-t border-line" style={{ animation: 'rise 1.2s var(--ease-out-expo) 1.9s both' }}>
        <div className="flex w-max" style={{ animation: 'marquee 60s linear infinite' }}>
          {[...strip, ...strip].map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" decoding="async"
              className="h-24 w-40 border-r border-line object-cover opacity-50 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 md:h-32 md:w-56" />
          ))}
        </div>
      </div>

      <div className="absolute bottom-40 left-4 z-10 hidden items-center gap-3 text-[0.7rem] font-bold tracking-[0.3em] text-mute uppercase md:left-10 md:flex">
        <span className="block h-10 w-px origin-top bg-sun" style={{ animation: 'scroll-cue 2s ease-in-out infinite' }} /> Scroll
      </div>

      {/* Opening curtains */}
      <div aria-hidden="true" className="curtain-top pointer-events-none fixed inset-x-0 top-0 z-[60] h-1/2 bg-sun" />
      <div aria-hidden="true" className="curtain-bottom pointer-events-none fixed inset-x-0 bottom-0 z-[60] h-1/2 bg-ink-2" />
    </section>
  );
}
