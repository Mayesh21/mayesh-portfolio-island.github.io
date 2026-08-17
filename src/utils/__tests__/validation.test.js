import { describe, it, expect, beforeEach } from 'vitest'
import { 
  validateEmail, 
  validateName, 
  validateMessage, 
  sanitizeInput, 
  validateForm,
  RateLimiter 
} from '../validation'

describe('Validation Functions', () => {
  describe('validateEmail', () => {
    it('should return null for valid email', () => {
      expect(validateEmail('test@example.com')).toBeNull()
      expect(validateEmail('user.name@domain.co.uk')).toBeNull()
      expect(validateEmail('test+tag@example.org')).toBeNull()
    })

    it('should return error message for invalid email', () => {
      expect(validateEmail('')).toBe('Email is required')
      expect(validateEmail('invalid-email')).toBe('Please enter a valid email address')
      expect(validateEmail('test@')).toBe('Please enter a valid email address')
      expect(validateEmail('@example.com')).toBe('Please enter a valid email address')
    })
  })

  describe('validateName', () => {
    it('should return null for valid name', () => {
      expect(validateName('John Doe')).toBeNull()
      expect(validateName('Mary-Jane')).toBeNull()
      expect(validateName("O'Connor")).toBeNull()
      expect(validateName('José María')).toBeNull()
    })

    it('should return error message for invalid name', () => {
      expect(validateName('')).toBe('Name is required')
      expect(validateName('A')).toBe('Name should be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes')
      expect(validateName('John123')).toBe('Name should be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes')
      expect(validateName('A'.repeat(51))).toBe('Name should be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes')
    })
  })

  describe('validateMessage', () => {
    it('should return null for valid message', () => {
      expect(validateMessage('This is a valid message with more than 10 characters')).toBeNull()
      expect(validateMessage('A'.repeat(10))).toBeNull()
      expect(validateMessage('A'.repeat(1000))).toBeNull()
    })

    it('should return error message for invalid message', () => {
      expect(validateMessage('')).toBe('Message is required')
      expect(validateMessage('Too short')).toBe('Message should be between 10 and 1000 characters')
      expect(validateMessage('A'.repeat(1001))).toBe('Message should be between 10 and 1000 characters')
    })
  })

  describe('sanitizeInput', () => {
    it('should remove HTML tags and trim whitespace', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script')
      expect(sanitizeInput('  <p>Hello</p>  ')).toBe('pHello/p')
      expect(sanitizeInput('Normal text')).toBe('Normal text')
    })

    it('should handle non-string inputs', () => {
      expect(sanitizeInput(123)).toBe(123)
      expect(sanitizeInput(null)).toBe(null)
      expect(sanitizeInput(undefined)).toBe(undefined)
    })
  })

  describe('validateForm', () => {
    it('should return valid for correct form data', () => {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message with more than 10 characters'
      }
      
      const result = validateForm(formData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should return errors for invalid form data', () => {
      const formData = {
        name: '',
        email: 'invalid-email',
        message: 'Short'
      }
      
      const result = validateForm(formData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('name')
      expect(result.errors).toHaveProperty('email')
      expect(result.errors).toHaveProperty('message')
    })
  })

  describe('RateLimiter', () => {
    let rateLimiter

    beforeEach(() => {
      rateLimiter = new RateLimiter()
    })

    it('should allow requests within limit', () => {
      expect(rateLimiter.isAllowed('user1')).toBe(true)
      expect(rateLimiter.isAllowed('user1')).toBe(true)
      expect(rateLimiter.isAllowed('user1')).toBe(true)
    })

    it('should block requests over limit', () => {
      rateLimiter.isAllowed('user1')
      rateLimiter.isAllowed('user1')
      rateLimiter.isAllowed('user1')
      
      expect(rateLimiter.isAllowed('user1')).toBe(false)
    })

    it('should allow requests after time window', () => {
      rateLimiter.isAllowed('user1')
      rateLimiter.isAllowed('user1')
      rateLimiter.isAllowed('user1')
      
      // Simulate time passing by manipulating the requests array
      const userRequests = rateLimiter.requests.get('user1')
      userRequests[0] = Date.now() - 70000 // 70 seconds ago
      
      expect(rateLimiter.isAllowed('user1')).toBe(true)
    })

    it('should return correct remaining time', () => {
      rateLimiter.isAllowed('user1')
      const remainingTime = rateLimiter.getRemainingTime('user1')
      expect(remainingTime).toBeGreaterThan(0)
      expect(remainingTime).toBeLessThanOrEqual(60000)
    })
  })
}) 