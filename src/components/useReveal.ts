import { useEffect, useRef, useState } from "react";

export function useReveal(threshold = 0.1, once = true) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -100px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return { ref, isVisible };
}
