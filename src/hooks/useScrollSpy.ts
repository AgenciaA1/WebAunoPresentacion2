import { useEffect, useState } from 'react';

/** Index of the section currently crossing the viewport's upper third, or null above the first one. */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current: number | null = null;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);
  return active;
}

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
