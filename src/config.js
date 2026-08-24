// App configuration.
// Deployed at the domain root on Vercel, so the router basename is always '/'.
// (Vite's build `base` is handled separately in vite.config.js.)
export const config = {
  basename: '/',
  baseUrl: import.meta.env.PROD
    ? window.location.origin
    : 'http://localhost:5173'
};
