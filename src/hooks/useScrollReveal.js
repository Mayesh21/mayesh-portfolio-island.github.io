import { useEffect, useRef, useState } from 'react';

/**
 * Intersection Observer hook for scroll-triggered reveal animations.
 * @param {Object} options
 * @param {number} options.threshold - 0-1 visibility ratio to trigger (default 0.1)
 * @param {string} options.rootMargin - margin around root (default '0px 0px -50px 0px')
 * @param {boolean} options.once - only trigger once (default true)
 */
const useScrollReveal = ({ threshold = 0.1, rootMargin = '0px 0px -50px 0px', once = true } = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if element is already in viewport (handles lazy-loaded / Suspense content)
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
};

export default useScrollReveal;
