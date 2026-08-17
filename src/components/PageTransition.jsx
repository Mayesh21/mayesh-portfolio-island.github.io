import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('enter');
  const prevLocation = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevLocation.current) {
      setTransitionStage('exit');

      const timeout = setTimeout(() => {
        setTransitionStage('enter');
        prevLocation.current = location.pathname;
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [location.pathname]);

  return (
    <div
      className={`transition-opacity duration-200 ease-in-out ${
        transitionStage === 'exit' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
