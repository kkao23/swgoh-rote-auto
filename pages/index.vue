<script setup lang="ts">
const {
  allyCode,
  isFetching,
  fetchError,
  isFetched: playerDataFetched,
  rosterUnits,
  unitRelicMap,
  fetchRoster: fetchPlayerData,
  hasUnit,
  getRelicTier,
} = usePlayerRoster()

// Provide roster data to child components
provide('playerRoster', {
  units: rosterUnits,
  relicMap: unitRelicMap,
  hasUnit,
  getRelicTier,
  isFetched: playerDataFetched,
})
</script>

<template>
  <div class="flex-1 bg-color">
    <UContainer class="pt-0 sm:pt-4 pb-4 sm:pb-8">

      <!-- Ally Code Input -->
      <div class="bg-slate-900/70 border border-slate-700 rounded-xl p-3 sm:p-5 mb-5">
        <h2 class="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Import Your Roster</h2>
        <p class="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-4">
          Enter your SWGOH ally code to highlight which teams you can use based on your roster.
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <input
            v-model="allyCode"
            type="text"
            placeholder="e.g. 761-355-883"
            class="flex-1 bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2"
            @keyup.enter="fetchPlayerData"
          />
          <button
            type="button"
            :disabled="isFetching || !allyCode.trim()"
            class="px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            @click="fetchPlayerData"
          >
            {{ isFetching ? 'Fetching...' : 'Fetch My Roster' }}
          </button>
        </div>

        <div v-if="fetchError" class="mt-4 rounded-lg bg-red-900/30 border border-red-700 p-3 text-sm text-red-300">
          {{ fetchError }}
        </div>

        <div v-if="playerDataFetched" class="mt-4">
          <p class="text-xs text-emerald-300">
            Roster loaded — {{ rosterUnits.length }} units found. Teams you can't field will appear grayed out.
          </p>
        </div>
      </div>

      <PhasesAccordion />
    </UContainer>
  </div>
</template>

<style>
.bg-color {
  background-color: #0D0D2B;
}
</style>
