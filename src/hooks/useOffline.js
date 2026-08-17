import { useState, useEffect } from 'react'

export const useOffline = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [offlineQueue, setOfflineQueue] = useState([])

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      // Process offline queue when back online
      if (offlineQueue.length > 0) {
        processOfflineQueue()
      }
    }

    const handleOffline = () => {
      setIsOffline(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [offlineQueue])

  const addToOfflineQueue = (action) => {
    setOfflineQueue(prev => [...prev, { ...action, timestamp: Date.now() }])
  }

  const processOfflineQueue = async () => {
    try {
      for (const item of offlineQueue) {
        // Process each queued action
        if (import.meta.env.DEV) console.log('Processing offline item:', item)
        
        // Example: Process form submissions
        if (item.type === 'form_submission') {
          // Retry form submission
          // await submitForm(item.data)
        }
      }
      
      // Clear queue after processing
      setOfflineQueue([])
    } catch (error) {
      console.error('Error processing offline queue:', error)
    }
  }

  const clearOfflineQueue = () => {
    setOfflineQueue([])
  }

  return {
    isOffline,
    offlineQueue,
    addToOfflineQueue,
    clearOfflineQueue
  }
} 