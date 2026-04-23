import { useEffect, useRef, useState } from 'react';

export function useInView<T extends Element = Element>(
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '-50px' }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
    // One-shot by design: options are read once at mount. Pass a stable reference if you need them to vary.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView] as const;
}
