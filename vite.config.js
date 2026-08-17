import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: './dist/bundle-report.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  assetsInclude: ['**/*.glb'],
  // GitHub Pages serves this app from a /<repo-name>/ subpath, so production
  // builds need that baked into every asset URL. Vercel serves from the
  // domain root instead - VERCEL is auto-set in Vercel's build environment,
  // so use it to skip the GH Pages subpath there (it would 404 everything).
  base: process.env.VERCEL
    ? '/'
    : process.env.NODE_ENV === 'production' ? '/mayesh-portfolio-island.github.io/' : '/',
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Windows module ids use backslashes - normalize before matching
          const normalized = id.replace(/\\/g, '/')
          // Split Three.js into its own chunk (~600KB) - loaded only when 3D scenes need it
          if (normalized.includes('/node_modules/three/')) return 'three'
          // Split React Three ecosystem (includes react-spring to avoid useLayoutEffect resolution issues)
          if (
            normalized.includes('/node_modules/@react-three/fiber') ||
            normalized.includes('/node_modules/@react-three/drei') ||
            normalized.includes('/node_modules/@react-spring/three')
          ) {
            return 'react-three'
          }
          // Split React Router
          if (normalized.includes('/node_modules/react-router-dom')) return 'react-router'
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: true,
  },
})
