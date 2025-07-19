const CACHE_NAME = 'portfolio-v1'
const urlsToCache = [
  '/',
  '/about',
  '/projects',
  '/contact',
  '/src/assets/favicon.ico',
  '/src/assets/images/hero.jpg',
  '/src/assets/sakura.mp3'
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    // Handle offline form submissions
    const offlineData = await getOfflineData()
    if (offlineData.length > 0) {
      for (const data of offlineData) {
        await sendOfflineData(data)
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

async function getOfflineData() {
  // Get stored offline data
  return []
}

async function sendOfflineData(data) {
  // Send stored data when back online
  console.log('Sending offline data:', data)
} 