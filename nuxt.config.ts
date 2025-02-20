// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@pinia/nuxt'],
  compatibilityDate: "2025-02-07",
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
      ],
      title: 'SWGOH RoTE Auto Guide', // Set the page title
      meta: [
          {
              name: 'description',
              content: 'A detailed guide for SWGOH Rise of the Empire Territory Battles.'
          },
          {
              name: 'keywords',
              content: 'SWGOH, Star Wars, Rise of the Empire, Territory Battles, Guide'
          },
          {
              property: 'og:title',
              content: 'SWGOH RoTE Auto Guide'
          },
          {
              property: 'og:description',
              content: 'A detailed guide for SWGOH Rise of the Empire Territory Battles.'
          }
      ]
    }
  }
})