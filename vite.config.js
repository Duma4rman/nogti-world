import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Базовый путь для GitHub Pages
const BASE_URL = process.env.BASE_URL || '/'

export default defineConfig({
  plugins: [react()],
  base: BASE_URL,
})
