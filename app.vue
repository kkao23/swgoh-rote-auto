<script setup lang="ts">
const route = useRoute()
const { gtag } = useGtag()
import { trackEvent } from '~/util/analytics'
import { useLocalStorage, useWindowScroll, useMediaQuery } from '@vueuse/core'

const isBudgetPage = computed(() => route.path === '/budget')

const isMobile = useMediaQuery('(max-width: 768px)')

const isAlertOpen = ref(false)
const isNoticeHidden = ref(false)
const isFavoriteBannerHidden = useLocalStorage('swgoh-rote-favorite-banner-hidden', false)

const isSupportOpen = ref(false)

const showSupportNudge = ref(false)
const hasClickedSupport = useLocalStorage('swgoh-rote-support-clicked', false)

onMounted(() => {
  if (!hasClickedSupport.value) {
    setTimeout(() => {
      showSupportNudge.value = true
      setTimeout(() => {
        showSupportNudge.value = false
      }, 6000)
    }, 5000)
  }
})

function onSupportNudgeClick() {
  showSupportNudge.value = false
  isSupportOpen.value = true
}

function onSupportLinkClick() {
  hasClickedSupport.value = true
}

const { y: scrollY } = useWindowScroll()
const lastScrollY = ref(0)
const isNavHidden = ref(false)

watch(scrollY, (newY) => {
  if (newY > lastScrollY.value && newY > 50) {
    isNavHidden.value = true
  } else {
    isNavHidden.value = false
  }
  lastScrollY.value = newY
})

