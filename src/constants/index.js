import {
    car,
    contact,
    css,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    nodejs,
    expenseTracker,
    snakeGame,
    librarySystem,
    fileX,
    snapEdit,
    physipal,
    wisdmlabsIcon,
    react,
    php,
    mysql,
    woocommerce,
    wordpress,
    learndash,
    api,
    csharp,
    dotnet,
    java,
    python,
    android,
    sqlite,
    xml,
    bootstrap,
    postgresql,
    playwright,
    chatbot,
    windows,
    numpy,
    chartjs,
    nlp,
    tkinter,
    cloudways,
    jetpack,
    cloudflare,
    twelveMinPrep,
    ysi,
} from "../assets/icons";

// Project screenshots
import ysiInet1 from '../assets/images/projects/ysi-inet-1.jpg';
import ysiInet2 from '../assets/images/projects/ysi-inet-2.jpg';
import ysiInet3 from '../assets/images/projects/ysi-inet-3.jpg';
import minprep1 from '../assets/images/projects/12minprep-1.jpg';
import minprep2 from '../assets/images/projects/12minprep-2.jpg';
import minprep3 from '../assets/images/projects/12minprep-3.jpg';
import filex1 from '../assets/images/projects/filex-1.jpg';
import filex2 from '../assets/images/projects/filex-2.jpg';
import filex3 from '../assets/images/projects/filex-3.jpg';
import filex4 from '../assets/images/projects/filex-4.jpg';
import filex5 from '../assets/images/projects/filex-5.jpg';
import filex6 from '../assets/images/projects/filex-6.jpg';
import library1 from '../assets/images/projects/library-1.png';
import library2 from '../assets/images/projects/library-2.png';
import library3 from '../assets/images/projects/library-3.png';
import library4 from '../assets/images/projects/library-4.png';
import library5 from '../assets/images/projects/library-5.png';
import physipal1 from '../assets/images/projects/physipal-1.png';
import physipal2 from '../assets/images/projects/physipal-2.png';
import physipal3 from '../assets/images/projects/physipal-3.png';
import physipal4 from '../assets/images/projects/physipal-4.png';

// These icons are pure white silhouettes designed to sit directly on a
// colored gradient background - wrapping them in the light icon-chip (used
// elsewhere to fix low-contrast dark icons) would make them invisible.
export const whiteIcons = [car, expenseTracker, fileX, librarySystem, physipal, snakeGame, snapEdit];

// Pure black/near-black icons with no self-contained color backdrop (unlike
// e.g. wordpress/php, which bake their own colored circle into the SVG).
// On a dark pill background these need inverting to stay visible; colored
// brand icons must NOT be inverted (it would corrupt their hue).
export const monochromeIcons = [mysql, learndash, chatbot, twelveMinPrep, github];

