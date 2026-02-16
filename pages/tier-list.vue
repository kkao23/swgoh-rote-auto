<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'

const { gtag } = useGtag()
const isDarkMode = useLocalStorage('swgoh-rote-dark-mode', true)

useSeoMeta({
  title: 'SWGOH Omicron Tier List - RoTE Auto Guide',
})

onMounted(() => {
  gtag('event', 'tier_list_page_view', {
    path: '/tier-list',
    transport_type: 'beacon',
  })
})
</script>

<template>
  <div class="px-4 pb-8">
    <section class="max-w-4xl mx-auto mb-4 text-center">
      <h1 :class="['text-xl font-semibold mb-2', isDarkMode ? 'text-white' : 'text-slate-900']">SWGOH Omicron Tier List</h1>
      <p class="text-gray-300 text-sm">
        Browse this SWGOH omicron tier list for Rise of the Empire Territory Battles.
        Rankings focus on practical value for auto-friendly clears, roster efficiency, and long-term utility.
      </p>
    </section>

    <UCard class="bg-gray-800 text-white">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Omicron Tier List</h2>
          <span class="text-sm text-gray-400">Last updated: 2/7/26</span>
        </div>
      </template>
      
      <div class="space-y-6">
        <!-- Tier List Image -->
        <div class="flex justify-center">
          <img 
            src="/images/tier-list.png" 
            alt="Omicron Tier List" 
            class="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        
        <!-- Explanation Link -->
        <div class="flex justify-center">
          <a 
            href="https://youtu.be/CDgUV6SRZWE" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            <UIcon name="i-heroicons-play-circle" class="w-5 h-5" />
            <span class="underline">Explanation Video</span>
          </a>
        </div>
      </div>
    </UCard>
  </div>
</template>
