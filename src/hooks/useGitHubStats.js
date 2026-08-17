import { useState, useEffect } from 'react';

const GITHUB_USERNAME = 'Mayesh21';

/**
 * Fetches live public GitHub stats (repo count, stars, top languages) for
 * the portfolio owner. Unauthenticated GitHub REST API - no token needed,
 * subject to GitHub's public rate limit (60 req/hour per IP).
 */
const useGitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API request failed');

        const user = await userRes.json();
        const repos = await reposRes.json();

        const languageCounts = {};
        let totalStars = 0;
        repos.forEach((repo) => {
          totalStars += repo.stargazers_count || 0;
          if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
          }
        });

        const topLanguages = Object.entries(languageCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name]) => name);

        if (!cancelled) {
          setStats({
            publicRepos: user.public_repos,
            followers: user.followers,
            totalStars,
            topLanguages,
            profileUrl: user.html_url,
          });
          setStatus('success');
        }
      } catch (error) {
        if (!cancelled) {
          if (import.meta.env.DEV) console.error('GitHub stats fetch failed:', error);
          setStatus('error');
        }
      }
    };

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, status };
};

export default useGitHubStats;
