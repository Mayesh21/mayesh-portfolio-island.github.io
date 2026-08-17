# Mayesh Dani - 3D Portfolio

An interactive 3D portfolio built with React, Three.js, and Vite showcasing my skills, projects, and experience in web development.

## 🚀 Features

- **Interactive 3D Environment**: Explore an immersive island with rotating 3D models
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by React Spring for fluid interactions
- **Contact Form**: Integrated with EmailJS for seamless communication
- **Modern Tech Stack**: Built with React 18, Three.js, and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Styling**: Tailwind CSS
- **Animations**: React Spring
- **Email Service**: EmailJS
- **Routing**: React Router DOM

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mayesh21/mayesh-portfolio-island.github.io.git
   cd mayesh-portfolio-island.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_APP_EMAILJS_SERVICE_ID=your_service_id
   VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🎮 Usage

- **Navigate**: Use the navigation bar to explore different sections
- **3D Interaction**: Click and drag to rotate the island, or use arrow keys
- **Contact**: Fill out the contact form to get in touch
- **Audio**: Toggle background music with the sound button

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

## 🚀 Deployment

### GitHub Pages
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy to GitHub Pages using the `dist` folder

### Other Platforms
Upload the contents of the `dist` folder to your hosting provider.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 3D Models

The portfolio uses custom 3D models:
- **Island**: Main interactive environment
- **Sky**: Dynamic background
- **Bird**: Animated flying element
- **Plane**: Flying aircraft
- **Fox**: Interactive character in contact section

## 📦 Bundle Analysis & Optimization

- Run `npm run analyze` to generate a visual bundle report (`dist/bundle-report.html`).
- Use the report to identify large dependencies and optimize your bundle (e.g., code splitting, removing unused packages).

## 🖼️ Image Optimization

- Convert all `.jpg`/`.png` images in `src/assets/images/` to `.webp` using [Squoosh](https://squoosh.app/) or [imagemin](https://github.com/imagemin/imagemin).
- Use the `OptimizedImage` component for all image rendering in React components.
- For large images, provide multiple resolutions and use the `sizes` prop for responsive loading.
- Keep image file sizes as small as possible for fast loading and better Core Web Vitals.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- **Email**: mayeshdani@gmail.com
- **LinkedIn**: [Mayesh Dani](https://www.linkedin.com/in/mayesh-dani-9a37bb206/)
- **GitHub**: [Mayesh21](https://github.com/Mayesh21/)
