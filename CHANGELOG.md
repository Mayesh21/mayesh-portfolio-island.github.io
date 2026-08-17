# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Fixed dark mode switching issues for multiple components:
  - Quick filter buttons in Projects page now properly switch between light and dark modes
  - Search bar in Projects page now has proper dark mode background, border, and text colors
  - Active filter tags (category, technology, difficulty, date range) now display correct colors in dark mode
  - Work experience inner cards (technologies, achievements, responsibilities) now have proper dark mode gradient backgrounds and text colors
  - Recently viewed project cards now have proper dark mode styling and fixed hover clipping issue
  - Clear all filters button now has proper dark mode text colors
- Fixed recently viewed cards hover clipping by adding proper margin, z-index, and transform properties
- Enhanced dark mode color scheme for better contrast and readability across all components
- Removed conflicting CSS rules that were causing mixed light/dark mode appearance
- Cleaned up CSS specificity to ensure proper theme switching (light mode uses Tailwind defaults, dark mode uses explicit CSS rules)
- **BREAKING**: Removed all hardcoded dark mode classes from Projects.jsx and About.jsx components
- **BREAKING**: Replaced hardcoded dark mode classes with conditional classes based on theme state using useTheme hook
- **BREAKING**: Updated all filter components, search bars, dropdowns, and cards to use dynamic theme-based styling
- **BREAKING**: Fixed theme switching by ensuring dark mode classes only apply when dark mode is actually active
- **BREAKING**: Fixed work experience cards in About page by making VerticalTimelineElement styles dynamic:
  - Card background gradient now switches between light and dark themes
  - Main title text color now adapts to theme
  - Meta information section background and text colors now switch properly
  - Role badges now have proper dark mode colors
  - Icon backgrounds and colors in meta section now adapt to theme
  - Arrow color now matches theme
  - Fixed theme switching by adding theme-dependent key to force VerticalTimelineElement re-render
  - Added theme-dependent key to VerticalTimeline component to ensure complete re-render of timeline elements

### Added
- Enhanced project data structure with detailed metadata (technologies, categories, screenshots, status, difficulty, date, time spent, features, challenges, learnings)
- ProjectModal component for detailed project views with comprehensive information display
- Advanced filtering system with multiselect dropdowns for categories and technologies
- Search functionality with real-time filtering
- Sorting options (name, date, difficulty, status)
- Screenshot gallery with navigation arrows and indicators
- Technology icons display in project cards and modal
- Quick filter presets for common project types
- Visual complexity indicators with color-coded difficulty badges
- Mobile-responsive design with improved touch targets and layout
- New technology icons for C#, .NET, Java, Python, Android, SQLite, XML, and Bootstrap
- Statistics dashboard with project counts, completion rates, and technology usage charts
- Enhanced filtering with date range and difficulty filters
- Project card animations with staggered entrance effects and hover transformations
- Recently viewed projects section for better user experience
- Loading skeleton states for improved perceived performance
- Advanced CSS animations and transitions throughout the interface
- Enhanced Contact page with contact information cards and social media links
- Improved form styling with icons and better error handling
- Loading animations and success states for form submission
- Social media integration with hover effects and animations
- Reorganized Contact page layout: form and 3D Fox are now in the same area, contact cards moved below
- Improved responsive design: desktop shows centered contact cards in 4-column grid, mobile maintains original layout
- Fixed desktop layout structure to properly separate form/fox section from contact cards section
- Updated LinkedIn profile URL to correct address
- Enhanced 3D Fox with mouse following, breathing animations, tail wagging, ear twitching, and blinking effects
- Added hover glow effect and improved materials for better visual appeal
- Implemented form-fox interactions with contextual animations based on user actions
- Enhanced 3D scene lighting with multiple light sources and atmospheric fog
- Added staggered animations for contact cards and social media links
- Improved form input interactions with fox-themed color feedback
- Comprehensive testing infrastructure with Vitest and React Testing Library
- Unit tests for validation utilities and form components
- Enhanced accessibility with proper ARIA labels, roles, and keyboard navigation
- Loading skeleton components for better perceived performance
- Error monitoring and logging capabilities
- Keyboard navigation support for 3D scene interactions
- Dark mode support with system preference detection and theme persistence
- PWA features with service worker for offline functionality
- Optimized image component with lazy loading and WebP support
- Offline detection and queue management for form submissions
- App-like installation experience with manifest and shortcuts

