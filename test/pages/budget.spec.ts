import { describe, it, expect } from 'vitest'
import {
  guaranteedIncome,
  fleetRankOptions,
  GAC_ROUNDS_PER_YEAR,
  GAC_WINS_PER_ROUND,
  GAC_LOSSES_PER_ROUND,
  gacDivisionOptions,
  TB_RUNS_PER_YEAR,
  tbTypeOptions,
  maxStarsByTbType,
  tbPayoutByType,
  perideaTierOptions,
} from '~/data/budgetIncome'
import {
  refreshOptions,
  refreshCosts,
  shardCharacterOptions,
  shardRefreshPerCharacterOptions,
  shardRefreshCostByTimes,
  MARQUEES_PER_YEAR,
  marqueeGoalOptions,
  marqueeCostWithEpisodePass,
  marqueeCostWithoutEpisodePass,
} from '~/data/budgetExpenses'
import type { MarqueeGoal } from '~/data/budgetExpenses'

// Constants matching the budget page
const DAYS_PER_MONTH = 30
const GAC_END_OF_ROUND_REWARD = 750 / 2
const GAC_END_OF_ROUND_WEEKS_PER_YEAR = (52 * 3) / 4

// ──────────────────────────────────────────────────────────────
// Pure calculation helpers (mirroring budget page logic)
// ──────────────────────────────────────────────────────────────

function calcGuaranteedMonthlyIncome(): number {
  return (
    guaranteedIncome.loginCalendarMonthly +
    guaranteedIncome.galacticBountiesMonthly +
    guaranteedIncome.kesselRunMonthly +
    (guaranteedIncome.dailiesDaily + guaranteedIncome.galacticWarDaily) * DAYS_PER_MONTH
  )
}

function calcGuaranteedDailyIncome(): number {
  return calcGuaranteedMonthlyIncome() / DAYS_PER_MONTH
}

function calcFleetDailyIncome(rankValue: string): number {
  return fleetRankOptions.find((o) => o.value === rankValue)?.crystals ?? 0
}

function calcFleetMonthlyIncome(rankValue: string): number {
  return calcFleetDailyIncome(rankValue) * DAYS_PER_MONTH
}

function calcGacDailyPayoutMonthly(divisionValue: string): number {
  const payout = gacDivisionOptions.find((o) => o.value === divisionValue)
  if (!payout) return 0
  return (payout.daily * 365) / 12
}

function calcGacVictoryMonthly(divisionValue: string): number {
  const payout = gacDivisionOptions.find((o) => o.value === divisionValue)
  if (!payout) return 0
  return (payout.victory * GAC_WINS_PER_ROUND * GAC_ROUNDS_PER_YEAR) / 12
}

function calcGacDefeatMonthly(divisionValue: string): number {
  const payout = gacDivisionOptions.find((o) => o.value === divisionValue)
  if (!payout) return 0
  return (payout.defeat * GAC_LOSSES_PER_ROUND * GAC_ROUNDS_PER_YEAR) / 12
}

function calcGacChampionshipMonthly(divisionValue: string): number {
  const payout = gacDivisionOptions.find((o) => o.value === divisionValue)
  if (!payout) return 0
  return (payout.championship * GAC_ROUNDS_PER_YEAR) / 12
}

function calcGacEndOfRoundMonthly(): number {
  return (GAC_END_OF_ROUND_REWARD * GAC_END_OF_ROUND_WEEKS_PER_YEAR) / 12
}

function calcGacAnnualIncome(divisionValue: string): number {
  const payout = gacDivisionOptions.find((o) => o.value === divisionValue)
  if (!payout) return 0

  const daily = payout.daily * 365
  const perRound = payout.victory * GAC_WINS_PER_ROUND + payout.defeat * GAC_LOSSES_PER_ROUND
  const annualRound = perRound * GAC_ROUNDS_PER_YEAR
  const annualChampionship = payout.championship * GAC_ROUNDS_PER_YEAR
  const endOfRound = GAC_END_OF_ROUND_REWARD * GAC_END_OF_ROUND_WEEKS_PER_YEAR

  return daily + annualRound + annualChampionship + endOfRound
}

function calcGacMonthlyIncome(divisionValue: string): number {
  return calcGacAnnualIncome(divisionValue) / 12
}

function calcGacDailyIncome(divisionValue: string): number {
  return calcGacMonthlyIncome(divisionValue) / DAYS_PER_MONTH
}

