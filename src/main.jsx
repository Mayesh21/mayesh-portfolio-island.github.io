import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeAnalytics, track3DPerformance } from './utils/analytics';

// Initialize analytics and performance monitoring
initializeAnalytics();
track3DPerformance();

// Register the service worker for offline support. Production-only: doing
// this in dev fights Vite's own HMR/caching and causes stale-module pain.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL })
      .catch((error) => console.error('Service worker registration failed:', error));
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);