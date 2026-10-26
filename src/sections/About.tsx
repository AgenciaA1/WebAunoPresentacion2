import type { CSSProperties } from 'react';
import { asset } from '../lib/asset';
import { useReveal } from '../hooks/useReveal';
import StrokeText from '../components/reactbits/StrokeText';

// Adapted from the Big Book 2026 manifesto
const PILLARS = [
  { n: '01', t: 'Estrategia', d: 'Entendemos el negocio antes de dibujar una línea. Posicionamiento, arquitectura de marca y propósito.' },
  { n: '02', t: 'Diseño', d: 'Identidades, packaging y sistemas gráficos que funcionan en cada punto de contacto.' },
  { n: '03', t: 'Contenido', d: 'Narrativas, calendarios editoriales y piezas que mantienen a la marca viva todos los días.' },
  { n: '04', t: 'Comunicación digital', d: 'Web, Social Media y performance para que la marca crezca donde están las personas.' },
];

const i = (n: number) => ({ '--i': n }) as CSSProperties;

export default function About() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="nosotros" aria-labelledby="nosotros-title" className="relative bg-ink px-4 py-28 md:px-10 md:py-40 xl:pr-[300px]">
      <p className="eyebrow mb-10" data-reveal><b>01</b> Sobre nosotros · Manifiesto</p>

      <h2 id="nosotros-title" className="sr-only">La marca es un sistema vivo</h2>
      <div aria-hidden="true" className="section-stroke mb-14">
        <StrokeText text="La marca es un" trigger="scroll" strokeColor="#EEC42F" fillColor="#FFFFFF" fontSize={96} fontWeight={800} letterSpacing={-2} drawDuration={1.4} />
        <StrokeText text="sistema vivo." trigger="scroll" strokeColor="#EEC42F" fillColor="#EEC42F" fontSize={96} fontWeight={800} letterSpacing={-2} drawDuration={1.4} fillDelay={0.35} />
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 text-lg leading-[1.75] text-white/80 md:text-xl lg:col-span-7">
          <p data-reveal style={i(1)}>
            Una marca no es un logo ni una campaña. Es un <span className="font-bold text-white">organismo que respira</span>: se
            alimenta de estrategia, se expresa con diseño, se mueve con contenido y crece en cada conversación digital.
          </p>
          <p data-reveal style={i(2)}>
            Desde hace <mark className="bg-transparent font-extrabold text-sun">11 años</mark> en A1 trabajamos con un objetivo:
            darle a cada marca <span className="font-bold text-white">claridad, diferenciación y posicionamiento</span>. Lo hacemos
            como una agencia <span className="font-bold text-white">remote-first</span>, con un equipo senior conectado desde
            distintos lugares y enfocado en resultados, no en oficinas.
          </p>
          <p data-reveal style={i(3)}>
            Por eso no entregamos piezas sueltas: construimos{' '}
            <span className="border-b-2 border-sun font-bold text-white">sistemas</span> que se sostienen en el tiempo y que
            cualquier equipo puede seguir haciendo crecer.
          </p>
        </div>

        <figure className="relative lg:col-span-5" data-reveal="clip">
          <img
            src={asset('/projects/salcopets/02.webp')}
            alt="Clínica veterinaria móvil SalcoPets, branding de Agencia A1"
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
          />
          <figcaption className="absolute -bottom-px -left-px bg-sun px-4 py-3 text-xs font-extrabold tracking-[0.2em] text-ink uppercase">
            Branding en movimiento — SalcoPets
          </figcaption>
        </figure>
      </div>

      <ol className="mt-24 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, n) => (
          <li
            key={p.n}
            data-reveal
            style={i(n)}
            className="group relative border-b border-line py-10 pr-6 sm:odd:border-r sm:even:pl-6 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
          >
            <span className="absolute top-0 left-0 h-[2px] w-0 bg-sun transition-all duration-500 group-hover:w-full" aria-hidden="true" />
            <span className="font-mono text-sm text-sun">{p.n}</span>
            <h3 className="mt-4 text-2xl font-extrabold">{p.t}</h3>
            <p className="mt-3 leading-relaxed text-mute">{p.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
