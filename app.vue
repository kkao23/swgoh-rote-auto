<script setup lang="ts">
const route = useRoute()
const { gtag } = useGtag()
import { trackEvent } from '~/util/analytics'

const isAlertOpen = ref(false)
const isNoticeHidden = ref(false)

const isSupportOpen = ref(false)

watch(() => route.path, (newPath) => {
  const labels: Record<string, string> = {
    '/': 'Home',
    '/map-view': 'Map',
    '/usage': 'Search',
    '/tier-list': 'Tier List',
    '/support': 'Support'
  }

  gtag('event', 'nav_click', {
    target: labels[newPath] || 'Unknown',
    path: newPath,
    transport_type: 'beacon'
  })
}, { immediate: true })

const navigationLinks = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
    // click: () => { trackEvent('nav_click', { target: 'Home' }) }
  },
  {
    label: 'Map',
    icon: 'i-heroicons-map',
    to: '/map-view',
    // click: () => { trackEvent('nav_click', { target: 'Map' }) }
  },
  {
    label: 'Search',
    icon: 'i-heroicons-magnifying-glass',
    to: '/usage',
    // click: () => { trackEvent('nav_click', { target: 'Search' }) }
  },
  {
    label: 'Tier List',
    icon: 'i-heroicons-chart-bar',
    to: '/tier-list',
    // click: () => { trackEvent('nav_click', { target: 'Tier List' }) }
  },
  {
    label: 'Support',
    icon: 'i-heroicons-heart',
    to: '/support',
    click: () => {
      isSupportOpen.value = true
    }
  }
]
</script>
<template>
  <UApp>
    <div class="bg-color flex flex-col min-h-[100dvh] pt-8">
      <div class="px-4">
        <UCard
          class="mb-4 bg-gradient-to-r from-blue-400 via-indigo-500 to-red-600 text-white shadow-lg rounded-xl px-6"
          :ui="{ header: { padding: 'py-3' } }">
          <template #header>
            <div class="flex justify-center items-center">
              <h1 class="text-l font-[Orbitron]">SWGOH RoTE Auto Guide</h1>
            </div>
          </template>
        </UCard>
        <div class="text-center mb-4">
          <p class="text-gray-300 text-sm md:text-base">Master Rise of the Empire Territory Battles with
            auto-battle teams
            and tips.</p>
        </div>
      </div>
      <div v-if="!isNoticeHidden" class="mx-4 mb-6 relative">
        <UButton v-if="!isAlertOpen" icon="i-heroicons-information-circle" color="amber" variant="soft"
          label="Relic Delta Notice" block @click="isAlertOpen = true" />
        <UAlert v-else icon="i-heroicons-information-circle" color="amber" variant="soft" title="Relic Delta Notice"
          :close-button="{ icon: 'i-heroicons-chevron-up', color: 'gray', variant: 'link', padded: false }"
          @close="isAlertOpen = false"> <template #description>
            <span class="text-gray-800">
              With the release of <a class="text-blue-400 underline"
                href="https://forums.ea.com/blog/swgoh-game-info-hub-en/design-fireside-chat-edition/12686659">Relic
                Delta</a> on 11/18 your experiences may differ from those in the videos depending on your team's relic
              levels. Relic 5 and 6 planets will no longer be updated with new teams for ground battles, as a Relic
              delta of 3+ provides too much variance in results between rosters.
            </span>
          </template>
        </UAlert>
        <button @click="isNoticeHidden = true"
          class="absolute top-1.5 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-amber-100 border border-amber-500 text-amber-600 hover:bg-amber-200 hover:text-amber-700 transition-colors z-10"
          title="Dismiss notice">
          <UIcon name="i-heroicons-x-mark" class="w-3 h-3" />
        </button>
      </div>
      <NuxtPage />
      <div class="bg-color flex items-center justify-between text-white px-4 py-1 rounded-b-xl"></div>

      <!-- Bottom Navigation Footer -->
      <footer
        class="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 border-t-2 border-blue-500 pb-[env(safe-area-inset-bottom)]">
        <UHorizontalNavigation :links="navigationLinks" :ui="{
          container: 'flex justify-around w-full',
          base: 'group relative flex flex-col items-center justify-center gap-1 py-2 px-1',

          // Kills the background pill without making the footer disappear
          before: 'hover:before:!bg-transparent',

          // Forces states using ! to win the specificity battle
          active: '!text-white',
          inactive: '!text-gray-400 group-hover:!text-white',

          icon: {
            base: 'w-6 h-6 transition-colors duration-200',
            active: '!text-white',
            inactive: '!text-yellow-400' // Inherits from parent color
          },
          label: 'text-[10px] sm:text-xs font-medium !text-yellow-400 transition-colors duration-200'
        }" />
      </footer>
    </div>

    <!-- Floating Suggest Team Button -->
    <SuggestTeamButton />

    <USlideover v-model="isSupportOpen" side="bottom" :ui="{
      overlay: { background: 'bg-gray-900/50' },
      // 1. Force the height to NOT be h-screen
      // 2. Center it horizontally and give it a max-width so it's not a full-width bar
      width: 'w-full max-w-lg mx-auto',
      height: '!h-auto !max-h-fit',
      // 3. Style the background and corners
      background: 'bg-sky-100 dark:bg-sky-100 rounded-t-3xl border-t border-sky-200'
    }">
      <div class="p-4 pb-10 flex flex-col items-center text-center">
        <div class="w-10 h-1 bg-sky-300 rounded-full mb-4"></div>

        <p class="text-blue-900 text-xs font-bold mb-4 px-6 leading-tight">
          If this tool helps you, consider supporting the server costs!
        </p>

        <a href="https://buymeacoffee.com/captsolo" target="_blank" class="active:scale-95 transition-transform">
          <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee"
            class="h-10 rounded-lg shadow-sm" />
        </a>
      </div>
    </USlideover>

    <UNotifications />
  </UApp>
</template>
