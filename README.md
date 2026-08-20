# Mayesh Dani — 3D Portfolio

My personal interactive 3D portfolio — built with React, Three.js, and Vite to showcase my skills, projects, and experience as a software engineer. Explore an immersive 3D island, browse my work, and get in touch.

**Live:** https://mayesh-dani.vercel.app/

## ✨ Features

- **Interactive 3D Environment**: Explore an immersive island with rotating 3D models
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by React Spring for fluid interactions
- **Contact Form**: Integrated with EmailJS
- **Dark Mode**: Theme toggle with persisted preference
- **Offline Support**: Service worker precaches the app shell for repeat visits
- **Modern Tech Stack**: React 19, Vite 8, Three.js, and Tailwind CSS 4

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Styling**: Tailwind CSS 4
- **Animations**: React Spring
- **Email Service**: EmailJS
- **Routing**: React Router DOM
- **Testing**: Vitest, React Testing Library

## 🎮 Sections

- **Home**: Interactive 3D island — click and drag to rotate, or use arrow keys
- **About**: My skills, work experience, and background
- **Projects**: Selected work with screenshots and links
- **Contact**: Reach me via the form (animated fox scene)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main page components
├── models/             # 3D model components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── constants/          # App constants and data
├── assets/             # Static assets (images, icons, 3D models)
└── styles/             # Global styles
```

## 💻 Local Development

For working on the site locally. Requires an `.env.local` with my EmailJS keys:

```env
VITE_APP_EMAILJS_SERVICE_ID=...
VITE_APP_EMAILJS_TEMPLATE_ID=...
VITE_APP_EMAILJS_PUBLIC_KEY=...
```

Scripts:

- `npm run dev` — Start development server (`http://localhost:5173`)
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint
- `npm test` — Run the test suite (Vitest)
- `npm run analyze` — Build and open a bundle-size report

## 🚀 Deployment

Deployed on **Vercel** — connected via Git integration, pushes to `main` auto-deploy. `vercel.json` rewrites all routes to `index.html` for client-side routing.

## 🎨 3D Models

- **Island**: Main interactive environment
- **Sky**: Dynamic background
- **Bird**: Animated flying element
- **Plane**: Flying aircraft
- **Fox**: Interactive character in the contact section

## 🙏 Credits & Reference

Built by following JS Mastery's tutorial — [Build and Deploy an Amazing 3D Web Developer Portfolio](https://www.youtube.com/watch?v=FkowOdMjvYo). The base 3D models — **island, plane, and fox** — come from that tutorial (originally sourced from Sketchfab; see the video description for the original model authors and licenses).

If you want to build a similar 3D portfolio, that video is a great starting point.

## 📄 Ownership

© Mayesh Dani.

This is my personal portfolio. My content — project write-ups, screenshots, copy, skills/experience data, and site customizations — is mine; please don't republish it as your own. The base 3D models (island, plane, fox) belong to their original authors (see Credits). To build your own, follow the tutorial above rather than cloning this repo.

## 📞 Contact

- **Email**: mayeshdani@gmail.com
- **LinkedIn**: [Mayesh Dani](https://www.linkedin.com/in/mayesh-dani-9a37bb206/)
- **GitHub**: [Mayesh21](https://github.com/Mayesh21/)
