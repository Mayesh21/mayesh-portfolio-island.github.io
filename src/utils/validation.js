// Email validation regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Name validation (letters, spaces, hyphens, apostrophes, accented characters)
export const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s\-']{2,50}$/;

// Message validation (minimum 10 characters, maximum 1000)
export const MESSAGE_REGEX = /^.{10,1000}$/;

// Rate limiting configuration
export const RATE_LIMIT = {
  MAX_REQUESTS: 3,
  WINDOW_MS: 60000, // 1 minute
};

// Validation functions
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (!NAME_REGEX.test(name)) return 'Name should be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes';
  return null;
};

export const validateMessage = (message) => {
  if (!message) return 'Message is required';
  if (!MESSAGE_REGEX.test(message)) return 'Message should be between 10 and 1000 characters';
  return null;
};

// Sanitize input to prevent XSS - encode HTML entities instead of just stripping
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

// Rate limiting utility
export class RateLimiter {
  constructor() {
    this.requests = new Map();
  }

  isAllowed(identifier) {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < RATE_LIMIT.WINDOW_MS);
    
    if (validRequests.length >= RATE_LIMIT.MAX_REQUESTS) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }

  getRemainingTime(identifier) {
    const userRequests = this.requests.get(identifier) || [];
    if (userRequests.length === 0) return 0;
    
    const oldestRequest = Math.min(...userRequests);
    const elapsed = Date.now() - oldestRequest;
    return Math.max(0, RATE_LIMIT.WINDOW_MS - elapsed);
  }
}

// Form validation helper
export const validateForm = (formData) => {
  const errors = {};
  
  errors.name = validateName(formData.name);
  errors.email = validateEmail(formData.email);
  errors.message = validateMessage(formData.message);
  
  // Remove null values (no errors)
  Object.keys(errors).forEach(key => {
    if (errors[key] === null) {
      delete errors[key];
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 