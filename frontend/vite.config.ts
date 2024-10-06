import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Enables source maps for debugging
  },
  server: {
    port: 5173,
    proxy: {
      '/images': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/images/, ''),
      }
    }
  }
});
