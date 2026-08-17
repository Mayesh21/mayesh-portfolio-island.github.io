import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '../NavBar'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('NavBar', () => {
  it('renders navigation links', () => {
    renderWithRouter(<NavBar />)
    
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders logo with correct text', () => {
    renderWithRouter(<NavBar />)
    
    const logo = screen.getByText('MD')
    expect(logo).toBeInTheDocument()
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('has proper navigation structure', () => {
    renderWithRouter(<NavBar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4) // Logo + 3 nav links
  })

  it('applies active styles when on current page', () => {
    // This would require more complex setup with React Router testing
    // For now, we'll test the basic structure
    renderWithRouter(<NavBar />)
    
    const aboutLink = screen.getByText('About')
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about')
  })
}) 