/** Roster utility functions — pure, testable. */

export interface RosterUnit {
  definitionId?: string
  relic?: { currentTier?: number } | null
}

/**
 * Build a lookup map from gameId (lowercase) to relic tier (in-game value).
 * Filters out units whose rarity is not SEVEN_STAR.
 * Subtracts 2 from API currentTier to get the actual in-game relic level.
 * Units without relic data get tier 0 (or negative after shift, clamped to 0).
 *
 * "GREATMOTHERS:SEVEN_STAR" -> "greatmothers" -> 7 (API 9 - 2)
 * "TRENCH:SIX_STAR" -> skipped (not seven star)
 */
export function buildRelicMap(units: RosterUnit[]): Map<string, number> {
  const map = new Map<string, number>()
  for (const unit of units) {
    const defId = unit.definitionId
    if (!defId) continue
    const [gameIdRaw, rarity] = defId.split(':')
    if (!gameIdRaw || rarity !== 'SEVEN_STAR') continue
    const gameId = gameIdRaw.toLowerCase()
    const apiTier = unit.relic?.currentTier ?? 0
    // API currentTier is shifted +2 vs in-game relic level
    const inGameRelic = Math.max(0, apiTier - 2)
    map.set(gameId, inGameRelic)
  }
  return map
}

/**
 * Check if a unit is owned by the player.
 * Supports comma-separated gameIds — ALL must be owned.
 * Returns true when the roster hasn't been fetched yet (no penalty).
 */
export function isUnitOwned(
  gameId: string | undefined,
  isFetched: boolean,
  hasUnit: (id: string) => boolean,
): boolean {
  if (!isFetched || !gameId) return true
  const ids = gameId.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
  return ids.every(id => hasUnit(id))
}

/**
 * Sort value for ownership: 0 = owned, 1 = unowned.
 * Returns 0 when roster isn't fetched (all treated equally).
 */
export function ownershipSortValue(
  gameId: string | undefined,
  isFetched: boolean,
  hasUnit: (id: string) => boolean,
): 0 | 1 {
  return isUnitOwned(gameId, isFetched, hasUnit) ? 0 : 1
}
