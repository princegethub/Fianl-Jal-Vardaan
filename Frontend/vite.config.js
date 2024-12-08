import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Add this import for path resolution

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: '0.0.0.0', // External access ke liye
    port: 5173,      // Default Vite port
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
