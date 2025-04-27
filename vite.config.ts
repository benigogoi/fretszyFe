import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Enable minification and code splitting
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Generate smaller chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'analytics': ['@vercel/analytics', '@vercel/speed-insights', 'react-ga4'],
        },
      },
    },
    // Create lighter output
    cssCodeSplit: true,
    sourcemap: false,
    // Improve chunk loading
    chunkSizeWarningLimit: 600,
  },
  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
})