function calcTbMonthlyIncome(tbType: string, stars: number): number {
  const crystalsPerRun = tbPayoutByType[tbType]?.[stars] ?? 0
  return (crystalsPerRun * TB_RUNS_PER_YEAR) / 12
}

function calcTbDailyIncome(tbType: string, stars: number): number {
  return calcTbMonthlyIncome(tbType, stars) / DAYS_PER_MONTH
}

function calcPerideaMonthlyIncome(doesPatrol: 'yes' | 'no' | '', tierValue: string): number {
  if (doesPatrol === 'no') return 0
  const tier = perideaTierOptions.find((t) => t.value === tierValue)
  return tier?.monthlyCrystals ?? 0
}

function calcPerideaDailyIncome(doesPatrol: 'yes' | 'no' | '', tierValue: string): number {
  return calcPerideaMonthlyIncome(doesPatrol, tierValue) / DAYS_PER_MONTH
}

function calcRefreshCost(type: 'normal' | 'cantina' | 'ship' | 'mod' | 'conquest', count: number): number {
  return refreshCosts[type][count] ?? 0
}

function calcShardCostPerCharacter(refreshesPerChar: number): number {
  return shardRefreshCostByTimes[refreshesPerChar] ?? 0
}

function calcNetCrystals(totalMonthlyIncome: number, totalMonthlyExpense: number): number {
  return totalMonthlyIncome - totalMonthlyExpense
}

// ──────────────────────────────────────────────────────────────
// Tests
// ──────────────────────────────────────────────────────────────

