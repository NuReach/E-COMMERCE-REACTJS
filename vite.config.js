import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Adjust the chunk size warning limit as needed (e.g., 1000 kB)
    rollupOptions: {
      output: {
        manualChunks: {
          // Define manual chunks if necessary
          // Example:
          // vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})

