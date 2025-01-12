import vuetify from 'vite-plugin-vuetify'
import type { NuxtPage } from 'nuxt/schema'

export default defineNuxtConfig({
  
  future: { compatibilityVersion: 4 },
  build: { transpile: ['vuetify'] },
  imports: { dirs: ['./stores'] },
  router: {
    middleware: ['redirectToLaunch'] 
  },
  

  apollo: {
    autoImports: true,
    proxyCookies: true,
    clients: {
      default: { httpEndpoint: 'https://spacex-production.up.railway.app/' },
    },
  },

  vite: {
    optimizeDeps: {
      include: ['graphql-tag'],
    },
    plugins: [vuetify()],
  },

  modules: [
    '@nuxtjs/apollo',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }],
    '@nuxtjs/color-mode',
  ],
  
  compatibilityDate: '2024-11-11',

  typescript: {
    shim: false, 
  },
  
});