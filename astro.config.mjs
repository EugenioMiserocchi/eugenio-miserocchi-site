import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eugeniomiserocchi.it',
  output: 'static',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  image: {
    // Astro Image Service built-in — WebP/AVIF automatici
    // Aggiungi domini remoti se necessario:
    // domains: ['cdn.example.com'],
  },
});
