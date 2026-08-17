import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const THEME_STORAGE_KEY = 'portfolio-theme'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation()
  
  // Check if we're on the home page - memoized to prevent unnecessary re-renders
  const isHomePage = useMemo(() => {
    return location.pathname === '/' || location.pathname === ''
  }, [location.pathname])

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
    
    setIsLoaded(true)
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!isLoaded) return

    const root = document.documentElement
    
    // Force light mode on home page, use actual theme on other pages
    const effectiveTheme = isHomePage ? 'light' : theme
    
    if (effectiveTheme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
    }
    
    // Only save theme to localStorage if not on home page
    if (!isHomePage) {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    }
  }, [theme, isLoaded, isHomePage])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  const setLightTheme = useCallback(() => {
    setTheme('light')
  }, [])

  const setDarkTheme = useCallback(() => {
    setTheme('dark')
  }, [])

  const value = useMemo(() => ({
    theme,
    isLoaded,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: isHomePage ? false : theme === 'dark'
  }), [theme, isLoaded, toggleTheme, setLightTheme, setDarkTheme, isHomePage])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
} 