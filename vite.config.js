import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  base: '/customerLabs-frontend',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