### Fixed
- Fixed import error for useFrame hook from @react-three/fiber instead of @react-three/drei
- Added error handling and safety checks for animation properties to prevent runtime errors
- Reverted lighting setup to original configuration to fix visual issues
- Simplified Fox animations to restore working walk/idle animations
- Removed complex animation overlays that were interfering with base animations
- Fixed Fox animation timing by removing automatic reset to idle and adding proper delays
- Re-added enhanced Fox animations with reduced intensity: breathing and tail wagging
- Removed mouse following animation as it was causing unnatural whole-body rotation
- Improved form interaction: walk animation now triggers only when typing, not on focus
- Enhanced animation logic to stop walking when all fields are empty
- Fixed name validation regex to support accented characters (é, ñ, etc.)

### Changed
- Completely redesigned Projects page with modern card-based layout
- Improved mobile UX with better padding, card-based layout, and enhanced visual hierarchy
- Enhanced modal responsiveness with sticky header and scrollable content
- Updated project cards to show more detailed information and better visual appeal
- Increased spacing between icon and title in ProjectModal header for better visual balance
- Enhanced project filtering system with more granular controls and better UX
- Improved visual feedback with smooth animations and hover effects
- Better organization of filter controls with responsive grid layout
- Enhanced Contact page form with better visual design and user feedback
- Improved form validation with icon-based error messages
- Enhanced button interactions with loading states and animations
- Enhanced navigation with proper ARIA labels and semantic HTML structure
- Improved form accessibility with proper labels, error associations, and validation feedback
- Added comprehensive error boundary with production-ready error logging
- Added theme toggle to navigation bar with smooth animations
- Implemented comprehensive dark mode styling throughout the application
- Added PWA manifest and service worker registration

### Fixed
- Mobile layout issues in ProjectModal with better responsive design
- Linting errors in project data structure
- Spacing issues between project icon and title in modal header
- Missing express import in constants file causing ReferenceError
- Clarified technology icons usage with proper comments for missing icons
- Fixed spaces not working in Contact form message textarea by removing real-time sanitization during typing
- Fixed DRACOLoader import error by importing from 'three/examples/jsm/loaders/DRACOLoader.js' in all 3D model components
- Fixed R3F Button error by adding is3D prop to ErrorBoundary to prevent HTML elements in 3D context
- Fixed 3D model loading errors by adding proper null checks and error handling in all model components
- Fixed dark mode styling issues across all pages:
  - Home page "Visit my Portfolio" button now properly styled in dark mode
  - About page experience cards now have proper dark backgrounds and text colors
  - About page skill filter buttons now work correctly in dark mode
  - Projects page search, date, and sort fields now have proper dark mode styling
  - Projects page statistics dashboard and technology usage chart now support dark mode
  - All form inputs, dropdowns, and filter controls now have consistent dark mode appearance
  - Fixed shadow issues by using proper dark mode shadow classes
  - Fixed dark mode styles to only apply when dark mode is active (removed hardcoded dark classes from light mode)
  - Removed white gradient background from experience cards in dark mode, replaced with dark gradient
  - Improved mobile navigation header styling with better padding and spacing
  - Changed navigation links to white color in dark mode for better visibility
  - Fixed recently viewed project cards hover clipping issue with proper transform and z-index
  - Fixed "Visit my Portfolio" button visibility in light mode by adding proper background and border styles
  - Added comprehensive dark mode styling for all components including forms, cards, text elements, and shadows
  - Enhanced button hover effects with smooth transitions and proper color schemes for both themes
  - Fixed all text color issues in dark mode for better readability and contrast
  - Added proper dark mode styling for form elements, social links, and interactive components
  - Removed header backdrop filter that was causing visual issues
  - Fixed work experience cards text visibility in dark mode with proper color mapping
  - Fixed project page search and filter elements to properly switch between light and dark modes
  - Added comprehensive color mapping for all Tailwind utility classes in dark mode 