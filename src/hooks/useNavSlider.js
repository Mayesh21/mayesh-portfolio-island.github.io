import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export const useNavSlider = () => {
  const location = useLocation()
  const sliderRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const slider = sliderRef.current
    const nav = navRef.current
    
    if (!slider || !nav) return

    // Find the active nav link
    const activeLink = nav.querySelector('.nav-link.active')
    
    // If no active link (home page) or on home page, hide the slider
    if (!activeLink || location.pathname === '/') {
      slider.style.opacity = '0'
      slider.style.width = '0'
      return
    }

    // Get positions and dimensions
    const navRect = nav.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    
    // Calculate slider position and width
    const left = linkRect.left - navRect.left
    const width = linkRect.width
    
    // Animate the slider
    slider.style.opacity = '1'
    slider.style.left = `${left}px`
    slider.style.width = `${width}px`
    
  }, [location.pathname])

  return { sliderRef, navRef }
} 