import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref } from 'vue'

/**
 * Mock @vueuse/core's useLocalStorage so we can test useSavedTeams in isolation
 * without depending on the browser's localStorage API.
 */
vi.mock('@vueuse/core', () => ({
  useLocalStorage: <T>(_key: string, defaultValue: T) => {
    return ref<T>(structuredClone(defaultValue)) as ReturnType<typeof ref<T>>
  },
}))

import { useSavedTeams } from '~/composables/useSavedTeams'

describe('useSavedTeams', () => {
  let savedTeams: ReturnType<typeof useSavedTeams>

  beforeEach(() => {
    savedTeams = useSavedTeams()
  })

  describe('team key format (verified via public API)', () => {
    it('should use pipe-delimited key format: phase|alignment|position|lead', () => {
      savedTeams.toggleSaved('P1', 'Light', 'Mid', 'GAS')
      expect(savedTeams.savedTeams.value[0]).toBe('P1|Light|Mid|GAS')
    })

    it('should distinguish teams by the full compound key', () => {
      savedTeams.toggleSaved('P1', 'Light', 'Top', 'Rey')
      savedTeams.toggleSaved('P2', 'Dark', 'Bottom', 'SLKR')

      const keys = savedTeams.savedTeams.value
      expect(keys).toContain('P1|Light|Top|Rey')
      expect(keys).toContain('P2|Dark|Bottom|SLKR')
      expect(keys[0]).not.toBe(keys[1])
    })
  })

  describe('isSaved', () => {
    it('should return false for a team that has not been saved', () => {
      expect(savedTeams.isSaved('P1', 'Light', 'Top', 'Rey')).toBe(false)
    })

    it('should return true after the team has been saved', () => {
      savedTeams.toggleSaved('P1', 'Light', 'Top', 'Rey')
      expect(savedTeams.isSaved('P1', 'Light', 'Top', 'Rey')).toBe(true)
    })

    it('should distinguish between different teams', () => {
      savedTeams.toggleSaved('P1', 'Light', 'Top', 'Rey')
      expect(savedTeams.isSaved('P2', 'Dark', 'Bottom', 'SLKR')).toBe(false)
    })

    it('should distinguish teams that differ only by phase', () => {
      savedTeams.toggleSaved('P1', 'Light', 'Mid', 'JMK')
      expect(savedTeams.isSaved('P2', 'Light', 'Mid', 'JMK')).toBe(false)
    })

    it('should distinguish teams that differ only by alignment', () => {
      savedTeams.toggleSaved('P1', 'Light', 'Mid', 'JMK')
      expect(savedTeams.isSaved('P1', 'Dark', 'Mid', 'JMK')).toBe(false)
    })
  })

  describe('toggleSaved', () => {
    it('should add a team when it is not already saved', () => {
      savedTeams.toggleSaved('P1', 'Light', 'Top', 'Rey')
      expect(savedTeams.savedTeams.value).toHaveLength(1)
      expect(savedTeams.savedTeams.value).toContain('P1|Light|Top|Rey')
    })

    it('should remove a team when it is already saved', () => {
      savedTeams.toggleSaved('P1', 'Light', 'Top', 'Rey')
      expect(savedTeams.savedTeams.value).toHaveLength(1)

      savedTeams.toggleSaved('P1', 'Light', 'Top', 'Rey')
      expect(savedTeams.savedTeams.value).toHaveLength(0)
    })

    it('should allow toggling multiple teams independently', () => {
      savedTeams.toggleSaved('P1', 'Light', 'Top', 'Rey')
      savedTeams.toggleSaved('P2', 'Dark', 'Bottom', 'SLKR')
      savedTeams.toggleSaved('P3', 'Light', 'Mid', 'JMK')

      expect(savedTeams.savedTeams.value).toHaveLength(3)

      // Remove the middle team
      savedTeams.toggleSaved('P2', 'Dark', 'Bottom', 'SLKR')
      expect(savedTeams.savedTeams.value).toHaveLength(2)
      expect(savedTeams.isSaved('P1', 'Light', 'Top', 'Rey')).toBe(true)
      expect(savedTeams.isSaved('P2', 'Dark', 'Bottom', 'SLKR')).toBe(false)
      expect(savedTeams.isSaved('P3', 'Light', 'Mid', 'JMK')).toBe(true)
    })

    it('should not duplicate a team when toggled twice (off then on)', () => {
      savedTeams.toggleSaved('P1', 'Light', 'Top', 'Rey')
      savedTeams.toggleSaved('P1', 'Light', 'Top', 'Rey') // remove
      savedTeams.toggleSaved('P1', 'Light', 'Top', 'Rey') // add again

      expect(savedTeams.savedTeams.value).toHaveLength(1)
      expect(savedTeams.savedTeams.value.filter((k) => k === 'P1|Light|Top|Rey')).toHaveLength(1)
    })
  })

  describe('savedTeams reactive array', () => {
    it('should initialize as an empty array', () => {
      expect(savedTeams.savedTeams.value).toEqual([])
    })

    it('should be reactive and update when toggled', () => {
      expect(savedTeams.savedTeams.value).toEqual([])

      savedTeams.toggleSaved('P4', 'Dark', 'Mid', 'LV')
      expect(savedTeams.savedTeams.value).toEqual(['P4|Dark|Mid|LV'])

      savedTeams.toggleSaved('P4', 'Dark', 'Mid', 'LV')
      expect(savedTeams.savedTeams.value).toEqual([])
    })
  })
})
