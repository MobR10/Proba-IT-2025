import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow network access
    port: 3000, // your dev port
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.app',
      'mobr10.go.ro'  
    ],
  },
})
