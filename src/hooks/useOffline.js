import { useState, useEffect, useCallback } from 'react'

export const useOffline = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [offlineQueue, setOfflineQueue] = useState([])

  const addToOfflineQueue = useCallback((action) => {
    setOfflineQueue(prev => [...prev, { ...action, timestamp: Date.now() }])
  }, [])

  const processOfflineQueue = useCallback(async () => {
    try {
      for (const item of offlineQueue) {
        if (import.meta.env.DEV) console.log('Processing offline item:', item)
        if (item.type === 'form_submission') {
          // await submitForm(item.data)
        }
      }
      setOfflineQueue([])
    } catch (error) {
      console.error('Error processing offline queue:', error)
    }
  }, [offlineQueue])

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
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
  }, [offlineQueue, processOfflineQueue])

  const clearOfflineQueue = useCallback(() => {
    setOfflineQueue([])
  }, [])

  return {
    isOffline,
    offlineQueue,
    addToOfflineQueue,
    clearOfflineQueue
  }
}
