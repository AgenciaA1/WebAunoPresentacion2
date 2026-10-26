import type { CSSProperties } from 'react';
import { clientLogos } from '../data/projects';
import { useReveal } from '../hooks/useReveal';

export default function Clients() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="clientes" aria-labelledby="clientes-title" className="bg-ink px-4 py-28 md:px-10 md:py-36 xl:pr-[300px]">
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-6" data-reveal><b>03</b> Clientes</p>
          <h2 id="clientes-title" data-reveal className="max-w-[720px] text-4xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
            <span className="text-sun">{clientLogos.length}+</span> marcas confían en nosotros.
          </h2>
        </div>
        <p data-reveal className="max-w-[340px] text-mute">De laboratorios farmacéuticos a retail, banca, alimentos y tecnología.</p>
      </div>

      <ul className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {clientLogos.map((logo, i) => (
          <li
            key={logo.src}
            data-reveal
            style={{ '--i': i % 12 } as CSSProperties}
            className="group relative grid aspect-[3/2] place-items-center border-r border-b border-line p-6"
          >
            {/* yellow corner wedge on hover */}
            <span aria-hidden="true" className="absolute top-0 right-0 h-0 w-0 border-t-[0px] border-l-[0px] border-t-sun border-l-transparent transition-all duration-300 group-hover:border-t-[18px] group-hover:border-l-[18px]" />
            <img
              src={logo.src}
              alt={logo.name}
              loading="lazy"
              decoding="async"
              className="max-h-[46%] max-w-[70%] object-contain opacity-75 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
