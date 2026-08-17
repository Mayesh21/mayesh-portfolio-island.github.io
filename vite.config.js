import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/bundle-report.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  assetsInclude: ['**/*.glb'],
  base: process.env.NODE_ENV === 'production' ? '/mayesh-portfolio-island.github.io/' : '/',
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js into its own chunk (~600KB) - loaded only when 3D scenes need it
          three: ['three'],
          // Split React Three ecosystem (includes react-spring to avoid useLayoutEffect resolution issues)
          'react-three': ['@react-three/fiber', '@react-three/drei', '@react-spring/three'],
          // Split React Router
          'react-router': ['react-router-dom'],
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
