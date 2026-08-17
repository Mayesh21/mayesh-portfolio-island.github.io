import { Link } from 'react-router-dom';
import CTA from '../components/CTA';
import RevealOnScroll from '../components/RevealOnScroll';
import { useTheme } from '../contexts/ThemeContext';

const NotFound = () => {
  const { isDark } = useTheme();

  return (
    <section className="max-container">
      <RevealOnScroll animation="fade-up">
        <h1 className="head-text">
          4<span className="gradient-animate font-semibold drop-shadow">0</span>4
        </h1>
      </RevealOnScroll>
      <RevealOnScroll animation="fade-up" delay={100}>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            This page doesn&apos;t exist - the link might be broken, or the page may have moved.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll animation="fade-up" delay={200}>
        <div className="mt-6">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </RevealOnScroll>

      <div className="py-16">
        <CTA />
      </div>
    </section>
  );
};

export default NotFound;
