import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProduction = mode === 'production';
    
    return {
      plugins: [react()],
      base: isProduction ? '/docsv1/' : '/',
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        global: 'globalThis',
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              router: ['react-router-dom'],
              markdown: ['react-markdown', 'remark-gfm', 'rehype-highlight'],
              charts: ['chart.js', 'react-chartjs-2'],
              icons: ['lucide-react']
            },
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]'
          }
        },
        assetsInclude: ['**/*.md', '**/*.json'],
        copyPublicDir: true,
        target: 'esnext',
        cssCodeSplit: true
      },
      server: {
        port: 3000,
        open: true
      },
      preview: {
         port: 4173
       }
     };
});
