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
import expense1 from '../assets/images/projects/expense-1.png';
import expense2 from '../assets/images/projects/expense-2.png';
import expense3 from '../assets/images/projects/expense-3.png';
import expense4 from '../assets/images/projects/expense-4.png';

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
        description: "Core Java & Android development",
        usage: "Android applications, desktop tools, OOP architecture, and academic/side projects",
        experience: "Academic / Projects",
        projects: ["FileX", "Library Management System"]
    },
    {
        imageUrl: python,
        name: "Python",
        type: "Programming",
        description: "Versatile scripting & data",
        usage: "Data processing, automation scripts, computer vision pipelines, and AI-assisted workflows",
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
        description: "Modern UI & Gutenberg block development",
        usage: "Component-based applications, custom Gutenberg editor components, state management, and responsive interfaces",
        experience: "1.5+ years",
        projects: ["Portfolio", "WordPress Custom Blocks", "Expense Management System"]
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
        title: "Software Engineer",
        company_name: "WisdmLabs",
        role: "Full-time",
        icon: wisdmlabsIcon,
        iconBg: "#f4a261",
        iconFit: "cover",
        date: "Jan 2024 - Aug 2026",
        duration: "2.5+ years",
        location: "Pune, India",
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
            "Developed and customized WordPress themes and plugins, implementing responsive layouts, page designs, and visual UI improvements alongside backend functionality and site lifecycle management.",
            "Built data processing, migration, and automation scripts with Python and shell, alongside API-driven backend integrations and custom Gutenberg React components.",
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
            "Designed SnapEdit, a Python-based image editor with experimental TensorFlow and computer-vision based image upscaling, alongside PIL/Pillow-powered editing tools.",
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
        name: 'KnowVault | RAG & Multi-LLM Chatbot',
        description: 'WordPress plugin implementing an enterprise RAG pipeline with multi-LLM support, configurable knowledge bases, and LearnDash course-access scoping.',
        longDescription: 'Built a RAG-based AI chatbot plugin with document ingestion, chunking, embeddings, retrieval, and reranking to provide responses grounded in the available knowledge base. Ingests and indexes content from WordPress posts, uploaded documents, and external URLs. Supports multiple LLM providers (OpenAI, Anthropic Claude, Google Gemini, Together AI) across configurable chatbot instances for different knowledge bases and use cases. Includes local vector storage within the database with Pinecone support for scaling. Implemented a companion LearnDash extension that restricts responses based on a learner\'s actual course enrollment, prompting enrollment when unowned content is queried, and providing contextual course and product recommendations. Load-tested the chatbot with 500 users, achieving approximately 5-12 second response times under the test load.',
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
        features: ['RAG Pipeline (Chunking, Embeddings, Retrieval, Reranking)', 'Multi-LLM Support (OpenAI, Claude, Gemini, Together AI)', 'Configurable Chatbot Instances & Knowledge Bases', 'LearnDash Course-Access Scoping', 'Local & Pinecone Vector Storage', '500-User Load Testing (5-12s response times)', 'Course & Product Recommendations'],
        challenges: ['Scoping RAG retrieval to authenticated LearnDash course access rules', 'Balancing local vector search latency with Pinecone scalability', 'Normalizing provider API interfaces across OpenAI, Claude, Gemini, and Together AI'],
        learnings: ['RAG Pipeline Implementation & Retrieval Tuning', 'Vector Search & Embeddings Integration', 'LearnDash Hook & Access Scoping', 'Multi-Provider LLM Integration'],
        link: 'https://github.com/Mayesh-wisdm/AI-Chatbot-Extension',
    },
    {
        id: 'ysi-inet',
        iconUrl: ysi,
        theme: 'btn-back-blue',
        name: 'YSI-INET (Research Web Platform)',
        description: 'Web platform serving global research communities, featuring application-side PayPal payout workflows, AI-assisted attendee qualification, and production maintenance.',
        longDescription: 'Maintained and enhanced a web platform serving international economic research communities. Integrated an application-side PayPal payout workflow enabling administrators to review approved amounts and trigger multi-currency payouts (USD, EUR, GBP) via PayPal APIs with automated status retrieval. Built an AI-assisted attendee qualification helper using the site\'s chatbot API to shortlist applicants based on location, travel cost estimates, gender balance, and currency rates. Managed scheduled production maintenance windows using Cloudways and Updraft backups (typically target 30 minutes, extending up to 3 hours for major releases), alongside Cloudflare CDN caching, security updates, and performance tuning.',
        technologies: ['PHP', 'MySQL', 'JavaScript', 'REST APIs', 'Cloudways', 'Cloudflare', 'Jetpack', 'WordPress'],
        technologyIcons: [php, mysql, javascript, api, cloudways, cloudflare, jetpack, wordpress],
        category: 'Web Application',
        difficulty: 'Advanced',
        status: 'Completed',
        date: '2024 - 2026',
        timeSpent: '2+ years',
        githubUrl: null,
        liveUrl: 'https://ysi.ineteconomics.org/',
        screenshots: [ysiInet1, ysiInet2, ysiInet3],
        features: ['Application-Side PayPal Payout Workflows (USD, EUR, GBP)', 'AI-Assisted Attendee Qualification & Shortlisting', 'Custom Gravity Forms Workflows', 'Zoom & Mailchimp Integrations', 'RAG Chatbot Deployment', 'Cloudways & Updraft Maintenance Procedures', 'Cloudflare CDN Caching & Edge Security'],
        challenges: ['Handling multi-currency payout state tracking via PayPal APIs', 'Building attendee qualification criteria without removing human decision-making', 'Executing production releases with reliable rollback procedures within maintenance windows'],
        learnings: ['Third-Party Payment API Workflows', 'AI Integration for Administrative Workflows', 'Production Maintenance & Rollback Strategies', 'Edge Caching & Performance Optimization'],
        link: 'https://ysi.ineteconomics.org/',
    },
    {
        id: '12minprep',
        iconUrl: twelveMinPrep,
        theme: 'btn-back-green',
        name: '12MinPrep (EdTech Learning Platform)',
        description: 'EdTech learning platform delivering test preparation courses, featuring custom LearnDash functionality, AI quiz context integrations, and scheduled maintenance.',
        longDescription: 'Maintained and developed learning platform functionality for an EdTech test preparation site over 2+ years. Enhanced the AI engine with quiz and page context awareness to support learner inquiries, integrated Brevo transactional email automation, and embedded Crisp live chat. Resolved complex LMS template override conflicts, optimized database queries for quiz data, and executed planned production updates within short maintenance windows (targeted around 30 minutes, kept under 1 hour including database backups) using Cloudways and Cloudflare.',
        technologies: ['PHP', 'MySQL', 'JavaScript', 'REST APIs', 'LearnDash', 'Cloudways', 'Cloudflare', 'WordPress'],
        technologyIcons: [php, mysql, javascript, api, learndash, cloudways, cloudflare, wordpress],
        category: 'Web Application',
        difficulty: 'Intermediate',
        status: 'Completed',
        date: '2024 - 2026',
        timeSpent: '2+ years',
        githubUrl: null,
        liveUrl: 'https://12minprep.com/',
        screenshots: [minprep1, minprep2, minprep3],
        features: ['AI Engine Quiz & Page Context Awareness', 'LearnDash LMS Customization & Query Optimization', 'Brevo Transactional Email Workflows', 'Crisp Live Chat Integration', 'Custom Quiz Results Presentation', 'Planned Maintenance Windows (30-60 min with DB backups)', 'Cloudflare & Cloudways Infrastructure Management'],
        challenges: ['Passing active test and quiz context to the AI helper', 'Resolving template override conflicts across LMS updates', 'Minimizing maintenance downtime during database backup and upgrade cycles'],
        learnings: ['LMS Architecture & LearnDash Extension', 'Context-Aware AI Assistant Integration', 'Transactional Email Automation', 'Production Maintenance Planning & Database Backups'],
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
        screenshots: [expense1, expense2, expense3, expense4],
        features: ['User Authentication', 'Expense Tracking', 'Data Visualization', 'Category Management', 'Monthly Reports'],
        challenges: ['Real-time data updates', 'Complex state management', 'Data visualization'],
        learnings: ['MERN Stack Development', 'State Management', 'Chart.js Integration', 'MongoDB Aggregation'],
        link: 'https://github.com/Mayesh21/ExpenseManagementSystem',
    },
    {
        id: 'filex',
        iconUrl: fileX,
        theme: 'btn-back-black',
        name: 'FileX - File Management System (Android)',
        description: 'An Android app built in Java to manage files on mobile devices, providing features like sorting, searching, and organizing files.',
        longDescription: 'Comprehensive file management application for Android devices with advanced file operations, local SQLite metadata storage, and user-friendly interface.',
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
        features: ['File Browsing', 'Search & Sort', 'File Operations', 'File Organization', 'User Interface'],
        challenges: ['File permissions', 'Performance optimization', 'UI/UX design'],
        learnings: ['Android Development', 'File System APIs', 'Mobile UI Design', 'Database Integration'],
        link: 'https://github.com/Mayesh21/FileX',
    },
    {
        id: 'snapedit',
        iconUrl: snapEdit,
        theme: 'btn-back-pink',
        name: 'SnapEdit - Python Photo Editor',
        description: 'Python-based desktop photo editor with PIL/Pillow image manipulation and an experimental TensorFlow super-resolution upscaling pipeline.',
        longDescription: 'Desktop image editor combining standard PIL/Pillow editing tools (crop, resize, filters, adjustments) with a computer-vision upscaling module powered by TensorFlow, enabling AI-assisted resolution enhancement on consumer hardware.',
        technologies: ['Python', 'PIL/Pillow', 'TensorFlow', 'Tkinter', 'NumPy', 'OpenCV'],
        technologyIcons: [python, python, tkinter, numpy],
        category: 'Desktop Application',
        difficulty: 'Intermediate',
        status: 'Completed',
        date: '2022',
        timeSpent: '2 months',
        githubUrl: 'https://github.com/Mayesh21/',
        liveUrl: null,
        screenshots: [],
        features: ['Image Cropping', 'Resizing', 'Filters', 'AI Super-Resolution Upscaling', 'Brightness/Contrast Adjustments', 'File Format Support'],
        challenges: ['TensorFlow model integration on CPU', 'Memory management for large images', 'Real-time preview performance'],
        learnings: ['Computer Vision', 'TensorFlow Inference', 'Python Image Processing', 'GUI Development'],
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
        features: ['Product Catalog', 'Shopping Cart', 'Order Management', 'Admin Panel', 'Order Checkout Flow'],
        challenges: ['E-commerce logic', 'Security compliance', 'Inventory management'],
        learnings: ['PHP Development', 'E-commerce Systems', 'Payment Processing', 'Database Design'],
        link: 'https://github.com/Mayesh21/Physipal',
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
    }
];

