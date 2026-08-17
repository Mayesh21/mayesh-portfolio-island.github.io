// Analytics and performance monitoring utilities

// Performance monitoring
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Track page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      const metrics = {
        pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime,
        timestamp: Date.now()
      };
      
      if (import.meta.env.DEV) console.log('Performance Metrics:', metrics);
      
      // Send to analytics service in production
      if (import.meta.env.PROD) {
        // You can integrate with Google Analytics, Mixpanel, etc.
        // gtag('event', 'performance', metrics);
      }
    });
  }
};

// User interaction tracking
export const trackEvent = (eventName, properties = {}) => {
  const event = {
    name: eventName,
    properties,
    timestamp: Date.now(),
    url: window.location.href
  };
  
  if (import.meta.env.DEV) console.log('User Event:', event);
  
  // Send to analytics service in production
  if (import.meta.env.PROD) {
    // gtag('event', eventName, properties);
  }
};

// 3D interaction tracking
export const track3DInteraction = (interactionType, details = {}) => {
  trackEvent('3d_interaction', {
    type: interactionType,
    ...details
  });
};

// Form submission tracking
export const trackFormSubmission = (formType, success = true, errorMessage = null) => {
  trackEvent('form_submission', {
    form_type: formType,
    success,
    error_message: errorMessage
  });
};

// Page view tracking
export const trackPageView = (pageName) => {
  trackEvent('page_view', {
    page_name: pageName
  });
};

// Error tracking
export const trackError = (error, context = {}) => {
  const errorEvent = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: Date.now(),
    url: window.location.href
  };
  
  if (import.meta.env.DEV) console.error('Error Tracked:', errorEvent);
  
  // Send to error tracking service in production
  if (import.meta.env.PROD) {
    // Sentry.captureException(error, { extra: context });
  }
};

// Initialize analytics
export const initializeAnalytics = () => {
  trackPerformance();
  
  // Track initial page view
  trackPageView('home');
  
  // Track 3D model loading
  trackEvent('3d_models_loaded', {
    models: ['island', 'sky', 'bird', 'plane', 'fox']
  });
};

// Performance monitoring for 3D rendering
// Returns a cleanup function to stop the RAF loop
let fpsRafId = null;

export const track3DPerformance = () => {
  // Prevent multiple loops
  if (fpsRafId !== null) return;

  if (typeof window !== 'undefined') {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

        if (fps < 30) {
          trackEvent('low_fps_warning', { fps });
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      fpsRafId = requestAnimationFrame(measureFPS);
    };

    fpsRafId = requestAnimationFrame(measureFPS);
  }
};

export const stopTrack3DPerformance = () => {
  if (fpsRafId !== null) {
    cancelAnimationFrame(fpsRafId);
    fpsRafId = null;
  }
}; 