import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

const Alert = ( { type, text, onClose } ) => {
  const [isVisible, setIsVisible] = useState(false);

  // Slide in on mount
  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade-out animation before actually removing
      setTimeout(onClose, 500);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) setTimeout(onClose, 500);
  };

  return createPortal(
    <div
      className={`fixed top-6 left-0 right-0 flex justify-center items-center z-[100] pointer-events-none transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
      }`}
    >
        <div
          className={`${type==='danger' ? 'bg-red-800' : 'bg-blue-800'} pointer-events-auto px-4 py-2 text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex items-center shadow-lg gap-2`}
          role='alert'
          aria-live='assertive'
        >
            <p className={`${type==='danger' ? 'bg-red-500' : 'bg-blue-500'} flex rounded-full uppercase px-2 py-1 font-semibold text-sm`}>{type === 'danger' ? 'Failed' : 'Success'}</p>
            <p className='font-semibold text-left text-sm sm:text-base'>{text}</p>
            <button
              onClick={handleClose}
              className='ml-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors shrink-0'
              aria-label='Close alert'
            >
              <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
        </div>
    </div>,
    document.body
  )
}

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'danger', 'warning', 'info']).isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default Alert
