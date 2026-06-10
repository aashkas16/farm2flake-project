import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'es-toolkit/compat': path.resolve(__dirname, 'src/es-toolkit-compat')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://farm2flake-backend.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
