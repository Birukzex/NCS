import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      plugins: [
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: [
            'favicon.svg',
            'icons/logo.png',
            'NCS.pdf'
          ],
          manifest: {
            name: 'NCS GP Guide',
            short_name: 'NCS Guide',
            description: 'Offline neurophysiology guide for GPs',
            theme_color: '#3B82F6',
            background_color: '#ffffff',
            display: 'standalone',
            start_url: './',
            icons: [
              {
                src: 'icons/logo.png',
                sizes: '192x192',
                type: 'image/png'
              },
              {
                src: 'icons/logo.png',
                sizes: '512x512',
                type: 'image/png'
              }
            ]
          }
        })
      ]
    };
});