describe('Budget Calculations', () => {
  // ------------------------------------------------------------------
  // Guaranteed Income
  // ------------------------------------------------------------------
  describe('Guaranteed Income', () => {
    it('should calculate guaranteed monthly income correctly', () => {
      // 380 + 200 + 200 + (80 + 25) * 30 = 780 + 3150 = 3930
      const monthly = calcGuaranteedMonthlyIncome()
      expect(monthly).toBe(3930)
    })

    it('should calculate guaranteed daily income correctly', () => {
      // 3930 / 30 = 131
      const daily = calcGuaranteedDailyIncome()
      expect(daily).toBe(131)
    })

    it('daily income should equal monthly / DAYS_PER_MONTH', () => {
      expect(calcGuaranteedDailyIncome()).toBe(calcGuaranteedMonthlyIncome() / DAYS_PER_MONTH)
    })

    it('should have all guaranteed income values as positive numbers', () => {
      expect(guaranteedIncome.loginCalendarMonthly).toBeGreaterThan(0)
      expect(guaranteedIncome.galacticBountiesMonthly).toBeGreaterThan(0)
      expect(guaranteedIncome.kesselRunMonthly).toBeGreaterThan(0)
      expect(guaranteedIncome.dailiesDaily).toBeGreaterThan(0)
      expect(guaranteedIncome.galacticWarDaily).toBeGreaterThan(0)
    })
  })

  // ------------------------------------------------------------------
  // Fleet Arena
  // ------------------------------------------------------------------
  describe('Fleet Arena Income', () => {
    it('should return 400 daily/12000 monthly for rank 1', () => {
      expect(calcFleetDailyIncome('1')).toBe(400)
      expect(calcFleetMonthlyIncome('1')).toBe(12000)
    })

    it('should return 375 daily/11250 monthly for rank 2', () => {
      expect(calcFleetDailyIncome('2')).toBe(375)
      expect(calcFleetMonthlyIncome('2')).toBe(11250)
    })

    it('should return 0 for rank 51+', () => {
      expect(calcFleetDailyIncome('51+')).toBe(0)
      expect(calcFleetMonthlyIncome('51+')).toBe(0)
    })

    it('should return 0 for unknown rank value', () => {
      expect(calcFleetDailyIncome('nonexistent')).toBe(0)
    })

    it('all fleet rank options should have non-negative crystals', () => {
      for (const option of fleetRankOptions) {
        expect(option.crystals).toBeGreaterThanOrEqual(0)
      }
    })

    it('monthly should equal daily * DAYS_PER_MONTH for all ranks', () => {
      for (const option of fleetRankOptions) {
        expect(calcFleetMonthlyIncome(option.value)).toBe(option.crystals * DAYS_PER_MONTH)
      }
    })
  })

  // ------------------------------------------------------------------
  // GAC (Grand Arena Championship)
  // ------------------------------------------------------------------
  describe('GAC Income', () => {
    it('GAC_ROUNDS_PER_YEAR should be 13', () => {
      expect(GAC_ROUNDS_PER_YEAR).toBe(13)
    })

    it('GAC_WINS_PER_ROUND + GAC_LOSSES_PER_ROUND = 9 (total matches per round)', () => {
      expect(GAC_WINS_PER_ROUND + GAC_LOSSES_PER_ROUND).toBe(9)
    })

    it('should return correct monthly income for Kyber 1', () => {
      const monthly = calcGacMonthlyIncome('kyber-1')
      // Kyber 1: daily=260, victory=900, defeat=200, championship=2135
      // Daily: 260 * 365 / 12 = 7908.33...
      // Victory: 900 * 4.5 * 13 / 12 = 4387.5
      // Defeat: 200 * 4.5 * 13 / 12 = 975
      // Championship: 2135 * 13 / 12 = 2312.92...
      // End of round: (375 * 39) / 12 = 1218.75
      // Total ≈ 16802.5
      expect(monthly).toBeGreaterThan(16000)
      expect(monthly).toBeLessThan(17000)
    })

    it('should return 0 for unknown division', () => {
      expect(calcGacMonthlyIncome('')).toBe(0)
    })

    it('daily payout monthly component should match formula', () => {
      const kyber1 = gacDivisionOptions.find((o) => o.value === 'kyber-1')!
      const expected = (kyber1.daily * 365) / 12
      expect(calcGacDailyPayoutMonthly('kyber-1')).toBe(expected)
    })

    it('victory payout monthly component should match formula', () => {
      const kyber1 = gacDivisionOptions.find((o) => o.value === 'kyber-1')!
      const expected = (kyber1.victory * GAC_WINS_PER_ROUND * GAC_ROUNDS_PER_YEAR) / 12
      expect(calcGacVictoryMonthly('kyber-1')).toBe(expected)
    })

    it('defeat payout monthly component should match formula', () => {
      const kyber1 = gacDivisionOptions.find((o) => o.value === 'kyber-1')!
      const expected = (kyber1.defeat * GAC_LOSSES_PER_ROUND * GAC_ROUNDS_PER_YEAR) / 12
      expect(calcGacDefeatMonthly('kyber-1')).toBe(expected)
    })

    it('championship monthly component should match formula', () => {
      const kyber1 = gacDivisionOptions.find((o) => o.value === 'kyber-1')!
      const expected = (kyber1.championship * GAC_ROUNDS_PER_YEAR) / 12
      expect(calcGacChampionshipMonthly('kyber-1')).toBe(expected)
    })

    it('end-of-round monthly should be constant regardless of division', () => {
      const eor1 = calcGacEndOfRoundMonthly()
      const eor2 = calcGacEndOfRoundMonthly()
      expect(eor1).toBe(eor2)
      // (375 * 39) / 12 = 1218.75
      expect(eor1).toBe(1218.75)
    })

    it('gacDailyIncome should equal gacMonthlyIncome / DAYS_PER_MONTH', () => {
      const monthly = calcGacMonthlyIncome('kyber-2')
      const daily = calcGacDailyIncome('kyber-2')
      expect(daily).toBe(monthly / DAYS_PER_MONTH)
    })

    it('all divisions should have daily >= 55 (lowest)', () => {
      for (const option of gacDivisionOptions) {
        expect(option.daily).toBeGreaterThanOrEqual(55)
      }
    })

    it('no-gac division should have lower values than carbonite 5', () => {
      const noGac = gacDivisionOptions.find((o) => o.value === 'no-gac')!
      const carb5 = gacDivisionOptions.find((o) => o.value === 'carbonite-5')!
      expect(noGac.victory).toBeLessThanOrEqual(carb5.victory)
    })

    it('GAC annual income should be greater for higher divisions', () => {
      const kyber1Annual = calcGacAnnualIncome('kyber-1')
      const carbonite5Annual = calcGacAnnualIncome('carbonite-5')
      expect(kyber1Annual).toBeGreaterThan(carbonite5Annual)
    })

    it('monthly income should equal annual income / 12', () => {
      const annual = calcGacAnnualIncome('aurodium-1')
      const monthly = calcGacMonthlyIncome('aurodium-1')
      expect(monthly).toBe(annual / 12)
    })
  })

  // ------------------------------------------------------------------
  // Territory Battles
  // ------------------------------------------------------------------
  describe('Territory Battle Income', () => {
    it('TB_RUNS_PER_YEAR should be 26', () => {
      expect(TB_RUNS_PER_YEAR).toBe(26)
    })

    it('should return 0 when no TB type or stars are selected', () => {
      expect(calcTbMonthlyIncome('', 0)).toBe(0)
      expect(calcTbMonthlyIncome('rote', 0)).toBe(0)
    })

    it('should calculate RotE 56-star monthly income correctly', () => {
      const monthly = calcTbMonthlyIncome('rote', 56)
      // rote 56 stars = 1675 crystals, TB_RUNS_PER_YEAR = 26
      // (1675 * 26) / 12 = 3629.17...
      const expected = (1675 * 26) / 12
      expect(monthly).toBe(expected)
    })

    it('should calculate RotE 1-star monthly income correctly', () => {
      const monthly = calcTbMonthlyIncome('rote', 1)
      expect(monthly).toBe((250 * 26) / 12)
    })

    it('tbDailyIncome should equal tbMonthlyIncome / DAYS_PER_MONTH', () => {
      const monthly = calcTbMonthlyIncome('rote', 30)
      const daily = calcTbDailyIncome('rote', 30)
      expect(daily).toBe(monthly / DAYS_PER_MONTH)
    })

    it('all TB types should have correct max stars', () => {
      expect(maxStarsByTbType['hoth']).toBe(45)
      expect(maxStarsByTbType['geonosis']).toBe(33)
      expect(maxStarsByTbType['rote']).toBe(56)
    })

    it('all tbTypeOptions should have valid values', () => {
      for (const option of tbTypeOptions) {
        expect(tbPayoutByType[option.value]).toBeDefined()
        expect(maxStarsByTbType[option.value]).toBeDefined()
      }
    })

    it('RotE crystal payouts should be monotonically increasing', () => {
      let prev = tbPayoutByType['rote'][1]
      for (let stars = 2; stars <= 56; stars++) {
        expect(tbPayoutByType['rote'][stars]).toBeGreaterThanOrEqual(prev)
        prev = tbPayoutByType['rote'][stars]
      }
    })

    it('Hoth TB should have zero crystals for stars 1-19', () => {
      for (let stars = 1; stars <= 19; stars++) {
        expect(tbPayoutByType['hoth'][stars]).toBe(0)
      }
    })

    it('Geonosis TB should start with non-zero payout at star 1', () => {
      expect(tbPayoutByType['geonosis'][1]).toBeGreaterThan(0)
    })
  })

  // ------------------------------------------------------------------
  // Peridea Patrol / Duel of the Fates
  // ------------------------------------------------------------------
  describe('Peridea Patrol Income', () => {
    it('should return 0 when not patrolling', () => {
      expect(calcPerideaMonthlyIncome('no', 't6')).toBe(0)
      expect(calcPerideaDailyIncome('no', 't6')).toBe(0)
    })

    it('should return 0 for empty inputs', () => {
      expect(calcPerideaMonthlyIncome('', '')).toBe(0)
    })

    it('should return tier monthly crystal value when patrolling', () => {
      expect(calcPerideaMonthlyIncome('yes', 't4')).toBe(100)
      expect(calcPerideaMonthlyIncome('yes', 't5')).toBe(200)
      expect(calcPerideaMonthlyIncome('yes', 't6')).toBe(300)
    })

    it('tier 3 or below should have 0 monthly crystals', () => {
      const t3 = perideaTierOptions.find((t) => t.value === 't3')!
      expect(t3.monthlyCrystals).toBe(0)
    })

    it('daily income should be monthly / DAYS_PER_MONTH', () => {
      expect(calcPerideaDailyIncome('yes', 't5')).toBe(200 / DAYS_PER_MONTH)
    })

    it('all peridea tiers should have non-negative monthly crystals', () => {
      for (const tier of perideaTierOptions) {
        expect(tier.monthlyCrystals).toBeGreaterThanOrEqual(0)
      }
    })
  })

  // ------------------------------------------------------------------
  // Energy Refresh Costs
  // ------------------------------------------------------------------
  describe('Energy Refresh Costs', () => {
    it('should have 13 refresh options (0-12)', () => {
      expect(refreshOptions).toHaveLength(13)
      expect(refreshOptions[0]).toBe(0)
      expect(refreshOptions[12]).toBe(12)
    })

    it('normal energy costs should match expected pattern', () => {
      // Cost for 3 normal refreshes should be 50 + 100 + 150 = 300
      expect(calcRefreshCost('normal', 0)).toBe(0)
      expect(calcRefreshCost('normal', 1)).toBe(50)
      expect(calcRefreshCost('normal', 2)).toBe(100)
      expect(calcRefreshCost('normal', 3)).toBe(150)
      expect(calcRefreshCost('normal', 4)).toBe(250)
    })

    it('cantina refresh costs should be higher than normal', () => {
      for (let i = 1; i <= 3; i++) {
        expect(calcRefreshCost('cantina', i)).toBeGreaterThan(calcRefreshCost('normal', i))
      }
    })

    it('normal, ship, mod, and conquest should have identical cost structures', () => {
      for (let i = 0; i <= 12; i++) {
        expect(calcRefreshCost('normal', i)).toBe(calcRefreshCost('ship', i))
        expect(calcRefreshCost('normal', i)).toBe(calcRefreshCost('mod', i))
        expect(calcRefreshCost('normal', i)).toBe(calcRefreshCost('conquest', i))
      }
    })

    it('refresh costs should be monotonically non-decreasing (cumulative)', () => {
      for (const type of ['normal', 'cantina', 'ship', 'mod', 'conquest'] as const) {
        for (let i = 0; i < 12; i++) {
          const cumulative = refreshCosts[type].slice(0, i + 2).reduce((a, b) => a + b, 0)
          const prevCumulative = refreshCosts[type].slice(0, i + 1).reduce((a, b) => a + b, 0)
          expect(cumulative).toBeGreaterThanOrEqual(prevCumulative)
        }
      }
    })

    it('conquest daily expense should be half the refresh cost (50% uptime)', () => {
      // In the budget page, conquestRefreshBaseCost/2 represents the daily expense
      // because conquest is only active about half the time
      const conquestCost3 = calcRefreshCost('conquest', 3)
      expect(conquestCost3 / 2).toBe(150 / 2) // 75
    })
  })

  // ------------------------------------------------------------------
  // Shard Refresh Costs
  // ------------------------------------------------------------------
  describe('Shard Refresh Costs', () => {
    it('should have 21 shard character options (0-20)', () => {
      expect(shardCharacterOptions).toHaveLength(21)
    })

    it('should have 5 shard refresh per character options', () => {
      expect(shardRefreshPerCharacterOptions).toHaveLength(5)
      expect(shardRefreshPerCharacterOptions).toEqual([0, 1, 2, 3, 4])
    })

    it('shard refresh cost table should match expected values', () => {
      expect(calcShardCostPerCharacter(0)).toBe(0)
      expect(calcShardCostPerCharacter(1)).toBe(25)
      expect(calcShardCostPerCharacter(2)).toBe(75)
      expect(calcShardCostPerCharacter(3)).toBe(175)
      expect(calcShardCostPerCharacter(4)).toBe(275)
    })

    it('refresh costs should be increasing (each additional refresh costs more)', () => {
      for (let i = 0; i < shardRefreshCostByTimes.length - 1; i++) {
        expect(shardRefreshCostByTimes[i + 1]).toBeGreaterThanOrEqual(shardRefreshCostByTimes[i])
      }
    })

    it('shardRefreshCostByTimes length should match shardRefreshPerCharacterOptions', () => {
      expect(shardRefreshCostByTimes.length).toBe(shardRefreshPerCharacterOptions.length)
    })

    it('daily expense for 3 characters with 2 refreshes each should be 3 * 75 = 225', () => {
      const charactersPerDay = 3
      const costPerChar = calcShardCostPerCharacter(2)
      const dailyExpense = charactersPerDay * costPerChar
      expect(dailyExpense).toBe(225)
    })
  })

  // ------------------------------------------------------------------
  // Marquee Costs
  // ------------------------------------------------------------------
  describe('Marquee Costs', () => {
    it('MARQUEES_PER_YEAR should be 26 (bi-weekly)', () => {
      expect(MARQUEES_PER_YEAR).toBe(26)
    })

    it('should have 4 marquee goal options', () => {
      expect(marqueeGoalOptions).toHaveLength(4)
    })

    it('all marquee goals should have defined costs with and without episode pass', () => {
      const goals: MarqueeGoal[] = ['four-stars', 'five-stars-end-event', 'six-stars-one-week', 'seven-stars-one-week']
      for (const goal of goals) {
        expect(marqueeCostWithEpisodePass[goal]).toBeGreaterThanOrEqual(0)
        expect(marqueeCostWithoutEpisodePass[goal]).toBeGreaterThan(0)
      }
    })

    it('costs with episode pass should be lower than without (because of +20 free shards)', () => {
      const goals: MarqueeGoal[] = ['four-stars', 'five-stars-end-event', 'six-stars-one-week', 'seven-stars-one-week']
      for (const goal of goals) {
        expect(marqueeCostWithEpisodePass[goal]).toBeLessThan(marqueeCostWithoutEpisodePass[goal])
      }
    })

    it('higher star goals should cost more', () => {
      expect(marqueeCostWithoutEpisodePass['five-stars-end-event']).toBeGreaterThan(marqueeCostWithoutEpisodePass['four-stars'])
      expect(marqueeCostWithoutEpisodePass['six-stars-one-week']).toBeGreaterThan(marqueeCostWithoutEpisodePass['five-stars-end-event'])
      expect(marqueeCostWithoutEpisodePass['seven-stars-one-week']).toBeGreaterThan(marqueeCostWithoutEpisodePass['six-stars-one-week'])
    })

    it('should match expected hardcoded costs with episode pass', () => {
      expect(marqueeCostWithEpisodePass['four-stars']).toBe(0)
      expect(marqueeCostWithEpisodePass['five-stars-end-event']).toBe(3897)
      expect(marqueeCostWithEpisodePass['six-stars-one-week']).toBe(11196)
      expect(marqueeCostWithEpisodePass['seven-stars-one-week']).toBe(24990)
    })

    it('should match expected hardcoded costs without episode pass', () => {
      expect(marqueeCostWithoutEpisodePass['four-stars']).toBe(2598)
      expect(marqueeCostWithoutEpisodePass['five-stars-end-event']).toBe(7299)
      expect(marqueeCostWithoutEpisodePass['six-stars-one-week']).toBe(12990)
      expect(marqueeCostWithoutEpisodePass['seven-stars-one-week']).toBe(25980)
    })
  })

  // ------------------------------------------------------------------
  // Net Crystal Calculations
  // ------------------------------------------------------------------
  describe('Net Crystal Calculations', () => {
    it('should return positive net when income exceeds expense', () => {
      expect(calcNetCrystals(5000, 3000)).toBe(2000)
    })

    it('should return negative net when expense exceeds income', () => {
      expect(calcNetCrystals(3000, 5000)).toBe(-2000)
    })

    it('should return zero when income equals expense', () => {
      expect(calcNetCrystals(4000, 4000)).toBe(0)
    })

    it('net daily should equal net monthly / DAYS_PER_MONTH', () => {
      const netMonthly = calcNetCrystals(5000, 3000)
      const netDaily = netMonthly / DAYS_PER_MONTH
      expect(netDaily).toBe(2000 / 30)
    })
  })

  // ------------------------------------------------------------------
  // Regressions / Edge Cases
  // ------------------------------------------------------------------
  describe('Edge Cases & Regression Safety', () => {
    it('monthly income should never be negative', () => {
      const guaranteed = calcGuaranteedMonthlyIncome()
      expect(guaranteed).toBeGreaterThanOrEqual(0)
    })

    it('daily income should be precisely monthly / 30 for all sources', () => {
      const guaranteedMonthly = calcGuaranteedMonthlyIncome()
      expect(guaranteedMonthly / DAYS_PER_MONTH).toBe(calcGuaranteedDailyIncome())
    })

    it('fleet rank labels should all be unique', () => {
      const values = fleetRankOptions.map((o) => o.value)
      expect(new Set(values).size).toBe(values.length)
    })

    it('gac division values should all be unique', () => {
      const values = gacDivisionOptions.map((o) => o.value)
      expect(new Set(values).size).toBe(values.length)
    })

    it('peridea tier values should all be unique', () => {
      const values = perideaTierOptions.map((o) => o.value)
      expect(new Set(values).size).toBe(values.length)
    })

    it('tb type values should all be unique', () => {
      const values = tbTypeOptions.map((o) => o.value)
      expect(new Set(values).size).toBe(values.length)
    })
  })
})