watch(() => route.path, (newPath) => {
  const labels: Record<string, string> = {
    '/': 'Home',
    '/map-view': 'Map',
    '/usage': 'Search',
    '/tier-list': 'Tier List'
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
    click: () => {
      gtag('event', 'nav_click', { target: 'Support', transport_type: 'beacon' })
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
        <div class="sr-only">
          <p>Master Rise of the Empire Territory Battles with
            auto-battle teams
            and tips.</p>
        </div>
      </div>
      <div v-if="!isBudgetPage && !isFavoriteBannerHidden" class="mx-4 mb-4 relative">
        <UAlert icon="i-heroicons-heart-solid" color="pink" variant="soft" title="New!" description="Save your favorite teams by tapping the ❤️ heart icon next to the share button."
          :ui="{ title: 'text-pink-100 font-bold', description: 'text-pink-100' }" />
        <button @click="isFavoriteBannerHidden = true"
          class="absolute top-1.5 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-pink-100 border border-pink-400 text-pink-600 hover:bg-pink-200 hover:text-pink-700 transition-colors z-10"
          title="Dismiss notice">
          <UIcon name="i-heroicons-x-mark" class="w-3 h-3" />
        </button>
      </div>
        <!-- <div v-if="!isNoticeHidden" class="mx-4 mb-6 relative">
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
        </div> -->
      <NuxtPage />
      <div class="px-4 pt-3 pb-20 text-[11px] leading-relaxed text-slate-400">
        SWGOH RoTE Auto Guide provides free digital tools (RoTE auto-battle guidance, team search, and crystal budget planning).
        Try the
        <NuxtLink to="/budget" class="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
          SWGOH crystal income calculator
        </NuxtLink>
        for daily and monthly planning.
        Support links are optional donations for hosting and maintenance. No physical goods, subscriptions, or in-game items are sold.
      </div>
      <div class="bg-color flex items-center justify-between text-white px-4 py-1 rounded-b-xl"></div>

      <!-- Bottom Navigation Footer -->
      <footer
        class="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 border-t-2 border-blue-500 pb-[env(safe-area-inset-bottom)] transition-transform duration-300"
        :class="isNavHidden ? 'translate-y-full' : 'translate-y-0'">
        <UHorizontalNavigation :links="navigationLinks" :ui="{
          container: 'flex justify-around w-full',
          base: 'group relative flex flex-col items-center justify-center gap-1 py-2 px-1',

          // Kills the background pill without making the footer disappear
          before: 'hover:before:!bg-transparent',

          // Forces states using ! to win the specificity battle
          active: '!text-white',
          inactive: '!text-yellow-400 group-hover:!text-white',

          icon: {
            base: 'w-6 h-6 transition-colors duration-200',
            active: '!text-white',
            inactive: '!text-yellow-400'
          },
          label: 'text-[10px] sm:text-xs font-medium transition-colors duration-200'
        }" />
      </footer>
    </div>

    <!-- Floating Suggest Team Button -->
    <SuggestTeamButton v-if="!isBudgetPage" />

    <!-- Support Nudge -->
    <Transition name="nudge">
      <button v-if="showSupportNudge"
        @click="onSupportNudgeClick"
        class="fixed right-0 top-1/3 z-50 bg-sky-500 text-white text-sm font-semibold px-4 py-2 rounded-l-xl shadow-lg cursor-pointer hover:bg-sky-400 transition-colors">
        Support ❤️
      </button>
    </Transition>

    <USlideover v-model="isSupportOpen" side="bottom" :ui="{
      overlay: { background: 'bg-gray-900/50' },
      // 1. Force the height to NOT be h-screen
      // 2. Center it horizontally and give it a max-width so it's not a full-width bar
      width: 'w-full max-w-lg mx-auto',
      height: '!h-auto !max-h-[80vh] overflow-y-auto',
      // 3. Style the background and corners
      background: 'bg-sky-100 dark:bg-sky-100 rounded-t-3xl border-t border-sky-200'
    }">
      <div class="p-4 pb-10 flex flex-col items-center text-center">
        <div class="w-10 h-1 bg-sky-300 rounded-full mb-4"></div>

        <p class="text-blue-900 text-xs font-bold mb-4 px-6 leading-tight">
          This tool is free and ad-free — help keep it that way!
        </p>

        <div class="w-full max-w-md bg-white/70 border border-sky-200 rounded-xl p-3 text-left text-blue-900 text-xs mb-4">
          <p class="font-semibold mb-1">Donation disclosure</p>
          <p>
            These links are optional tips to support SWGOH RoTE Auto Guide hosting and maintenance.
            You are supporting an existing free digital tool. No physical products, subscriptions, or guaranteed in-game benefits are sold.
          </p>
        </div>

        <div class="flex items-center gap-4">
          <a href="https://buymeacoffee.com/captsolo" target="_blank" class="active:scale-95 transition-transform" @click="onSupportLinkClick">
            <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee"
              class="h-10 rounded-lg shadow-sm" />
          </a>
          <a v-if="isMobile" href="venmo://users/swgoh-rote" class="active:scale-95 transition-transform" @click="onSupportLinkClick">
            <img src="/images/venmo.png" alt="Venmo" class="h-10 rounded-lg shadow-sm" />
          </a>
          <div v-else class="flex flex-col items-center">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://venmo.com/swgoh-rote" alt="Venmo QR" class="w-20 h-20 rounded" />
            <span class="text-blue-900 text-[10px] mt-1">Venmo @swgoh-rote</span>
          </div>
          <a href="https://ko-fi.com/swgohrote" target="_blank" class="active:scale-95 transition-transform" @click="onSupportLinkClick">
            <img src="/images/kofi.webp" alt="Ko-fi" class="h-10 rounded-lg shadow-sm" />
          </a>
        </div>

        <iframe id="kofiframe" src="https://ko-fi.com/swgohrote/?hidefeed=true&widget=true&embed=true&preview=true"
          class="border-none w-full mt-4 rounded-lg" style="background: #f9f9f9; padding: 4px;" height="400"
          title="swgohrote" />
      </div>
    </USlideover>

    <UNotifications />
  </UApp>
</template>

<style>
.nudge-enter-active,
.nudge-leave-active {
  transition: transform 0.4s ease;
}
.nudge-enter-from,
.nudge-leave-to {
  transform: translateX(100%);
}
</style>
