import { defineConfig } from 'vite';
 import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7000', // your backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
