import { NavLink } from "react-router-dom"
import ThemeToggle from './ThemeToggle'
import { useNavSlider } from '../hooks/useNavSlider'

const NavBar = () => {
  const { sliderRef, navRef } = useNavSlider()
  
  return (
    <header className="header" role="banner">
      <div className="header-container">
        {/* Top Row - Logo and Theme Toggle */}
        <div className="header-top-row">
          <NavLink 
            to="/" 
            className="logo-link"
            aria-label="Go to home page"
          >
            <p className="blue-gradient_text text-sm sm:text-base">MD</p>
          </NavLink>

          {/* Theme Toggle - Desktop */}
          <div className="theme-toggle-desktop">
            <ThemeToggle size="sm" />
          </div>

          {/* Theme Toggle - Mobile */}
          <div className="theme-toggle-mobile">
            <ThemeToggle size="sm" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav 
          ref={navRef}
          className="nav-links"
          role="navigation"
          aria-label="Main navigation"
        >
          <div ref={sliderRef} className="nav-slider"></div>
          <NavLink
            to='/about'
            className={( { isActive } ) => isActive ? 'nav-link active' : 'nav-link'}
            aria-label="Go to about page"
            data-page="about"
          >
            About
          </NavLink>
          <NavLink
            to='/projects'
            className={( { isActive } ) => isActive ? 'nav-link active' : 'nav-link'}
            aria-label="Go to projects page"
            data-page="projects"
          >
            Projects
          </NavLink>
          <NavLink
            to='/contact'
            className={( { isActive } ) => isActive ? 'nav-link active' : 'nav-link'}
            aria-label="Go to contact page"
            data-page="contact"
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default NavBar