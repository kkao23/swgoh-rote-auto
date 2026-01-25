// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@pinia/nuxt', 'nuxt-gtag'],
  compatibilityDate: "2025-02-07",
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      title: 'SWGOH RoTE Auto Guide', // Set the page title
      meta: [
          {
              name: 'description',
              content: 'A guide to help you auto missions in SWGOH Rise of the Empire Territory Battles.'
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
              content: 'A pocket guide for SWGOH Rise of the Empire Territory Battles.'
          },
          {
              property: 'og:image',
              content: 'https://swgoh-rote.s3.us-east-2.amazonaws.com/rote.png'
          }
      ]
    }
  },
  gtag: {
    id: 'G-12Z9F2YGVE'
  }
})