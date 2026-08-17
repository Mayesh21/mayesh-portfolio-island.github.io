import useScrollReveal from '../hooks/useScrollReveal';
import useCountUp from '../hooks/useCountUp';

const AnimatedCounter = ({ end, duration = 1500, suffix = '', className = '' }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
  const count = useCountUp(end, duration, isVisible);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
