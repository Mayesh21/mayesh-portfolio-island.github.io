import { useTheme } from '../contexts/ThemeContext'
import PropTypes from 'prop-types'

const ThemeToggle = ({ className = '', size = 'md' }) => {
  const { theme, toggleTheme, isLoaded } = useTheme()

  if (!isLoaded) {
    return (
      <div className={`w-10 h-10 bg-gray-200 rounded-lg animate-pulse ${className}`} />
    )
  }

  const sizeClasses = {
    sm: 'w-12 h-6',
    md: 'w-14 h-7',
    lg: 'w-16 h-8'
  }

  return (
    <button
      onClick={toggleTheme}
      className={`${sizeClasses[size]} relative rounded-full transition-all duration-300 flex items-center ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Track */}
      <div className={`w-full h-full rounded-full transition-all duration-300 ${
        theme === 'light' 
          ? 'bg-gradient-to-r from-blue-200 to-blue-300' 
          : 'bg-gradient-to-r from-gray-800 to-gray-900'
      }`}>
        {/* Slider Handle */}
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out transform flex items-center justify-center ${
          theme === 'light' ? 'translate-x-0' : 'translate-x-7'
        }`}>
          {theme === 'light' ? (
            // Sun icon
            <div className="w-3 h-3 text-yellow-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="absolute w-3 h-3 border border-yellow-500 rounded-full"></div>
            </div>
          ) : (
            // Moon and stars icon
            <div className="relative">
              <svg 
                className="w-3 h-3 text-gray-600" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
              {/* Stars */}
              <div className="absolute -top-1 -left-1 w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="absolute -top-0.5 -right-0.5 w-0.5 h-0.5 bg-gray-600 rounded-full"></div>
              <div className="absolute top-0.5 -left-0.5 w-0.5 h-0.5 bg-gray-600 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

ThemeToggle.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
}

export default ThemeToggle 