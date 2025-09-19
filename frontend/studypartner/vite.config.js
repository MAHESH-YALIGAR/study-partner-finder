// import { defineConfig } from 'vite';
//  import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:7000', // your backend port
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });




import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7000', // for local development only
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: './', // ✅ ensures correct asset paths on Vercel
});