export const skills = [
    {
        imageUrl: java,
        name: "Java",
        type: "Programming",
        description: "Enterprise-grade programming",
        usage: "Backend services, Android development, and scalable system design",
        experience: "3+ years",
        projects: ["YSI-INET", "FileX", "Library Management System"]
    },
    {
        imageUrl: python,
        name: "Python",
        type: "Programming",
        description: "Versatile scripting & data",
        usage: "Backend services, data processing, AI-assisted workflows, and automation scripts",
        experience: "2+ years",
        projects: ["SnapEdit", "Data Analytics"]
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Programming",
        description: "Full-stack web language",
        usage: "Interactive features, REST API integration, WordPress customization, and modern ES6+ development",
        experience: "3+ years",
        projects: ["YSI-INET", "12MinPrep", "Portfolio"]
    },
    {
        imageUrl: php,
        name: "PHP",
        type: "Backend",
        description: "Server-side scripting",
        usage: "WordPress custom plugins & themes, backend logic, and database-driven web applications",
        experience: "2+ years",
        projects: ["YSI-INET", "12MinPrep", "AI Chatbot", "Physipal"]
    },
    {
        imageUrl: mysql,
        name: "MySQL",
        type: "Database",
        description: "Relational database management",
        usage: "Schema design, complex queries, query optimization, indexing strategies, and data modeling",
        experience: "2+ years",
        projects: ["YSI-INET", "12MinPrep", "Library Management"]
    },
    {
        imageUrl: postgresql,
        name: "PostgreSQL",
        type: "Database",
        description: "Advanced relational database",
        usage: "Database design, API development, data modeling, and performance optimization",
        experience: "1+ year",
        projects: ["Enterprise Platforms", "Backend Services"]
    },
    {
        imageUrl: wordpress,
        name: "WordPress",
        type: "CMS",
        description: "Custom plugins & themes",
        usage: "Full website lifecycle including custom theme & plugin development, hosting, security, and optimization",
        experience: "2+ years",
        projects: ["YSI-INET", "12MinPrep", "AI Chatbot", "Client Websites"]
    },
    {
        imageUrl: woocommerce,
        name: "WooCommerce",
        type: "E-commerce",
        description: "WordPress e-commerce",
        usage: "Custom plugin development, payment integration, product management, and store customization",
        experience: "2+ years",
        projects: ["E-commerce Sites", "Custom WooCommerce Plugins"]
    },
    {
        imageUrl: learndash,
        name: "LearnDash",
        type: "LMS",
        description: "Learning management system",
        usage: "Custom plugin development, course management, student progress tracking, and LMS customization",
        experience: "1+ year",
        projects: ["12MinPrep", "AI Chatbot", "Learning Platforms"]
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
        description: "Modern UI development (Basic)",
        usage: "Component-based applications, state management, hooks, and responsive interfaces",
        experience: "1+ year",
        projects: ["Portfolio", "Expense Management System"]
    },
    {
        imageUrl: html,
        name: "HTML5",
        type: "Frontend",
        description: "Semantic markup & accessibility",
        usage: "Building responsive, accessible, well-structured web pages and email templates",
        experience: "3+ years",
        projects: ["All Web Projects"]
    },
    {
        imageUrl: css,
        name: "CSS3",
        type: "Frontend",
        description: "Styling & responsive design",
        usage: "Responsive layouts, animations, Flexbox, Grid, and modern UI patterns",
        experience: "3+ years",
        projects: ["All Web Projects"]
    },
    {
        imageUrl: api,
        name: "REST APIs",
        type: "Backend",
        description: "API development & integration",
        usage: "Building and consuming REST APIs, third-party integrations, and data exchange",
        experience: "2+ years",
        projects: ["AI Chatbot", "YSI-INET", "12MinPrep", "Expense Management"]
    },
    {
        imageUrl: playwright,
        name: "Playwright",
        type: "Testing",
        description: "E2E automated testing",
        usage: "End-to-end UI testing, workflow validation, and improving release stability",
        experience: "1+ year",
        projects: ["YSI-INET", "WisdmLabs Products"]
    },
    {
        imageUrl: git,
        name: "Git",
        type: "DevOps",
        description: "Version control system",
        usage: "Code versioning, branching strategies, collaboration, and deployment workflows",
        experience: "3+ years",
        projects: ["All Projects"]
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "DevOps",
        description: "Code hosting & CI/CD",
        usage: "Repository management, pull requests, issue tracking, and deployment pipelines",
        experience: "3+ years",
        projects: ["All Projects"]
    },
    {
        imageUrl: cloudways,
        name: "Cloud & Deployment",
        type: "DevOps",
        description: "Cloudways, cPanel",
        usage: "Cloud deployment, server management, FTP/SFTP, and CLI operations",
        experience: "1+ year",
        projects: ["YSI-INET", "12MinPrep", "Client Sites"]
    },
    {
        imageUrl: cloudflare,
        name: "Cloudflare",
        type: "DevOps",
        description: "CDN, DNS & edge security",
        usage: "CDN configuration, DNS management, caching rules, and edge security for production sites",
        experience: "1+ year",
        projects: ["YSI-INET", "12MinPrep"]
    },
    {
        imageUrl: android,
        name: "Android Dev",
        type: "Mobile",
        description: "Mobile application development",
        usage: "Android SDK, Java-based mobile apps, SQLite databases, and UI design",
        experience: "1+ year",
        projects: ["FileX"]
    },
];


