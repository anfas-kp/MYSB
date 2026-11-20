import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function generateApplyRoute(): Plugin {
  return {
    name: 'generate-apply-route',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist');
      const src = path.join(dist, 'index.html');
      const applyDir = path.join(dist, 'apply');
      const dest = path.join(applyDir, 'index.html');
      if (fs.existsSync(src)) {
        fs.mkdirSync(applyDir, { recursive: true });
        fs.copyFileSync(src, dest);
        console.log('✓ Successfully generated dist/apply/index.html');
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generateApplyRoute()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion', 'gsap'],
          form: ['react-hook-form', 'zod', '@hookform/resolvers'],
        },
      },
    },
  },
});
