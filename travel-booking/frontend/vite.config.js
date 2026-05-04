import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Change to '/repository-name/' if deploying to GitHub Pages without custom domain
  optimizeDeps: {
    force: false,
    holdUntilCrawlEnd: false,
  },
})
