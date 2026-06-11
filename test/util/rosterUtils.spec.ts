import { describe, it, expect } from 'vitest'
import { buildRelicMap, type RosterUnit } from '~/util/rosterUtils'

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
