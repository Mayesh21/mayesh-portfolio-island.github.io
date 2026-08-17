import { useEffect } from 'react';

/**
 * Attaches a global mousemove listener that updates --mouse-x/--mouse-y
 * CSS custom properties on any .hover-glow element, enabling the
 * radial gradient glow effect to follow the cursor.
 */
const useMouseGlow = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.hover-glow');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
};

export default useMouseGlow;
