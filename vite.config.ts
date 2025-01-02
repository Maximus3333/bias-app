import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Proxy API requests to Express
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Main app entry
        background: 'src/background.js', // Background script
        content: 'src/content.js', // Content script
      },
      output: {
        entryFileNames: 'static/js/[name].js',
        chunkFileNames: 'static/js/[name].js',
        assetFileNames: 'static/[ext]/[name].[ext]',
      },
    },
  },
});
