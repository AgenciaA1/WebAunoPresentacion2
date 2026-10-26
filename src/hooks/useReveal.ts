import { useEffect, useRef } from 'react';

/**
 * Adds `is-in` to every `[data-reveal]` element inside the returned ref once it
 * enters the viewport. Stagger is controlled in CSS via the `--i` custom property.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    // IntersectionObserver honours clip-path, so a fully clipped `data-reveal="clip"`
    // element never intersects. Observe its parent instead and reveal it from there.
    const groups = new Map<Element, HTMLElement[]>();
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
      const watched = el.dataset.reveal === 'clip' && el.parentElement ? el.parentElement : el;
      groups.set(watched, [...(groups.get(watched) ?? []), el]);
    });
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          groups.get(e.target)?.forEach(el => el.classList.add('is-in'));
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );
    groups.forEach((_, watched) => io.observe(watched));
    return () => io.disconnect();
  }, []);
  return ref;
}
