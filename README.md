# Mayesh Dani | 3D Portfolio

**A little island on the internet where I showcase what I build.** 🌴

[**Live Portfolio →**](https://mayesh-dani.vercel.app/)

This is my personal 3D portfolio, built to be more than a collection of projects and a resume.

Instead of scrolling through a traditional portfolio, you can explore an interactive 3D island, discover my work, learn a little about me, and get in touch.

Built with React, Three.js, Vite, and a lot of experimentation.

## ✨ What you can explore

* 🌴 **Interactive 3D island**
  Move around the scene and interact with the environment.

* 🧑‍💻 **About me**
  My skills, experience, and the things I'm interested in building.

* 🚀 **Projects**
  A selection of projects I've worked on, with details, screenshots, and links.

* 📬 **Contact**
  Send me a message through the contact section, featuring an animated fox.

* 🌙 **Dark mode**
  Switch between themes, with your preference saved for future visits.

* 📱 **Responsive design**
  Designed to work across desktop, tablet, and mobile.

* ⚡ **Smooth interactions**
  Animations and transitions keep the experience feeling alive without getting in the way.

* 📴 **Offline support**
  The app shell is cached so the experience can load faster on repeat visits.

## 🛠️ Built with

| Technology            | What it's used for                |
| --------------------- | --------------------------------- |
| **React 19**          | UI and application structure      |
| **Vite 8**            | Development and production builds |
| **Three.js**          | 3D graphics                       |
| **React Three Fiber** | React renderer for Three.js       |
| **React Three Drei**  | Useful helpers for 3D scenes      |
| **Tailwind CSS 4**    | Styling and responsive UI         |
| **React Spring**      | Animations and interactions       |
| **React Router**      | Client-side routing               |
| **EmailJS**           | Contact form                      |
| **Vitest**            | Testing                           |

## 🗺️ The island

The portfolio is split into a few different experiences:

**Home**
An interactive 3D island that acts as the starting point. Drag to explore or use the arrow keys.

**About**
A closer look at my background, skills, and experience.

**Projects**
The work I've built and the problems I've enjoyed solving.

**Contact**
A small animated fox and a contact form for getting in touch.

## 📁 Project structure

```text
src/
├── components/       # Reusable UI components
├── pages/            # Page-level components
├── models/           # 3D model components
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── constants/        # App data and configuration
├── assets/           # Images, icons, and 3D assets
└── styles/           # Global styles
```

## 🚀 Running locally

Want to explore the project or make your own changes?

Clone the repository, install the dependencies, and start the development server:

```bash
git clone <your-repository-url>
cd <your-project-folder>
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment variables

The contact form uses EmailJS. Create a `.env.local` file in the project root:

```env
VITE_APP_EMAILJS_SERVICE_ID=...
VITE_APP_EMAILJS_TEMPLATE_ID=...
VITE_APP_EMAILJS_PUBLIC_KEY=...
```

### Available scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
npm test          # Run tests
npm run analyze   # Analyze the production bundle
```

## ☁️ Deployment

The portfolio is deployed on **Vercel**.

The `main` branch is connected to Vercel, so pushing new changes automatically triggers a new deployment.

## 🎨 3D assets

The island, plane, and fox models were originally sourced through the **JS Mastery 3D portfolio tutorial** and ultimately come from Sketchfab creators.

I have customized the scenes, interactions, presentation, and the rest of the portfolio around them.

If you are interested in the original tutorial, check out:

[**Build and Deploy an Amazing 3D Web Developer Portfolio | JS Mastery**](https://www.youtube.com/watch?v=FkowOdMjvYo)

Please refer to the original model authors and their respective licenses before reusing any of the 3D assets.

## 🙌 Acknowledgements

This project started with the **JS Mastery 3D portfolio tutorial** and evolved into my own portfolio through experimentation, customization, and a lot of tweaking.

The tutorial gave me the starting point. The rest of the site is where I made it mine.

## 📫 Let's connect

If you'd like to talk about a project, technology, or just say hello:

* **Email:** [mayeshdani@gmail.com](mailto:mayeshdani@gmail.com)
* **LinkedIn:** [Mayesh Dani](https://www.linkedin.com/in/mayesh-dani-9a37bb206/)
* **GitHub:** [Mayesh21](https://github.com/Mayesh21)

---

<p align="center">
  Built with React, Three.js, curiosity, and probably too much coffee. ☕
</p>

