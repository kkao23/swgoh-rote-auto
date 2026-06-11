<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { buildRelicMap } from '~/util/rosterUtils'

const allyCode = useLocalStorage<string>('roster.allyCode', '')
const isFetching = ref(false)
const fetchError = ref<string | null>(null)
const rawPlayerData = ref<unknown>(null)
const playerDataFetched = ref(false)

// Extract roster units from raw response
const rosterUnits = computed(() => {
  if (!rawPlayerData.value) return []
  const data = rawPlayerData.value as Record<string, unknown>
  const events = data?.events as Record<string, unknown> | undefined
  const roster = events?.rosterUnit as Array<{ definitionId?: string; relic?: { currentTier?: number } }> | undefined
  return roster ?? []
})

// Build a quick-lookup map: gameId -> relic tier (API value, +2 shifted)
const unitRelicMap = computed(() => buildRelicMap(rosterUnits.value as any))

async function fetchPlayerData(): Promise<void> {
  if (!allyCode.value.trim()) return

  isFetching.value = true
  fetchError.value = null
  rawPlayerData.value = null
  playerDataFetched.value = false

  try {
    const response = await $fetch('/api/mhann/player', {
      query: { allyCode: allyCode.value.trim() },
    })
    rawPlayerData.value = response
    playerDataFetched.value = true
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    fetchError.value = message
  } finally {
    isFetching.value = false
  }
}

// Provide roster data to child components
provide('playerRoster', {
  units: rosterUnits,
  relicMap: unitRelicMap,
  hasUnit: (gameId: string) => unitRelicMap.value.has(gameId.toLowerCase()),
  getRelicTier: (gameId: string) => unitRelicMap.value.get(gameId.toLowerCase()) ?? null,
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
