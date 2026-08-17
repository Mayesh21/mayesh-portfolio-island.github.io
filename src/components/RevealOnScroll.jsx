import useScrollReveal from '../hooks/useScrollReveal';

/**
 * Wrapper that animates children into view when scrolled to.
 *
 * @param {'fade-up'|'fade-down'|'fade-left'|'fade-right'|'zoom'|'flip'} animation
 * @param {number} delay - stagger delay in ms (useful for lists)
 * @param {number} duration - animation duration in ms
 * @param {string} className - additional classes
 */
const animations = {
  'fade-up':    { hidden: 'opacity-0 translate-y-8',  visible: 'opacity-100 translate-y-0' },
  'fade-down':  { hidden: 'opacity-0 -translate-y-8', visible: 'opacity-100 translate-y-0' },
  'fade-left':  { hidden: 'opacity-0 translate-x-8',  visible: 'opacity-100 translate-x-0' },
  'fade-right': { hidden: 'opacity-0 -translate-x-8', visible: 'opacity-100 translate-x-0' },
  'zoom':       { hidden: 'opacity-0 scale-90',       visible: 'opacity-100 scale-100' },
  'flip':       { hidden: 'opacity-0 rotateY-90',     visible: 'opacity-100 rotateY-0' },
};

const RevealOnScroll = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold });
  const anim = animations[animation] || animations['fade-up'];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? anim.visible : anim.hidden} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
