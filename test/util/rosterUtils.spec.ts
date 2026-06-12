import { describe, it, expect } from 'vitest'
import { buildRelicMap, isUnitOwned, ownershipSortValue, teamMeetsRelicReq, PHASE_RELIC_REQUIREMENTS, type RosterUnit } from '~/util/rosterUtils'

describe('buildRelicMap', () => {
  it('extracts gameId and converts API relic to in-game relic (API 9 -> 7)', () => {
    const units: RosterUnit[] = [
      { definitionId: 'GREATMOTHERS:SEVEN_STAR', relic: { currentTier: 9 } },
    ]
    const map = buildRelicMap(units)
    expect(map.get('greatmothers')).toBe(7)
  })

  it('handles multiple units, subtracts 2, and lowercases the gameId', () => {
    const units: RosterUnit[] = [
      { definitionId: 'THIRDSISTER:SEVEN_STAR', relic: { currentTier: 11 } },  // in-game 9
      { definitionId: 'TRENCH:SEVEN_STAR', relic: { currentTier: 7 } },         // in-game 5
      { definitionId: 'SUPREMELEADERKYLOREN:SEVEN_STAR', relic: { currentTier: 9 } }, // in-game 7
    ]
    const map = buildRelicMap(units)
    expect(map.get('thirdsister')).toBe(9)
    expect(map.get('trench')).toBe(5)
    expect(map.get('supremeleaderkyloren')).toBe(7)
    expect(map.size).toBe(3)
  })

  it('clamps to 0 when relic or currentTier is missing (API 0 - 2 clamped to 0)', () => {
    const units: RosterUnit[] = [
      { definitionId: 'GREATMOTHERS:SEVEN_STAR', relic: null },
      { definitionId: 'THIRDSISTER:SEVEN_STAR', relic: {} },
      { definitionId: 'TRENCH:SEVEN_STAR' },
    ]
    const map = buildRelicMap(units)
    expect(map.get('greatmothers')).toBe(0)
    expect(map.get('thirdsister')).toBe(0)
    expect(map.get('trench')).toBe(0)
  })

  it('skips units without a definitionId', () => {
    const units: RosterUnit[] = [
      { definitionId: 'GREATMOTHERS:SEVEN_STAR', relic: { currentTier: 9 } },
      { definitionId: undefined },
      { definitionId: '' },
      { relic: { currentTier: 5 } },
    ]
    const map = buildRelicMap(units)
    expect(map.size).toBe(1)
    expect(map.get('greatmothers')).toBe(7)
  })

  it('filters out units whose rarity is not SEVEN_STAR', () => {
    const units: RosterUnit[] = [
      { definitionId: 'GREATMOTHERS:SIX_STAR', relic: { currentTier: 9 } },
      { definitionId: 'TRENCH:SEVEN_STAR', relic: { currentTier: 9 } },
      { definitionId: 'THIRDSISTER:FIVE_STAR', relic: { currentTier: 11 } },
      { definitionId: 'SLKR:SEVEN_STAR', relic: { currentTier: 11 } },
    ]
    const map = buildRelicMap(units)
    expect(map.size).toBe(2)
    expect(map.get('trench')).toBe(7)
    expect(map.get('slkr')).toBe(9)
  })

  it('skips definitionIds without a colon (no rarity to validate)', () => {
    const units: RosterUnit[] = [
      { definitionId: 'GREATMOTHERS', relic: { currentTier: 9 } },
      { definitionId: 'THIRDSISTER:SEVEN_STAR', relic: { currentTier: 11 } },
    ]
    const map = buildRelicMap(units)
    expect(map.size).toBe(1)
    expect(map.get('thirdsister')).toBe(9)
  })

  it('returns an empty map for an empty array', () => {
    const map = buildRelicMap([])
    expect(map.size).toBe(0)
  })

  it('handles duplicate definitionIds by keeping the last one', () => {
    const units: RosterUnit[] = [
      { definitionId: 'GREATMOTHERS:SEVEN_STAR', relic: { currentTier: 5 } },
      { definitionId: 'GREATMOTHERS:SEVEN_STAR', relic: { currentTier: 9 } },
    ]
    const map = buildRelicMap(units)
    expect(map.get('greatmothers')).toBe(7)
    expect(map.size).toBe(1)
  })

  it('capital ship definitionIds work with SEVEN_STAR and relic shift', () => {
    const units: RosterUnit[] = [
      { definitionId: 'CAPITALEXECUTOR:SEVEN_STAR', relic: { currentTier: 11 } },
      { definitionId: 'CAPITALLEVIATHAN:SEVEN_STAR', relic: { currentTier: 9 } },
    ]
    const map = buildRelicMap(units)
    expect(map.get('capitalexecutor')).toBe(9)
    expect(map.get('capitalleviathan')).toBe(7)
  })
})

