import { useState, useEffect, useCallback } from 'react'

const THEME_STORAGE_KEY = 'portfolio-theme'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
    return savedTheme
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme)
  const isLoaded = true

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

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

  return {
    theme,
    isLoaded,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark'
  }
}
