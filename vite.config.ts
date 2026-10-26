import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages serves under /<repo>/; the deploy workflow sets BASE_PATH
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Two pages: original home + Propuesta 2
      input: { main: 'index.html', propuesta2: 'propuesta-2.html' },
      output: {
        // Keep heavy animation libs in their own cacheable chunks
        manualChunks: id => (id.includes('node_modules/ogl') ? 'ogl' : id.includes('node_modules/gsap') ? 'gsap' : undefined),
      },
    },
  },
})