export const experiences = [
    {
        title: "MSc Artificial Intelligence",
        company_name: "University of Galway",
        role: "Academic",
        icon: github,
        iconBg: "#2a9d8f",
        date: "Sep 2026 - Present",
        duration: "1 year",
        location: "Galway, Ireland",
        teamSize: "Solo / Academic",
        website: "https://github.com/Mayesh21",
        technologies: ["Machine Learning", "Deep Learning", "NLP", "Python"],
        achievements: [
            "Transitioning from industry software engineering into formal AI graduate studies",
            "Pursuing a 1-year, full-time MSc in Artificial Intelligence"
        ],
        points: [
            "Deepening theoretical and practical expertise in machine learning, deep learning, and intelligent systems.",
            "Building on prior industry experience in scalable web systems and AI-assisted development to specialize further in AI/ML."
        ],
    },
    {
        title: "Software Engineer",
        company_name: "WisdmLabs",
        role: "Full-time",
        icon: wisdmlabsIcon,
        iconBg: "#f4a261",
        iconFit: "cover",
        date: "Jan 2024 - Aug 2026",
        duration: "2.5+ years",
        location: "Pune, India",
        teamSize: "150+ developers",
        website: "https://wisdmlabs.com",
        technologies: ["WordPress", "PHP", "Java", "Python", "JavaScript", "React", "MySQL", "PostgreSQL", "LearnDash", "WooCommerce", "Playwright", "Cloudways", "Cloudflare", "Cursor", "Claude Code"],
        achievements: [
            "Delivered multiple client projects (YSI-INET, 12MinPrep) with high satisfaction by translating requirements into scalable solutions",
            "Improved platform reliability and release stability using automated E2E testing with Playwright",
            "Built KnowVault, a WordPress RAG-based AI chatbot plugin with multi-LLM support and a LearnDash-aware extension that scopes answers to a learner's course access",
            "Optimized database performance using advanced SQL query improvements and indexing strategies",
            "Enhanced development efficiency through AI-assisted workflows (Cursor, Claude Code) and optimized debugging",
            "Managed full deployment pipelines including hosting, security, CDN, and server configurations"
        ],
        points: [
            "Collaborated directly with clients to gather requirements, architect solutions, and deliver scalable, high-performance web products.",
            "Developed and customized WordPress themes and plugins, managing full website lifecycle including hosting, security, and optimization.",
            "Built and integrated backend services using Java and Python, with practical exposure to data processing and API-driven architectures.",
            "Designed and optimized SQL databases (MySQL, PostgreSQL) by writing efficient queries, implementing schemas, and improving performance.",
            "Handled cloud deployment and site management using Cloudways, Cloudflare, FTP, and CLI-based server operations.",
            "Implemented end-to-end automated testing using Playwright to validate UI workflows and improve release stability.",
            "Leveraged AI-assisted development tools (Cursor, Claude Code) for intelligent debugging, code optimization, and secure code review.",
            "Translated business requirements into scalable technical implementations with clean, maintainable, and modular code architecture.",
            "Managed multiple product deployments, performance enhancements, bug resolution, and production support."
        ],
    },
    {
        title: "Personal Projects & Education",
        company_name: "Fergusson College",
        role: "Academic",
        icon: github,
        iconBg: "#e9c46a",
        date: "2019 - 2024",
        duration: "5 years",
        location: "Pune, India",
        teamSize: "Solo / Academic",
        website: "https://github.com/Mayesh21",
        technologies: ["React", "Node.js", "MongoDB", "C#", "Python", "JSP", "Java", "Android SDK", "Git"],
        achievements: [
            "Completed MSc in Computer Science with 79.75% (2022-2024)",
            "Completed BSc in Computer Science with 83.5% (2019-2022)",
            "Built 8+ full-stack applications including MERN stack projects",
            "Created mobile applications for Android platform"
        ],
        points: [
            "Developed a MERN stack Expense Management System with authentication, data visualization, and analytics.",
            "Built FileX, an Android file management app with advanced file operations and SQLite integration.",
            "Created a Library Management System using JSP with admin dashboard and checkout system.",
            "Developed Physipal, an online pharmacy platform with PHP, featuring product catalog and order management.",
            "Built games in C# (Snake Game, Car Race Game) to strengthen problem-solving and game development skills.",
            "Designed SnapEdit, a Python-based photo editor using PIL/Pillow and Tkinter.",
            "Coursework: Data Structures, Algorithms, Database Systems, Software Engineering, Computer Networks, Android Development."
        ],
    },
];

export const certifications = [
    {
        name: "Google Data Analytics Professional Certificate",
        issuer: "Coursera (Google)",
    },
    {
        name: "R Programming",
        issuer: "Coursera",
    },
    {
        name: "UX Design",
        issuer: "Coursera",
    },
];


export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/Mayesh21/',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/mayesh-dani-9a37bb206/',
    }
];

