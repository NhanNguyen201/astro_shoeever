// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import { loadEnv } from "vite";



import vercel from '@astrojs/vercel';



// https://astro.build/config
export default defineConfig({
  output: 'server',

  vite: { 
    plugins: [tailwindcss()],
  },

  integrations: [
    react({
      experimentalReactChildren: true,
    }), 
   
    // sanity({
    //   projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    //   dataset: 'production',
    //   // Set useCdn to false if you're building statically.
    //   useCdn: false,
    // }),
    
  ],

  adapter: vercel(),
});