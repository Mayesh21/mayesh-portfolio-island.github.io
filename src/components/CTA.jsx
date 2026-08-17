import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const CTA = () => {
  const { isDark } = useTheme()
  const location = useLocation()
  const [isHovered, setIsHovered] = useState(false)

  // Page-specific messaging
  const getPageSpecificContent = () => {
    switch (location.pathname) {
      case '/about':
        return {
          title: "Ready to bring your ideas to life?",
          subtitle: "Let's discuss your project requirements and create something amazing together.",
          primaryAction: "Start Your Project",
          secondaryAction: "View My Work"
        }
      case '/projects':
        return {
          title: "Want to build something similar?",
          subtitle: "I can help you create custom solutions tailored to your specific needs.",
          primaryAction: "Discuss Your Project",
          secondaryAction: "Get a Quote"
        }
      case '/contact':
        return {
          title: "Ready to start your project?",
          subtitle: "Let's turn your vision into reality with custom development solutions.",
          primaryAction: "Send Message",
          secondaryAction: "Schedule Call"
        }
      default:
        return {
          title: "Have a project in mind?",
          subtitle: "Let's build something amazing together with custom development solutions.",
          primaryAction: "Get Started",
          secondaryAction: "Learn More"
        }
    }
  }

  const content = getPageSpecificContent()

  return (
    <section className={`relative overflow-hidden rounded-2xl p-8 md:p-12 ${isDark ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'} border ${isDark ? 'border-gray-700' : 'border-blue-100'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
              <svg className={`w-7 h-7 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {content.title}
            </h2>
          </div>
          
          <p className={`text-base md:text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-xl`}>
            {content.subtitle}
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center lg:justify-start mb-6">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                4.8 rating
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link 
            to="/contact"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {content.primaryAction}
              <svg className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          </Link>

          <Link 
            to="/projects"
            className={`px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 border-2 ${isDark ? 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400' : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'}`}
          >
            {content.secondaryAction}
          </Link>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="relative z-10 mt-8 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <svg className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:mayeshdani@gmail.com" className={`hover:underline ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}>
              mayeshdani@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <svg className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href="tel:+918956790002" className={`hover:underline ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}>
              +91 89567 90002
            </a>
          </div>
          <div className="flex items-center gap-2">
            <svg className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <a href="mailto:mayeshdani@gmail.com?subject=Schedule%20Google%20Meet" className={`hover:underline ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}>
              Schedule Google Meet
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA