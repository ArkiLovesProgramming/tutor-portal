import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: 'C:\\\\Users\\\\betaw\\\\AppData\\\\Local\\\\Temp\\\\vite-cache',
  server: {
    fs: {
      strict: false
    }
  }
})
