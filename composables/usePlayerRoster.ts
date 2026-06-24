import { useLocalStorage } from '@vueuse/core'
import { buildRelicMap, type RosterUnit } from '~/util/rosterUtils'

export function usePlayerRoster(storageKey = 'roster.allyCode') {
  const allyCode = useLocalStorage<string>(storageKey, '')
  const isFetching = ref(false)
  const fetchError = ref<string | null>(null)
  const rawPlayerData = ref<unknown>(null)
  const isFetched = ref(false)

  const playerName = computed<string | null>(() => {
    if (!rawPlayerData.value) return null
    const data = rawPlayerData.value as Record<string, unknown>
    const events = data?.events as Record<string, unknown> | undefined
    return (events?.name as string) ?? null
  })

  const rosterUnits = computed<RosterUnit[]>(() => {
    if (!rawPlayerData.value) return []
    const data = rawPlayerData.value as Record<string, unknown>
    const events = data?.events as Record<string, unknown> | undefined
    const roster = events?.rosterUnit as RosterUnit[] | undefined
    return roster ?? []
  })

  const unitRelicMap = computed(() => buildRelicMap(rosterUnits.value))

  async function fetchRoster(): Promise<void> {
    if (!allyCode.value.trim()) return

    isFetching.value = true
    fetchError.value = null
    rawPlayerData.value = null
    isFetched.value = false

    try {
      const response = await $fetch('/api/mhann/player', {
        query: { allyCode: allyCode.value.trim() },
      })
      rawPlayerData.value = response
      isFetched.value = true
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      fetchError.value = message
    } finally {
      isFetching.value = false
    }
  }

  function clearRoster(): void {
    allyCode.value = ''
    rawPlayerData.value = null
    isFetched.value = false
    fetchError.value = null
  }

  function hasUnit(gameId: string): boolean {
    return unitRelicMap.value.has(gameId.toLowerCase())
  }

  function getRelicTier(gameId: string): number | null {
    return unitRelicMap.value.get(gameId.toLowerCase()) ?? null
  }

  return {
    allyCode,
    isFetching,
    fetchError,
    rawPlayerData,
    isFetched,
    playerName,
    rosterUnits,
    unitRelicMap,
    fetchRoster,
    clearRoster,
    hasUnit,
    getRelicTier,
  }
}
