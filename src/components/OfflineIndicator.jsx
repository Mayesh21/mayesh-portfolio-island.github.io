import { useOffline } from '../hooks/useOffline'
import PropTypes from 'prop-types'

const OfflineIndicator = ({ className = '' }) => {
  const { isOffline, offlineQueue } = useOffline()

  if (!isOffline) {
    return null
  }

  return (
    <div className={`fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 ${className}`}>
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" 
        />
      </svg>
      <span className="text-sm font-medium">
        You&apos;re offline
        {offlineQueue.length > 0 && (
          <span className="ml-1 text-xs opacity-75">
            ({offlineQueue.length} pending)
          </span>
        )}
      </span>
    </div>
  )
}

OfflineIndicator.propTypes = {
  className: PropTypes.string
}

export default OfflineIndicator 