// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@pinia/nuxt'],
  compatibilityDate: "2025-02-07",
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" }
      ]
    }
  }
})