export const clientWork = [
    {
        id: 'anr-kydex',
        name: 'ANR Kydex Holsters',
        url: 'https://www.anrkydexholsters.com/',
        timeline: 'Aug 2024 - Jan 2025',
        category: 'E-Commerce Architecture & Custom Pricing',
        scope: [
            'Engineered a custom WooCommerce product type for highly configurable holsters with dynamic conditional pricing logic.',
            'Implemented abandoned cart and browse recovery tracking across all user states, including guest sessions.',
        ],
        technologies: ['PHP', 'WooCommerce', 'JavaScript', 'REST APIs', 'WordPress'],
        technologyIcons: [php, woocommerce, javascript, api, wordpress],
    },
    {
        id: 'amp-singapore',
        name: 'AMP Singapore',
        url: 'https://amp.org.sg/',
        timeline: 'Jan 2025 - Apr 2025',
        category: 'Subscription Migration & High-Volume Data',
        scope: [
            'Migrated 16,000+ donation orders and recurring subscriptions from GiveWP to WooCommerce Subscriptions, including custom database queries to export and match user data and Stripe token relationships that plugin exports could not cover.',
            'Validated the migration on staging with equivalent data before production. Linked subscription history and token relationships via custom hooks post-import, with live-site validation required to confirm migrated Stripe payment tokens because test environments cannot validate live tokens directly.',
        ],
        technologies: ['PHP', 'WooCommerce Subscriptions', 'MySQL', 'Stripe API', 'GiveWP', 'WordPress'],
        technologyIcons: [php, woocommerce, mysql, api, wordpress],
    },
    {
        id: 'classic-radio-club',
        name: 'Classic Radio Club',
        url: 'https://classicradioclub.com/',
        timeline: 'Jan 2026 - Jul 2026',
        category: 'Server Migration & Membership Systems',
        scope: [
            'Executed full-site server migration across disparate hosting providers with staging trials, database sanitation, and corrupted file recovery.',
            'Migrated recurring memberships from Subscriptio to WooCommerce Subscriptions and resolved Stripe risk compliance flags.',
        ],
        technologies: ['PHP', 'WooCommerce Subscriptions', 'MySQL', 'Stripe API', 'Cloudways', 'WordPress'],
        technologyIcons: [php, woocommerce, mysql, api, cloudways, wordpress],
    },
    {
        id: 'forklift-training',
        name: 'Forklift Training',
        url: 'https://forklifttraining.com/',
        timeline: 'Ad-hoc / On-demand',
        category: 'Enterprise LMS & Document Automation',
        scope: [
            'Built custom LearnDash group management workflows for enterprise training cohorts.',
            'Automated course completion certificate generation with custom branded PDF rendering.',
        ],
        technologies: ['PHP', 'LearnDash', 'JavaScript', 'MySQL', 'WordPress'],
        technologyIcons: [php, learndash, javascript, mysql, wordpress],
    },
    {
        id: 'bcacc-practicum',
        name: 'BCACC Practicum',
        url: 'https://practicum.bcacc.ca/',
        timeline: 'Apr 2026 - Aug 2026',
        category: 'Directory Portal & Geospatial Matching',
        scope: [
            'Developed student-supervisor matching portal with GeoDirectory mapping, interactive location filters, and LinkedIn student directory integration.',
            'Engineered custom session management, role-based access restrictions, multi-listing support, and Divi PHP hooks.',
        ],
        technologies: ['PHP', 'GeoDirectory', 'JavaScript', 'MySQL', 'LinkedIn API', 'WordPress'],
        technologyIcons: [php, javascript, mysql, linkedin, api, wordpress],
    },
    {
        id: 'ceasap',
        name: 'CEASAP',
        url: 'https://ceasap.com/',
        timeline: 'Jan 2025 - Apr 2025',
        category: 'EdTech UI/UX & Marketing Automation',
        scope: [
            'Collaborated on multi-course EdTech platform frontend with responsive Elementor component layouts.',
            'Integrated Brevo transactional email automation and lead-capture workflows.',
        ],
        technologies: ['PHP', 'JavaScript', 'CSS', 'Brevo API', 'WordPress'],
        technologyIcons: [php, javascript, css, api, wordpress],
    },
    {
        id: 'lionheart',
        name: 'Lionheart',
        url: 'https://lionheart.org/',
        timeline: 'Ad-hoc / On-demand',
        category: 'Production Migration & E-Learning',
        scope: [
            'Executed live production migration for order management pipelines with zero transactional loss.',
            'Delivered SCORM e-learning content integrations and customized WooCommerce product templates.',
        ],
        technologies: ['PHP', 'WooCommerce', 'SCORM', 'MySQL', 'WordPress'],
        technologyIcons: [php, woocommerce, mysql, wordpress],
    },
];
