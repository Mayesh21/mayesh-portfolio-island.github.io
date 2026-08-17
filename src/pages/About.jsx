import { useState } from "react";
import { skills, experiences, certifications } from "../constants";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import CTA from "../components/CTA";
import SkillModal from "../components/SkillModal";
import RevealOnScroll from "../components/RevealOnScroll";
import { useTheme } from "../contexts/ThemeContext";

const About = () => {
  const { isDark } = useTheme();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState('all');

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
  };

  const filteredSkills = skillFilter === 'all' 
    ? skills 
    : skills.filter(skill => skill.type.toLowerCase() === skillFilter.toLowerCase());

  const skillTypes = [...new Set(skills.map(skill => skill.type))];

  return (
    <section className="max-container">
      <RevealOnScroll animation="fade-up">
        <h1 className="head-text">
          Hello, I&apos;m <span className="gradient-animate font-semibold drop-shadow">
            Mayesh
          </span>
        </h1>
      </RevealOnScroll>
      <RevealOnScroll animation="fade-up" delay={100}>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
          Computer Science postgraduate with over two years of professional experience as a Full Stack Software Engineer, specializing in scalable web systems, backend development, and cloud-based deployments. I&apos;m now furthering that foundation with an MSc in Artificial Intelligence at the University of Galway, Ireland, combining industry experience with a passion for building intelligent, high-performance applications.
          </p>
        </div>
      </RevealOnScroll>

      {/* Resume Download */}
      <RevealOnScroll animation="fade-up" delay={200}>
      <div className="mt-6">
        <a
          href="/Mayesh_Dani_Resume.pdf"
          download
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Resume
        </a>
      </div>
      </RevealOnScroll>
      <div className="py-10 flex flex-col">
        <RevealOnScroll animation="fade-up">
          <h3 className="subhead-text">My Skills</h3>
        </RevealOnScroll>
        
        {/* Skill Filter Buttons */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSkillFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              skillFilter === 'all'
                ? 'bg-blue-500 text-white shadow-md'
                : isDark 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label="Show all skills"
          >
            All Skills ({skills.length})
          </button>
          {skillTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSkillFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                skillFilter === type
                  ? 'bg-blue-500 text-white shadow-md'
                  : isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={`Filter by ${type} skills`}
            >
              {type} ({skills.filter(skill => skill.type === type).length})
            </button>
          ))}
        </div>
        
        <div className="mt-8 flex flex-wrap gap-12 skills-section">
          {filteredSkills.map((skill, index) => (
            <div 
              key={`skill-${skill.name}-${index}`} 
              className="relative group"
              onClick={() => handleSkillClick(skill)}
            >
              <div className="block-container w-20 h-20 cursor-pointer transform transition-transform duration-200 group-hover:scale-105">
                <div className="btn-back rounded-xl" />
                <div className="btn-front rounded-xl flex flex-col justify-center items-center relative overflow-hidden">
                  <div className="icon-chip w-1/2 h-1/2 p-2">
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              {/* Desktop hover tooltip */}
              <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[999999] hidden md:block min-w-[200px] shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-white">{skill.name}</div>
                  <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">{skill.type}</span>
                </div>
                <div className="text-gray-300 text-xs leading-relaxed">{skill.description}</div>
                <div className="text-gray-400 text-xs mt-1">{skill.experience}</div>
                <div className="text-gray-400 text-xs mt-1">
                  Projects: {skill.projects.length}
                </div>
                {/* Arrow */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="py-16">
        <RevealOnScroll animation="fade-up">
          <h3 className="subhead-text">Work Experience</h3>
        </RevealOnScroll>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
          Over two years at WisdmLabs, I&apos;ve collaborated with clients to architect and deliver scalable web platforms, built AI-powered systems, and optimized enterprise applications. Here&apos;s my journey:
          </p>
        </div>
        <div className="mt-12 flex">
          <VerticalTimeline>
            {experiences.map((experience) => (
              <VerticalTimelineElement
                key={`${experience.company_name}-${experience.role || experience.title}`}
                date={experience.date}
                icon={
                  <div
                    className="flex justify-center items-center w-full h-full group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: experience.iconBg }}
                  >
                    {experience.iconFit === 'cover' ? (
                      <img
                        src={experience.icon}
                        alt={experience.company_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="icon-chip w-[60%] h-[60%] p-1.5">
                        <img
                          src={experience.icon}
                          alt={experience.company_name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                }
                className="group hover:transform hover:scale-105 transition-all duration-300 timeline-card"
                contentClassName="timeline-content"
                iconClassName="timeline-icon"
                style={{ borderBottomColor: experience.iconBg }}
              >
                <div className="space-y-4">
                  {/* Header with role badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`text-2xl font-poppins font-bold mb-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {experience.title}
                      </h3>
                      <div className="flex items-center gap-3 mb-3">
                        <a
                          href={experience.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-all duration-200 hover:underline"
                        >
                          {experience.company_name}
                        </a>
                        <span className={`px-3 py-1 text-xs rounded-full font-bold shadow-xs ${
                          experience.role === 'Full-time' 
                            ? isDark 
                              ? 'bg-green-900 text-green-200' 
                              : 'bg-green-100 text-green-800'
                            : experience.role === 'Internship'
                            ? isDark 
                              ? 'bg-blue-900 text-blue-200' 
                              : 'bg-blue-100 text-blue-800'
                            : isDark 
                              ? 'bg-purple-900 text-purple-200' 
                              : 'bg-purple-100 text-purple-800'
                        }`}>
                          {experience.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Meta information */}
                  <div className={`rounded-lg p-3 border ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-gray-50 border-gray-100'
                  }`}>
                    <div className={`flex flex-wrap gap-4 text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isDark ? 'bg-blue-900' : 'bg-blue-100'
                        }`}>
                          <svg className={`w-4 h-4 ${
                            isDark ? 'text-blue-300' : 'text-blue-600'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isDark ? 'bg-green-900' : 'bg-green-100'
                        }`}>
                          <svg className={`w-4 h-4 ${
                            isDark ? 'text-green-300' : 'text-green-600'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">{experience.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isDark ? 'bg-purple-900' : 'bg-purple-100'
                        }`}>
                          <svg className={`w-4 h-4 ${
                            isDark ? 'text-purple-300' : 'text-purple-600'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">{experience.teamSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Technologies used */}
                  <div className={`bg-gradient-to-r rounded-lg p-4 border technologies-section ${
                    isDark 
                      ? 'border-blue-800' 
                      : 'border-blue-100'
                  }`}>
                    <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      <svg className={`w-4 h-4 ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 text-xs rounded-full font-medium shadow-xs border transition-colors duration-200 ${
                            isDark 
                              ? 'bg-gray-700 text-blue-300 border-blue-600 hover:bg-blue-900/20' 
                              : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key achievements */}
                  <div className={`bg-gradient-to-r rounded-lg p-4 border achievements-section ${
                    isDark 
                      ? 'border-green-800' 
                      : 'border-green-100'
                  }`}>
                    <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      <svg className={`w-4 h-4 ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, index) => (
                        <li
                          key={index}
                          className={`text-sm flex items-start gap-3 ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Responsibilities */}
                  <div className={`bg-gradient-to-r rounded-lg p-4 border responsibilities-section ${
                    isDark 
                      ? 'border-gray-700' 
                      : 'border-gray-200'
                  }`}>
                    <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      <svg className={`w-4 h-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {experience.points.map((point, index) => (
                        <li
                          key={`experience-point-${index}`}
                          className={`text-sm flex items-start gap-3 ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                            isDark ? 'bg-gray-500' : 'bg-gray-400'
                          }`}></div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
      <div className="py-16">
        <RevealOnScroll animation="fade-up">
          <h3 className="subhead-text">Certifications</h3>
        </RevealOnScroll>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <RevealOnScroll key={cert.name} animation="fade-up" delay={index * 80}>
              <div
                className={`h-full rounded-xl p-6 border shadow-lg hover-glow transition-all duration-300 hover:-translate-y-1 ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-blue-900/50' : 'bg-blue-100'
                  }`}>
                    <svg className={`w-6 h-6 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>{cert.name}</h4>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{cert.issuer}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
      <CTA />
      
      {/* Skill Modal for Mobile */}
      <SkillModal 
        skill={selectedSkill}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default About;