export const projects = [
    {
        id: 'ai-chatbot',
        iconUrl: chatbot,
        theme: 'btn-back-pink',
        name: 'AI Chatbot System (WordPress Plugin)',
        description: 'A WordPress plugin implementing a RAG-based AI chatbot with multi-LLM support and a LearnDash-aware extension that scopes answers to a learner\'s actual course access.',
        longDescription: 'Built a production-grade WordPress plugin implementing a full Retrieval-Augmented Generation (RAG) pipeline - document loading, chunking, embeddings, retrieval, and re-ranking - trained on WordPress content, uploaded documents, and external URLs. Supports multiple LLM providers (OpenAI, Anthropic Claude, Google Gemini, Together AI) with vector storage kept in-house (local WordPress DB) by default and swappable to Pinecone for scale. Also developed a companion LearnDash user-awareness extension that scopes chatbot responses to a logged-in learner\'s real course access - if a learner asks about content from a course they are not enrolled in, the bot prompts them to enroll instead of answering. Added WooCommerce/LearnDash-aware product and course recommendations directly inside the chat.',
        technologies: ['WordPress', 'PHP', 'MySQL', 'RAG / NLP', 'LearnDash', 'REST APIs'],
        technologyIcons: [wordpress, php, mysql, nlp, learndash, api],
        category: 'AI / Automation',
        difficulty: 'Advanced',
        status: 'Completed',
        date: '2025',
        timeSpent: '12 months',
        githubUrl: 'https://github.com/Mayesh-wisdm/AI-Chatbot-Extension',
        liveUrl: null,
        screenshots: [],
        features: ['RAG Pipeline (Chunking, Embeddings, Retrieval)', 'Multi-LLM Support (OpenAI, Claude, Gemini, Together AI)', 'LearnDash Course-Access Awareness', 'Local + Pinecone Vector Storage', 'WooCommerce & LearnDash Recommendations', 'Chat History & Search'],
        challenges: ['Scoping RAG responses to per-user LearnDash course access', 'Local vector search performance vs. Pinecone migration path', 'Abstracting multiple LLM providers behind one interface'],
        learnings: ['RAG System Architecture', 'Vector Search & Embeddings', 'LearnDash Hook-Based Integration', 'Multi-LLM Provider Abstraction'],
        link: 'https://github.com/Mayesh-wisdm/AI-Chatbot-Extension',
    },
    {
        id: 'ysi-inet',
        iconUrl: ysi,
        theme: 'btn-back-blue',
        name: 'YSI-INET (Enterprise Web Platform)',
        description: 'Architected and developed a WordPress-based enterprise platform with custom theme/plugin enhancements, secure backend services, and optimized SQL operations.',
        longDescription: 'Enterprise web platform built on WordPress with custom theme and plugin enhancements. Integrated secure backend services with optimized SQL database operations and structured data flow. Managed deployment, hosting, CDN, and security configurations using Cloudways and Jetpack. Improved performance through caching strategies, query optimization, and resource handling.',
        technologies: ['WordPress', 'PHP', 'MySQL', 'JavaScript', 'Cloudways', 'Jetpack'],
        technologyIcons: [wordpress, php, mysql, javascript, cloudways, jetpack],
        category: 'Web Application',
        difficulty: 'Advanced',
        status: 'Completed',
        date: '2024',
        timeSpent: '4+ months',
        githubUrl: null,
        liveUrl: 'https://ysi.ineteconomics.org/',
        screenshots: [ysiInet1, ysiInet2, ysiInet3],
        features: ['Custom Theme & Plugins', 'Secure Backend Services', 'Optimized SQL Operations', 'CDN & Caching', 'Deployment Pipeline'],
        challenges: ['Enterprise-scale performance', 'Security hardening', 'Complex data flow architecture'],
        learnings: ['Enterprise WordPress Architecture', 'Cloud Deployment', 'Performance Optimization', 'Security Best Practices'],
        link: 'https://ysi.ineteconomics.org/',
    },
    {
        id: '12minprep',
        iconUrl: twelveMinPrep,
        theme: 'btn-back-green',
        name: '12MinPrep (EdTech Learning Platform)',
        description: 'Developed and customized a dynamic EdTech learning platform with scalable WordPress architecture, REST API integrations, and backend automation.',
        longDescription: 'EdTech learning platform built with scalable WordPress architecture. Developed dynamic learning modules, implemented feature enhancements, REST API integrations, and backend automation. Optimized system performance and database queries to support seamless content delivery. Managed site reliability, deployments, updates, and production monitoring.',
        technologies: ['WordPress', 'PHP', 'MySQL', 'REST APIs', 'JavaScript', 'LearnDash'],
        technologyIcons: [wordpress, php, mysql, api, javascript, learndash],
        category: 'Web Application',
        difficulty: 'Intermediate',
        status: 'Completed',
        date: '2024',
        timeSpent: '3+ months',
        githubUrl: null,
        liveUrl: 'https://12minprep.com/',
        screenshots: [minprep1, minprep2, minprep3],
        features: ['Dynamic Learning Modules', 'REST API Integration', 'Backend Automation', 'Performance Optimization', 'Production Monitoring'],
        challenges: ['Scalable content delivery', 'Database query optimization', 'Seamless user experience'],
        learnings: ['EdTech Platform Architecture', 'REST API Design', 'WordPress at Scale', 'Site Reliability'],
        link: 'https://12minprep.com/',
    },
    {
        id: 'expense-tracker',
        iconUrl: expenseTracker,
        theme: 'btn-back-blue',
        name: 'Expense Management System',
        description: 'A MERN stack web application to track and manage personal expenses, providing detailed insights into spending patterns.',
        longDescription: 'A comprehensive expense tracking application built with the MERN stack. Features include user authentication, expense categorization, data visualization, and detailed analytics to help users understand their spending habits.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Chart.js'],
        technologyIcons: [react, nodejs, mongodb, express, chartjs],
        category: 'Web Application',
        difficulty: 'Intermediate',
        status: 'Completed',
        date: '2024',
        timeSpent: '3 months',
        githubUrl: 'https://github.com/Mayesh21/ExpenseManagementSystem',
        liveUrl: null,
        screenshots: [],
        features: ['User Authentication', 'Expense Tracking', 'Data Visualization', 'Category Management', 'Monthly Reports'],
        challenges: ['Real-time data updates', 'Complex state management', 'Data visualization'],
        learnings: ['MERN Stack Development', 'State Management', 'Chart.js Integration', 'MongoDB Aggregation'],
        link: 'https://github.com/Mayesh21/ExpenseManagementSystem',
    },
    {
        id: 'snake-game',
        iconUrl: snakeGame,
        theme: 'btn-back-green',
        name: 'Snake Game (C#)',
        description: 'A simple yet addictive Snake game developed in C# as a fun personal project to hone game development skills.',
        longDescription: 'Classic Snake game implementation in C# using Windows Forms. Features include score tracking, increasing difficulty, and smooth gameplay mechanics.',
        technologies: ['C#', 'Windows Forms', '.NET'],
        technologyIcons: [csharp, windows, dotnet],
        category: 'Game',
        difficulty: 'Beginner',
        status: 'Completed',
        date: '2023',
        timeSpent: '2 weeks',
        githubUrl: 'https://github.com/Mayesh21/Custom-Games',
        liveUrl: null,
        screenshots: [],
        features: ['Score Tracking', 'Increasing Difficulty', 'Smooth Controls', 'Game Over Detection'],
        challenges: ['Collision detection', 'Game loop optimization'],
        learnings: ['C# Programming', 'Game Development', 'Windows Forms', 'Event Handling'],
        link: 'https://github.com/Mayesh21/Custom-Games',
    },
    {
        id: 'car-race-game',
        iconUrl: car,
        theme: 'btn-back-red',
        name: 'Car Race Game (C#)',
        description: 'A racing game developed in C#, where users can race cars, improving logic and game mechanics skills.',
        longDescription: '2D racing game built with C# and Windows Forms. Players control a car, avoid obstacles, and compete for the best time.',
        technologies: ['C#', 'Windows Forms', '.NET'],
        technologyIcons: [csharp, windows, dotnet],
        category: 'Game',
        difficulty: 'Beginner',
        status: 'Completed',
        date: '2023',
        timeSpent: '3 weeks',
        githubUrl: 'https://github.com/Mayesh21/Custom-Games',
        liveUrl: null,
        screenshots: [],
        features: ['Car Controls', 'Obstacle Avoidance', 'Timer System', 'Multiple Levels'],
        challenges: ['Physics simulation', 'Level design'],
        learnings: ['Game Physics', 'Level Design', 'User Input Handling', 'Performance Optimization'],
        link: 'https://github.com/Mayesh21/Custom-Games',
    },
    {
        id: 'library-system',
        iconUrl: librarySystem,
        theme: 'btn-back-yellow',
        name: 'Library Management System (JSP)',
        description: 'A web-based library management system developed using JSP, allowing users to manage books, checkouts, and user data.',
        longDescription: 'Complete library management solution with book cataloging, user management, checkout system, and administrative dashboard.',
        technologies: ['JSP', 'Java', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
        technologyIcons: [java, java, mysql, html, css, javascript],
        category: 'Web Application',
        difficulty: 'Intermediate',
        status: 'Completed',
        date: '2023',
        timeSpent: '2 months',
        githubUrl: 'https://github.com/Mayesh21/LiberaryManagementSystem',
        liveUrl: null,
        screenshots: [library1, library2, library3, library4, library5],
        features: ['Book Management', 'User Registration', 'Checkout System', 'Admin Dashboard', 'Search Functionality'],
        challenges: ['Database design', 'Session management', 'Security implementation'],
        learnings: ['JSP Development', 'Database Design', 'Web Security', 'User Authentication'],
        link: 'https://github.com/Mayesh21/LiberaryManagementSystem',
    },
    {
        id: 'filex',
        iconUrl: fileX,
        theme: 'btn-back-black',
        name: 'FileX - File Management System (Android)',
        description: 'An Android app built in Java to manage files on mobile devices, providing features like sorting, searching, and organizing files.',
        longDescription: 'Comprehensive file management application for Android devices with advanced file operations, cloud integration, and user-friendly interface.',
        technologies: ['Java', 'Android SDK', 'SQLite', 'XML'],
        technologyIcons: [java, android, sqlite, xml],
        category: 'Mobile Application',
        difficulty: 'Intermediate',
        status: 'Completed',
        date: '2023',
        timeSpent: '2 months',
        githubUrl: 'https://github.com/Mayesh21/FileX',
        liveUrl: null,
        screenshots: [filex1, filex2, filex3, filex4, filex5, filex6],
        features: ['File Browsing', 'Search & Sort', 'File Operations', 'Cloud Storage', 'User Interface'],
        challenges: ['File permissions', 'Performance optimization', 'UI/UX design'],
        learnings: ['Android Development', 'File System APIs', 'Mobile UI Design', 'Database Integration'],
        link: 'https://github.com/Mayesh21/FileX',
    },
    {
        id: 'snapedit',
        iconUrl: snapEdit,
        theme: 'btn-back-pink',
        name: 'SnapEdit - Basic Photo Editor (Python)',
        description: 'A basic photo editing app developed in Python, offering functionalities like cropping, resizing, and applying filters to images.',
        longDescription: 'Simple yet effective photo editing tool with essential features for basic image manipulation and enhancement.',
        technologies: ['Python', 'PIL/Pillow', 'Tkinter', 'NumPy'],
        technologyIcons: [python, python, tkinter, numpy],
        category: 'Desktop Application',
        difficulty: 'Beginner',
        status: 'Completed',
        date: '2022',
        timeSpent: '1 month',
        githubUrl: 'https://github.com/Mayesh21/',
        liveUrl: null,
        screenshots: [],
        features: ['Image Cropping', 'Resizing', 'Filters', 'Basic Effects', 'File Format Support'],
        challenges: ['Image processing algorithms', 'Memory management'],
        learnings: ['Python Programming', 'Image Processing', 'GUI Development', 'File Handling'],
        link: 'https://github.com/Mayesh21/',
    },
    {
        id: 'physipal',
        iconUrl: physipal,
        theme: 'btn-back-orange',
        name: 'Physipal - Online Pharmacy (PHP)',
        description: 'A web application for an online pharmacy, allowing users to browse, purchase and track delivery of medications.',
        longDescription: 'E-commerce platform for pharmaceutical products with inventory management, order processing, and delivery tracking system.',
        technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        technologyIcons: [php, mysql, html, css, javascript, bootstrap],
        category: 'Web Application',
        difficulty: 'Intermediate',
        status: 'Completed',
        date: '2022',
        timeSpent: '3 months',
        githubUrl: 'https://github.com/Mayesh21/Physipal',
        liveUrl: null,
        screenshots: [physipal1, physipal2, physipal3, physipal4],
        features: ['Product Catalog', 'Shopping Cart', 'Order Management', 'Admin Panel', 'Payment Integration'],
        challenges: ['E-commerce logic', 'Security compliance', 'Inventory management'],
        learnings: ['PHP Development', 'E-commerce Systems', 'Payment Processing', 'Database Design'],
        link: 'https://github.com/Mayesh21/Physipal',
    }
];
