import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import vercelServerless from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), vue()],
  output: "server",
  adapter: vercelServerless(),
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }
    ]
  }
});