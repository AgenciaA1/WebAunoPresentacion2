import Logo from './Logo';
import { CONTACT, SECTIONS, SOCIALS } from '../data/site';
import { scrollToId } from '../hooks/useScrollSpy';

const heading = 'mb-6 text-xs font-bold tracking-[0.22em] text-mute uppercase';
const link = 'inline-flex min-h-[32px] items-center text-white/80 transition-colors hover:text-sun';

/** Footer: 1) logo + phrase · 2) quick links · 3) contact + social media. */
export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="grid gap-12 px-4 py-16 md:grid-cols-2 md:px-10 md:py-20 lg:grid-cols-12 xl:pr-[300px]">
        {/* 1. Logo + phrase */}
        <div className="lg:col-span-5">
          <Logo className="h-20 w-20" />
          <p className="mt-8 max-w-[380px] text-2xl leading-snug font-extrabold">
            Ideas pensadas para <span className="text-sun">crecer.</span>
          </p>
          <p className="mt-4 max-w-[380px] leading-relaxed text-mute">
            Construimos marcas como sistemas vivos: estrategia, diseño, contenido y comunicación digital.
          </p>
        </div>

        {/* 2. Quick links */}
        <nav aria-label="Links rápidos" className="lg:col-span-3">
          <h2 className={heading}>Links rápidos</h2>
          <ul className="space-y-1">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={e => { e.preventDefault(); scrollToId(s.id); }} className={`${link} group gap-3`}>
                  <span className="font-mono text-xs text-sun">{String(i + 1).padStart(2, '0')}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3. Contact + social media */}
        <div className="md:col-span-2 lg:col-span-4">
          <h2 className={heading}>Contacto</h2>
          <ul className="space-y-1">
            {CONTACT.email && <li><a href={`mailto:${CONTACT.email}`} className={`${link} text-lg font-bold text-white`}>{CONTACT.email}</a></li>}
            {CONTACT.phone && <li><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className={link}>{CONTACT.phone}</a></li>}
            {CONTACT.web && <li><a href={`https://${CONTACT.web}`} className={link}>{CONTACT.web}</a></li>}
            {CONTACT.location && <li className="pt-1 text-mute">{CONTACT.location}</li>}
          </ul>

          <h2 className={`${heading} mt-10`}>Redes sociales</h2>
          <ul className="flex flex-wrap gap-2">
            {SOCIALS.map(s => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center border border-line px-4 text-sm font-bold transition-colors hover:border-sun hover:bg-sun hover:text-ink"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-line px-4 py-6 text-sm text-mute md:flex-row md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Agencia A1 · Branding y comunicación digital</p>
        <a href="#top" className="font-bold tracking-[0.14em] uppercase hover:text-sun">Volver arriba ↑</a>
      </div>
    </footer>
  );
}
