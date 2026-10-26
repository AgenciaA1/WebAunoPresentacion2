import { useEffect, useState } from 'react';
import Logo from './Logo';
import { SECTIONS } from '../data/site';
import { scrollToId } from '../hooks/useScrollSpy';

interface Props {
  active: number | null;
}

export default function Header({ active }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled || open ? 'border-b border-line bg-ink/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] items-center justify-between px-4 md:px-10">
        <a href="#top" className="flex items-center gap-3 text-white" aria-label="Agencia A1 — inicio">
          <Logo className="h-11 w-11 transition-transform duration-500 hover:rotate-[-8deg]" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {SECTIONS.slice(0, 5).map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={e => { e.preventDefault(); go(s.id); }}
                  className={`relative py-2 text-[0.8rem] font-bold tracking-[0.14em] uppercase transition-colors hover:text-sun ${
                    active === i ? 'text-sun' : 'text-white/80'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            onClick={e => { e.preventDefault(); go('contacto'); }}
            className="btn-sun hidden !min-h-[44px] !px-5 !text-[0.75rem] md:inline-flex"
          >
            Hablemos
          </a>
          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen(o => !o)}
          >
            <span className={`absolute h-[2px] w-6 bg-white transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[5px]'}`} />
            <span className={`absolute h-[2px] bg-sun transition-all duration-300 ${open ? 'w-6 -rotate-45' : 'w-4 translate-x-1 translate-y-[5px]'}`} />
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-72px)] overflow-y-auto bg-ink px-4 pt-6 pb-10 lg:hidden"
      >
        <ul className="border-t border-line">
          {SECTIONS.map((s, i) => (
            <li key={s.id} className="border-b border-line">
              <a
                href={`#${s.id}`}
                onClick={e => { e.preventDefault(); go(s.id); }}
                className="group flex min-h-[64px] items-center gap-5 text-2xl font-extrabold"
              >
                <span className="w-8 font-mono text-sm text-sun">{String(i + 1).padStart(2, '0')}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
