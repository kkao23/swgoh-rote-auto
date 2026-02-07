<script setup lang="ts">
const isAlertOpen = ref(false)
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
      <div class="mx-4 mb-6">
        <UButton
          v-if="!isAlertOpen"
          icon="i-heroicons-information-circle"
          color="blue"
          variant="soft"
          label="Relic Delta Notice"
          block
          @click="isAlertOpen = true"
        />
        <UAlert
          v-else
          icon="i-heroicons-information-circle"
          color="blue"
          variant="soft"
          title="Relic Delta Notice"
          :close-button="{ icon: 'i-heroicons-chevron-up', color: 'gray', variant: 'link', padded: false }"
          @close="isAlertOpen = false"
        > <template #description>
          <span class="text-gray-100">
            With the release of <a class="text-blue-800 underline" href="https://forums.ea.com/blog/swgoh-game-info-hub-en/design-fireside-chat-edition/12686659">Relic Delta</a> on 11/18 your experiences may differ from those in the videos depending on your team's relic levels. Relic 5 and 6 planets will no longer be updated with new teams for ground battles, as a Relic delta of 3+ provides too much variance in results between rosters.
          </span>
          </template>
      </UAlert>
      </div>
              <!-- Navigation Links -->
        <div class="flex justify-center space-x-4 mb-6">
          <NuxtLink to="/" class="flex items-center gap-2 text-sm md:text-lg text-gray-300 hover:text-white transition-colors duration-200 border border-gray-600 hover:border-white rounded-lg px-2 py-1 md:px-4 md:py-1">
            <UIcon name="i-heroicons-home" class="w-5 h-5" />
            Home
          </NuxtLink>
          <NuxtLink to="/map-view" class="flex items-center gap-2 text-sm md:text-lg text-gray-300 hover:text-white transition-colors duration-200 border border-gray-600 hover:border-white rounded-lg px-2 py-1 md:px-4 md:py-1">
            <UIcon name="i-heroicons-map" class="w-5 h-5" />
            Map View
          </NuxtLink>
          <NuxtLink to="/usage" class="flex items-center gap-2 text-sm md:text-lg text-gray-300 hover:text-white transition-colors duration-200 border border-gray-600 hover:border-white rounded-lg px-2 py-1 md:px-4 md:py-1">
            <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5" />
            Search by Lead
          </NuxtLink>
          <NuxtLink to="/tier-list" class="flex items-center gap-2 text-sm md:text-lg text-gray-300 hover:text-white transition-colors duration-200 border border-gray-600 hover:border-white rounded-lg px-2 py-1 md:px-4 md:py-1">
            <UIcon name="i-heroicons-chart-bar" class="w-5 h-5" />
            Omicron Tier List
          </NuxtLink>
        </div>
      <NuxtPage />
      <div class="bg-color flex items-center justify-between text-white px-4 py-1 rounded-b-xl">
  
  <!-- Buy Me a Coffee -->
  <a href="https://buymeacoffee.com/captsolo" target="_blank" class="flex items-center gap-2 hover:opacity-80 transition-opacity" title="Support this project">
    <span class="text-xs font-medium">Buy me a coffee?</span>
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" class="h-7" />
  </a>
</div>
    </div>
    
    <!-- Floating Suggest Team Button -->
    <SuggestTeamButton />
    
    <UNotifications />
  </UApp>
</template>
