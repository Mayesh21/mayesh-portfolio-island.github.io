import { useState, useMemo } from "react";
import { projects, whiteIcons, monochromeIcons } from "../constants";
import { arrow } from "../assets/icons";
import CTA from "../components/CTA";
import ProjectModal from "../components/ProjectModal";
import RevealOnScroll from "../components/RevealOnScroll";
import AnimatedCounter from "../components/AnimatedCounter";
import GitHubStats from "../components/GitHubStats";
import { useTheme } from "../contexts/ThemeContext";
import { getDifficultyColor, getStatusColor, getDifficultyLevel } from "../utils/projectUtils";

const Projects = () => {
  const { isDark } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTechnologyDropdown, setShowTechnologyDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [difficultyFilter, setDifficultyFilter] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Get unique categories and technologies
  const categories = useMemo(() => {
    const cats = [...new Set(projects.map(project => project.category))];
    return cats.sort();
  }, []);

  const technologies = useMemo(() => {
    const techs = [...new Set(projects.flatMap(project => project.technologies))];
    return techs.sort();
  }, []);

  // Derive year bounds from actual project data instead of hardcoding them.
  // "Recent" quick filter searches for this exact year, so it stays tied to
  // the latest actual project date. The date-range max is separate: it
  // should track today's real year (not just the newest project) so the
  // filter doesn't need a manual bump every year even before a new project
  // is added.
  const projectYears = useMemo(() => projects.map(project => parseInt(project.date, 10)), []);
  const earliestYear = useMemo(() => Math.min(...projectYears), [projectYears]);
  const mostRecentYear = useMemo(() => Math.max(...projectYears), [projectYears]);
  const currentYear = new Date().getFullYear();
  const dateRangeMaxYear = Math.max(mostRecentYear, currentYear);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(project.category);
      const matchesTechnology = selectedTechnologies.length === 0 || 
                               selectedTechnologies.some(tech => project.technologies.includes(tech));
      
      const matchesDateRange = (!dateRange.start || project.date >= dateRange.start) && 
                              (!dateRange.end || project.date <= dateRange.end);
      
      const matchesDifficulty = difficultyFilter.length === 0 || difficultyFilter.includes(project.difficulty);
      
      return matchesSearch && matchesCategory && matchesTechnology && matchesDateRange && matchesDifficulty;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date) - new Date(a.date);
        case "name":
          return a.name.localeCompare(b.name);
        case "difficulty": {
          const difficultyOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        }
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategories, selectedTechnologies, sortBy, dateRange, difficultyFilter]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== project.id);
      return [project, ...filtered].slice(0, 3);
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleTechnology = (technology) => {
    setSelectedTechnologies(prev => 
      prev.includes(technology) 
        ? prev.filter(t => t !== technology)
        : [...prev, technology]
    );
  };

  const clearCategoryFilters = () => {
    setSelectedCategories([]);
  };

  const clearTechnologyFilters = () => {
    setSelectedTechnologies([]);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTechnologies([]);
    setSearchTerm("");
    setDateRange({ start: '', end: '' });
    setDifficultyFilter([]);
  };

  // Quick filter presets
  const quickFilters = [
    { name: "All Projects", action: clearAllFilters, count: projects.length },
    { name: "Web Apps", action: () => setSelectedCategories(["Web Application"]), count: projects.filter(p => p.category === "Web Application").length },
    { name: "Games", action: () => setSelectedCategories(["Game"]), count: projects.filter(p => p.category === "Game").length },
    { name: "Mobile Apps", action: () => setSelectedCategories(["Mobile Application"]), count: projects.filter(p => p.category === "Mobile Application").length },
    { name: "React Projects", action: () => setSelectedTechnologies(["React"]), count: projects.filter(p => p.technologies.includes("React")).length },
    { name: `Recent (${mostRecentYear})`, action: () => setSearchTerm(String(mostRecentYear)), count: projects.filter(p => p.date === String(mostRecentYear)).length },
  ];



  return (
    <section className="max-container">
      <RevealOnScroll animation="fade-up">
        <h1 className="head-text">
          My <span className="gradient-animate font-semibold drop-shadow">
            Projects
          </span>
        </h1>
      </RevealOnScroll>
      
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          I&apos;ve worked on a variety of personal projects that have helped me grow as a developer. While some are small-scale, each one reflects my passion for coding and continuous learning. Many of these projects are open-source, so if you find something intriguing, feel free to explore the code and contribute your ideas for improvements!
        </p>
      </div>

      {/* Statistics Dashboard */}
      <RevealOnScroll animation="fade-up" delay={100}>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card hover-glow bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900"><AnimatedCounter end={projects.length} /></p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card hover-glow bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                <AnimatedCounter end={projects.filter(p => p.status === 'Completed').length} />
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Technologies</p>
              <p className="text-2xl font-bold text-purple-600"><AnimatedCounter end={technologies.length} /></p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-orange-600"><AnimatedCounter end={categories.length} /></p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <GitHubStats />
      </RevealOnScroll>

      {/* Technology Usage Chart */}
      <RevealOnScroll animation="fade-up" delay={150}>
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover-glow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technology Usage</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.slice(0, 8).map((tech) => {
            const usageCount = projects.filter(p => p.technologies.includes(tech)).length;
            const percentage = Math.round((usageCount / projects.length) * 100);
            return (
              <div key={tech} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{tech}</span>
                    <span className="text-gray-500">{usageCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </RevealOnScroll>

      {/* Recently Viewed Projects */}
      {recentlyViewed.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Viewed</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {recentlyViewed.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className={`project-card recently-viewed-card flex-shrink-0 w-80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-gray-100'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
            <div className="block-container w-12 h-12">
                      <div className={`btn-back rounded-xl ${project.theme}`} />
                      <div className="btn-front rounded-xl flex justify-center items-center">
                        {whiteIcons.includes(project.iconUrl) ? (
                          <img
                            src={project.iconUrl}
                            alt="Project Icon"
                            className="w-1/2 h-1/2 object-contain"
                          />
                        ) : (
                          <div className="icon-chip w-1/2 h-1/2 p-1">
                            <img
                              src={project.iconUrl}
                              alt="Project Icon"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.name}</h4>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{project.category}</p>
                    </div>
                  </div>
                  <p className={`text-xs line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Filter Presets */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Filters</h3>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter, index) => (
            <button
              key={index}
              onClick={filter.action}
              className={`px-4 py-2 border rounded-lg transition-colors text-sm font-medium ${
                isDark 
                  ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {filter.name} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mt-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects by name, description, or technology..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDark 
                ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
            }`}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div className="relative">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between ${
                  isDark 
                    ? 'border-gray-600 bg-gray-800' 
                    : 'border-gray-300 bg-white'
                }`}
              >
                <span className={selectedCategories.length === 0 
                  ? (isDark ? "text-gray-400" : "text-gray-500") 
                  : (isDark ? "text-white" : "text-gray-900")
                }>
                  {selectedCategories.length === 0 
                    ? `All Categories (${projects.length})` 
                    : `${selectedCategories.length} selected`
                  }
                </span>
                <svg
                  className={`w-5 h-5 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''} ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showCategoryDropdown && (
                <div className={`absolute z-10 w-full mt-1 border rounded-lg shadow-lg max-h-60 overflow-y-auto ${
                  isDark 
                    ? 'bg-gray-800 border-gray-600' 
                    : 'bg-white border-gray-300'
                }`}>
                  <div className="p-2">
                    {selectedCategories.length > 0 && (
                      <button
                        onClick={clearCategoryFilters}
                        className={`w-full text-left px-2 py-1 text-sm rounded ${
                          isDark 
                            ? 'text-blue-400 hover:bg-blue-900/20' 
                            : 'text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        Clear all
                      </button>
                    )}
                    {categories.map(category => (
                      <label key={category} className={`flex items-center px-2 py-1 rounded cursor-pointer ${
                        isDark 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-50'
                      }`}>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className={`mr-2 rounded text-blue-600 focus:ring-blue-500 ${
                            isDark ? 'border-gray-600' : 'border-gray-300'
                          }`}
                        />
                        <span className={`text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {category} ({projects.filter(p => p.category === category).length})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Technology Filter */}
          <div className="relative">
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Technology</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTechnologyDropdown(!showTechnologyDropdown)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between ${
                  isDark 
                    ? 'border-gray-600 bg-gray-800' 
                    : 'border-gray-300 bg-white'
                }`}
              >
                <span className={selectedTechnologies.length === 0 
                  ? (isDark ? "text-gray-400" : "text-gray-500") 
                  : (isDark ? "text-white" : "text-gray-900")
                }>
                  {selectedTechnologies.length === 0 
                    ? "All Technologies" 
                    : `${selectedTechnologies.length} selected`
                  }
                </span>
                <svg
                  className={`w-5 h-5 transition-transform ${showTechnologyDropdown ? 'rotate-180' : ''} ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showTechnologyDropdown && (
                <div className={`absolute z-10 w-full mt-1 border rounded-lg shadow-lg max-h-60 overflow-y-auto ${
                  isDark 
                    ? 'bg-gray-800 border-gray-600' 
                    : 'bg-white border-gray-300'
                }`}>
                  <div className="p-2">
                    {selectedTechnologies.length > 0 && (
                      <button
                        onClick={clearTechnologyFilters}
                        className={`w-full text-left px-2 py-1 text-sm rounded ${
                          isDark 
                            ? 'text-blue-400 hover:bg-blue-900/20' 
                            : 'text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        Clear all
                      </button>
                    )}
                    {technologies.map(technology => (
                      <label key={technology} className={`flex items-center px-2 py-1 rounded cursor-pointer ${
                        isDark 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-50'
                      }`}>
                        <input
                          type="checkbox"
                          checked={selectedTechnologies.includes(technology)}
                          onChange={() => toggleTechnology(technology)}
                          className={`mr-2 rounded text-blue-600 focus:ring-blue-500 ${
                            isDark ? 'border-gray-600' : 'border-gray-300'
                          }`}
                        />
                        <span className={`text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {technology} ({projects.filter(p => p.technologies.includes(technology)).length})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Sort By</label>
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between ${
                  isDark 
                    ? 'border-gray-600 bg-gray-800' 
                    : 'border-gray-300 bg-white'
                }`}
              >
                <span className={isDark ? "text-white" : "text-gray-900"}>
                  {sortBy === 'date' && 'Date (Newest First)'}
                  {sortBy === 'name' && 'Name (A-Z)'}
                  {sortBy === 'difficulty' && 'Difficulty'}
                  {sortBy === 'category' && 'Category'}
                </span>
                <svg className={`w-5 h-5 transition-transform ${showSortDropdown ? 'rotate-180' : ''} ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showSortDropdown && (
                <div className={`absolute z-10 w-full mt-1 border rounded-lg shadow-lg ${
                  isDark 
                    ? 'bg-gray-800 border-gray-600' 
                    : 'bg-white border-gray-300'
                }`}>
                  {[
                    { value: 'date', label: 'Date (Newest First)' },
                    { value: 'name', label: 'Name (A-Z)' },
                    { value: 'difficulty', label: 'Difficulty' },
                    { value: 'category', label: 'Category' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-2 py-1 text-sm rounded ${
                        sortBy === option.value
                          ? 'bg-blue-500 text-white'
                          : isDark 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Date Range</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="From"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                  isDark 
                    ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                }`}
                min={earliestYear}
                max={dateRangeMaxYear}
              />
              <input
                type="number"
                placeholder="To"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                  isDark
                    ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                }`}
                min={earliestYear}
                max={dateRangeMaxYear}
              />
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Difficulty</label>
            <div className="flex flex-wrap gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setDifficultyFilter(prev => 
                    prev.includes(difficulty) 
                      ? prev.filter(d => d !== difficulty)
                      : [...prev, difficulty]
                  )}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    difficultyFilter.includes(difficulty)
                      ? 'bg-blue-500 text-white'
                      : isDark 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedCategories.length > 0 || selectedTechnologies.length > 0 || difficultyFilter.length > 0 || dateRange.start || dateRange.end) && (
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map(category => (
              <span
                key={category}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  isDark 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {category}
                <button
                  onClick={() => toggleCategory(category)}
                  className={`ml-2 ${
                    isDark 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  ×
                </button>
              </span>
            ))}
            {selectedTechnologies.map(technology => (
              <span
                key={technology}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  isDark 
                    ? 'bg-green-900 text-green-200' 
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {technology}
                <button
                  onClick={() => toggleTechnology(technology)}
                  className={`ml-2 ${
                    isDark 
                      ? 'text-green-400 hover:text-green-300' 
                      : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  ×
                </button>
              </span>
            ))}
            {difficultyFilter.map(difficulty => (
              <span
                key={difficulty}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  isDark 
                    ? 'bg-purple-900 text-purple-200' 
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                {difficulty}
                <button
                  onClick={() => setDifficultyFilter(prev => prev.filter(d => d !== difficulty))}
                  className={`ml-2 ${
                    isDark 
                      ? 'text-purple-400 hover:text-purple-300' 
                      : 'text-purple-600 hover:text-purple-800'
                  }`}
                >
                  ×
                </button>
              </span>
            ))}
            {(dateRange.start || dateRange.end) && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                isDark 
                  ? 'bg-orange-900 text-orange-200' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {dateRange.start && dateRange.end 
                  ? `${dateRange.start}-${dateRange.end}`
                  : dateRange.start 
                    ? `From ${dateRange.start}`
                    : `Until ${dateRange.end}`
                }
                <button
                  onClick={() => setDateRange({ start: '', end: '' })}
                  className={`ml-2 ${
                    isDark 
                      ? 'text-orange-400 hover:text-orange-300' 
                      : 'text-orange-600 hover:text-orange-800'
                  }`}
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className={`text-sm underline ${
                isDark 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      </div>

      {/* Projects Grid */}
        <div className="flex flex-wrap my-12 gap-8">
        {filteredProjects.map((project, index) => (
          <RevealOnScroll key={project.id} animation="fade-up" delay={index * 80} className="lg:w-[400px] w-full">
          <div
            className="lg:w-full w-full cursor-pointer group"
            onClick={() => handleProjectClick(project)}
          >
            <div className={`project-card hover-glow rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
              isDark 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-100'
            }`}>
              {/* Project Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="block-container w-16 h-16">
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
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Difficulty Level Indicator */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Complexity:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-2 rounded-full ${
                            level <= getDifficultyLevel(project.difficulty)
                              ? 'bg-blue-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Technologies with Icons */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {project.technologyIcons && project.technologyIcons[index] && (
                          <img
                            src={project.technologyIcons[index]}
                            alt={tech}
                            className={`w-3 h-3 ${isDark && monochromeIcons.includes(project.technologyIcons[index]) ? 'invert' : ''}`}
                          />
                        )}
                        {tech}
                      </div>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Project Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{project.category}</span>
                    <span>{project.date}</span>
                  </div>
                </div>
              </div>

              {/* Project Footer */}
              <div className={`px-6 py-4 border-t ${
                isDark 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-100'
              }`}>
                                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.timeSpent}</span>
                    <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                      View Details
                      <img src={arrow} alt="View details" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
              </div>
              </div>
          </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find what you&apos;re looking for.
          </p>
        </div>
      )}

      <CTA />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Click outside to close dropdowns */}
      {(showCategoryDropdown || showTechnologyDropdown) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => {
            setShowCategoryDropdown(false);
            setShowTechnologyDropdown(false);
          }}
        />
      )}
    </section>
  );
};

export default Projects;