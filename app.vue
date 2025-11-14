<template>
  <UApp>
    <div class="bg-color flex flex-col min-h-[100dvh] pt-8">
      <div class="px-4">
        <UCard
          class="mb-8 bg-gradient-to-r from-blue-400 via-indigo-500 to-red-600 text-white shadow-lg rounded-xl px-6 py-2">
          <template #header>
            <div class="flex justify-center items-center">
              <h1 class="text-l font-[Orbitron]">SWGOH RoTE Auto Guide</h1>
            </div>
          </template>
        </UCard>
        <div class="text-center my-8">
          <p class="text-gray-300 mt-4 text-sm md:text-base">Master Rise of the Empire Territory Battles with
            auto-battle teams
            and tips.</p>
        </div>
      </div>
      <div class="mx-4 mb-6">
        <UAlert
          icon="i-heroicons-exclamation-triangle"
          color="red"
          variant="solid"
          title="Relic Delta Alert"
        > <template #description>
          With the release of <a class="text-blue-800 underline" href="https://forums.ea.com/blog/swgoh-game-info-hub-en/design-fireside-chat-edition/12686659">Relic Delta</a> on 11/18 some of the teams and recommendations on this page will no longer be up to date.
          I expect the teams listed will still work, but your experiences may differ from those in the videos depending on your team's relic levels. Relic 5 and 6 planets will no longer be updated with new teams.
          </template>
      </UAlert>
      </div>
              <!-- Navigation Links -->
        <div class="flex justify-center space-x-4 mb-6">
          <NuxtLink to="/" class="text-lg text-gray-300 hover:text-white transition-colors duration-200 border border-gray-600 hover:border-white rounded-lg px-4 py-2">
            Home
          </NuxtLink>
          <NuxtLink to="/usage" class="text-lg text-gray-300 hover:text-white transition-colors duration-200 border border-gray-600 hover:border-white rounded-lg px-4 py-2">
            Search by Lead
          </NuxtLink>
        </div>
      <NuxtPage />
      <div class="bg-color flex items-center text-white px-4 py-2 rounded-b-xl">
        <p class="text-xs font-semibold">Created by captsolo in conjunction with the Slice of Otoh Gunga TB Library.
          Join us:
        </p>
        <!-- Wrapper for icons -->
        <div class="flex-grow flex justify-end space-x-2">
          <!-- YouTube Link -->
          <a href="https://discord.gg/rhrWK39XJH" target="_blank" class="hover:opacity-80">
            <img src="/icons/discord.svg" alt="Discord" class="h-8 w-8" />
          </a>
        </div>
      </div>
    </div>
    <UNotifications />
  </UApp>
</template>