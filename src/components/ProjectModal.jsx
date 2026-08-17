import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { arrow, github } from '../assets/icons';
import { whiteIcons, monochromeIcons } from '../constants';
import { getDifficultyColor, getStatusColor } from '../utils/projectUtils';
import { useTheme } from '../contexts/ThemeContext';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !project) return null;

  const nextScreenshot = () => {
    if (project.screenshots && project.screenshots.length > 0) {
      setCurrentScreenshotIndex((prev) => 
        prev === project.screenshots.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevScreenshot = () => {
    if (project.screenshots && project.screenshots.length > 0) {
      setCurrentScreenshotIndex((prev) => 
        prev === 0 ? project.screenshots.length - 1 : prev - 1
      );
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[98vh] sm:max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-4 sm:gap-8 flex-1 min-w-0">
              <div className="block-container w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                <div className={`btn-back rounded-xl ${project.theme}`} />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  {whiteIcons.includes(project.iconUrl) ? (
                    <img
                      src={project.iconUrl}
                      alt="Project Icon"
                      className="w-1/2 h-1/2 object-contain"
                    />
                  ) : (
                    <div className="icon-chip w-1/2 h-1/2 p-1.5">
                      <img
                        src={project.iconUrl}
                        alt="Project Icon"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words leading-tight">{project.name}</h2>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                  <span className={`px-2.5 py-1.5 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                  <span className={`px-2.5 py-1.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="px-2.5 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl font-bold p-2 -m-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Screenshots Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Project Screenshots</h3>
                <div className="relative">
                  <div className="aspect-video bg-white rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={project.screenshots[currentScreenshotIndex]}
                      alt={`${project.name} screenshot ${currentScreenshotIndex + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center bg-gray-100 text-gray-500">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📸</div>
                        <p className="text-sm">Screenshot {currentScreenshotIndex + 1}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Arrows */}
                  {project.screenshots.length > 1 && (
                    <>
                      <button
                        onClick={prevScreenshot}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                        aria-label="Previous screenshot"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextScreenshot}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                        aria-label="Next screenshot"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                  
                  {/* Screenshot Indicators */}
                  {project.screenshots.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {project.screenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentScreenshotIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentScreenshotIndex ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                          aria-label={`Go to screenshot ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg text-gray-600">Date:</span>
                    <span className="text-base sm:text-lg font-medium text-gray-900">{project.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg text-gray-600">Time Spent:</span>
                    <span className="text-base sm:text-lg font-medium text-gray-900">{project.timeSpent}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg text-gray-600">Category:</span>
                    <span className="text-base sm:text-lg font-medium text-gray-900">{project.category}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-white text-gray-700 rounded-lg text-sm sm:text-base font-medium border border-gray-200"
                    >
                      {project.technologyIcons && project.technologyIcons[index] && (
                        <img
                          src={project.technologyIcons[index]}
                          alt={tech}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark && monochromeIcons.includes(project.technologyIcons[index]) ? 'invert' : ''}`}
                        />
                      )}
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></span>
                    <span className="text-base sm:text-lg text-gray-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges & Learnings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Challenges Faced</h3>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2.5 h-2.5 bg-orange-500 rounded-full mt-2.5 flex-shrink-0"></span>
                      <span className="text-base sm:text-lg text-gray-700 leading-relaxed">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Key Learnings</h3>
                <ul className="space-y-3">
                  {project.learnings.map((learning, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full mt-2.5 flex-shrink-0"></span>
                      <span className="text-base sm:text-lg text-gray-700 leading-relaxed">{learning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Links */}
        <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-base sm:text-lg font-medium shadow-lg hover:shadow-xl"
              >
                <img src={github} alt="GitHub" className="w-5 h-5 sm:w-6 sm:h-6 invert" />
                View on GitHub
                <img src={arrow} alt="Arrow" className="w-4 h-4 sm:w-5 sm:h-5 invert" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors text-base sm:text-lg font-medium shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

ProjectModal.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    longDescription: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    technologyIcons: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    timeSpent: PropTypes.string.isRequired,
    githubUrl: PropTypes.string,
    liveUrl: PropTypes.string,
    screenshots: PropTypes.arrayOf(PropTypes.string),
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    challenges: PropTypes.arrayOf(PropTypes.string).isRequired,
    learnings: PropTypes.arrayOf(PropTypes.string).isRequired,
    iconUrl: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProjectModal; 