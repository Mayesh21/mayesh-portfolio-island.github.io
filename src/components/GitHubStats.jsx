import useGitHubStats from '../hooks/useGitHubStats';
import { useTheme } from '../contexts/ThemeContext';
import { github } from '../assets/icons';

const GitHubStats = () => {
  const { isDark } = useTheme();
  const { stats, status } = useGitHubStats();

  // Fail quietly - a broken external API call shouldn't leave a visible gap
  if (status === 'error') return null;

  return (
    <div className={`mt-8 rounded-xl p-6 shadow-lg border hover-glow ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <img src={github} alt="" className={`w-5 h-5 ${isDark ? 'invert' : ''}`} />
          Live GitHub Activity
        </h3>
        {stats && (
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium hover:underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
          >
            @{stats.profileUrl?.split('/').pop()}
          </a>
        )}
      </div>

      {status === 'loading' && (
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-16 rounded-lg" />
          ))}
        </div>
      )}

      {status === 'success' && stats && (
        <>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{stats.publicRepos}</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Public Repos</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>{stats.totalStars}</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Stars Earned</p>
            </div>
            <div>
              <p className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>{stats.followers}</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Followers</p>
            </div>
          </div>

          {stats.topLanguages.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {stats.topLanguages.map((lang) => (
                <span
                  key={lang}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {lang}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GitHubStats;
