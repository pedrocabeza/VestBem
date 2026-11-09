import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Um cache próprio evita conflito com uma sessão anterior do Vite no Windows.
  cacheDir: 'node_modules/.vite-vestbem',
})
