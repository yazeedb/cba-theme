import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  image: {
    domains: [
      'localhost:8888',
      'localhost',
      'yazeedb.com',
      'cbaamerica.org',
      'staging.cbaamerica.org'
    ]
  }
});