describe('isUnitOwned', () => {
  const owned = (id: string) => ['greatmothers', 'thirdsister', 'trench'].includes(id)
  const empty = (_id: string) => false

  it('returns true when roster is not fetched (no penalty)', () => {
    expect(isUnitOwned('greatmothers', false, owned)).toBe(true)
    expect(isUnitOwned(undefined, false, empty)).toBe(true)
  })

  it('returns true when gameId is undefined (no-op)', () => {
    expect(isUnitOwned(undefined, true, owned)).toBe(true)
  })

  it('returns true for owned units when roster is fetched', () => {
    expect(isUnitOwned('greatmothers', true, owned)).toBe(true)
    expect(isUnitOwned('thirdsister', true, owned)).toBe(true)
  })

  it('returns false for unowned units when roster is fetched', () => {
    expect(isUnitOwned('supremeleaderkyloren', true, owned)).toBe(false)
    expect(isUnitOwned('capitalexecutor', true, empty)).toBe(false)
  })

  it('is case-insensitive (lowercases internally)', () => {
    expect(isUnitOwned('GREATMOTHERS', true, owned)).toBe(true)
    expect(isUnitOwned('GreatMothers', true, owned)).toBe(true)
    expect(isUnitOwned('greatmothers', true, owned)).toBe(true)
  })

  it('multi-gameId: all must be owned (comma-separated)', () => {
    // EMPERORPALPATINE owned, VADERDUELSEND not
    expect(isUnitOwned('EMPERORPALPATINE, VADERDUELSEND', true, (id) => id === 'emperorpalpatine')).toBe(false)
    // Both owned
    const both = (id: string) => ['emperorpalpatine', 'vaderduelsend'].includes(id)
    expect(isUnitOwned('EMPERORPALPATINE, VADERDUELSEND', true, both)).toBe(true)
  })

  it('multi-gameId with spaces handled', () => {
    // Spaces around comma should be trimmed
    const both = (id: string) => ['emperorpalpatine', 'vaderduelsend'].includes(id)
    expect(isUnitOwned('EMPERORPALPATINE , VADERDUELSEND', true, both)).toBe(true)
  })
})

describe('ownershipSortValue', () => {
  const owned = (id: string) => id === 'greatmothers' || id === 'trench'

  it('returns 0 for owned units', () => {
    expect(ownershipSortValue('greatmothers', true, owned)).toBe(0)
  })

  it('returns 1 for unowned units', () => {
    expect(ownershipSortValue('supremeleaderkyloren', true, owned)).toBe(1)
  })

  it('returns 0 for all units when roster not fetched', () => {
    expect(ownershipSortValue('greatmothers', false, owned)).toBe(0)
    expect(ownershipSortValue('supremeleaderkyloren', false, owned)).toBe(0)
  })

  it('owned (0) sorts before unowned (1)', () => {
    const a = ownershipSortValue('trench', true, owned)
    const b = ownershipSortValue('unknown', true, owned)
    expect(a).toBeLessThan(b)
  })
})

describe('teamMeetsRelicReq', () => {
  const getRelic = (id: string) => {
    const tiers: Record<string, number> = { 'greatmothers': 7, 'trench': 5, 'thirdsister': 9 }
    return tiers[id] ?? null
  }

  it('returns true when roster is not fetched', () => {
    expect(teamMeetsRelicReq('greatmothers', 'P3', false, getRelic)).toBe(true)
  })

  it('returns true when gameId or phase is missing', () => {
    expect(teamMeetsRelicReq(undefined, 'P3', true, getRelic)).toBe(true)
    expect(teamMeetsRelicReq('greatmothers', undefined, true, getRelic)).toBe(true)
  })

  it('returns true when phase has no relic requirement', () => {
    expect(teamMeetsRelicReq('greatmothers', 'Unknown Phase', true, getRelic)).toBe(true)
  })

  it('returns true when unit meets the relic threshold', () => {
    // Phase 3 requires R7; greatmothers is R7
    expect(teamMeetsRelicReq('greatmothers', 'P3', true, getRelic)).toBe(true)
  })

  it('returns true when unit exceeds the relic threshold', () => {
    // Phase 1 requires R5; greatmothers is R7
    expect(teamMeetsRelicReq('greatmothers', 'P1', true, getRelic)).toBe(true)
  })

  it('returns false when unit is below the relic threshold', () => {
    // Phase 3 requires R7; trench is R5
    expect(teamMeetsRelicReq('trench', 'P3', true, getRelic)).toBe(false)
  })

  it('returns false when unit is not found in relic map', () => {
    expect(teamMeetsRelicReq('unknown', 'P1', true, getRelic)).toBe(false)
  })

  it('multi-gameId: all units must meet relic threshold', () => {
    // EMPERORPALPATINE is R7, VADERDUELSEND is R9 — both meet Phase 3 (R7)
    const getRelic2 = (id: string) => ({ 'emperorpalpatine': 7, 'vaderduelsend': 9 }[id] ?? null)
    expect(teamMeetsRelicReq('EMPERORPALPATINE, VADERDUELSEND', 'P3', true, getRelic2)).toBe(true)
    // Phase 4 requires R8; EMPERORPALPATINE is only R7
    expect(teamMeetsRelicReq('EMPERORPALPATINE, VADERDUELSEND', 'P4', true, getRelic2)).toBe(false)
  })

  it('PHASE_RELIC_REQUIREMENTS covers all known phases', () => {
    expect(PHASE_RELIC_REQUIREMENTS['P1']).toBe(5)
    expect(PHASE_RELIC_REQUIREMENTS['P2']).toBe(6)
    expect(PHASE_RELIC_REQUIREMENTS['P3']).toBe(7)
    expect(PHASE_RELIC_REQUIREMENTS['P4']).toBe(8)
    expect(PHASE_RELIC_REQUIREMENTS['P5']).toBe(9)
    expect(PHASE_RELIC_REQUIREMENTS['P6']).toBe(9)
    expect(PHASE_RELIC_REQUIREMENTS['Zeffo']).toBe(7)
    expect(PHASE_RELIC_REQUIREMENTS['Mandalore']).toBe(8)
  })
})
