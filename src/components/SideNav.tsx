import LineSidebar from './reactbits/LineSidebar';
import { SECTIONS } from '../data/site';
import { scrollToId } from '../hooks/useScrollSpy';

/** Desktop-only fixed section index on the right edge (React Bits LineSidebar).
 *  Fades out over the hero and while the full-width portfolio is on screen. */
export default function SideNav({ active }: { active: number | null }) {
  return (
    <div
      className={`fixed top-1/2 right-0 z-40 pr-12 hidden -translate-y-1/2 transition-opacity duration-700 xl:block ${
        active === null || SECTIONS[active]?.id === 'portfolio' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <LineSidebar
        items={SECTIONS.map(s => s.label)}
        accentColor="#EEC42F"
        textColor="#c4c4c4"
        markerColor="#6c6c6c"
        showIndex
        showMarker
        proximityRadius={100}
        maxShift={30}
        falloff="smooth"
        fontSize={0.95}
        smoothing={100}
        markerLength={40}
        itemGap={18}
        defaultActive={0}
        activeIndex={active}
        ariaLabel="Índice de secciones"
        onItemClick={i => scrollToId(SECTIONS[i].id)}
        className="a1-sidenav"
      />
    </div>
  );
}
