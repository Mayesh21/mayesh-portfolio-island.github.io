// Dynamic configuration for GitHub Pages deployment
const getRepoName = () => {
  // Check if we're in production and on GitHub Pages
  if (import.meta.env.PROD) {
    // Extract repo name from current URL
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      return `/${segments[0]}/`;
    }
  }
  return '/';
};

export const config = {
  basename: getRepoName(),
  baseUrl: import.meta.env.PROD 
    ? window.location.origin + getRepoName()
    : 'http://localhost:5173'
}; 