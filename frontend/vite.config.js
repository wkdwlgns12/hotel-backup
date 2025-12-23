import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true
  },
  server: {
    proxy: {
      '/api': {
        // .env의 VITE_API_BASE_URL이 있으면 그것을 사용, 없으면 localhost
        target: process.env.VITE_API_BASE_URL 
          ? process.env.VITE_API_BASE_URL.replace('/api', '') 
          : 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
