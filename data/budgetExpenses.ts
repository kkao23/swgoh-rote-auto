export type EnergyType = 'normal' | 'cantina' | 'ship' | 'mod' | 'conquest'

export const refreshOptions = Array.from({ length: 13 }, (_, index) => index)

export const refreshCosts: Record<EnergyType, number[]> = {
  normal: [0, 50, 100, 150, 250, 350, 450, 650, 850, 1050, 1450, 1850, 2250],
  cantina: [0, 100, 200, 300, 500, 700, 1100, 1500, 2300, 3100, 3900, 5500, 7100],
  ship: [0, 50, 100, 150, 250, 350, 450, 650, 850, 1050, 1450, 1850, 2250],
  mod: [0, 50, 100, 150, 250, 350, 450, 650, 850, 1050, 1450, 1850, 2250],
  conquest: [0, 50, 100, 150, 250, 350, 450, 650, 850, 1050, 1450, 1850, 2250],
}

export const shardCharacterOptions = Array.from({ length: 21 }, (_, index) => index)
export const shardRefreshPerCharacterOptions = [0, 1, 2, 3, 4]
export const shardRefreshCostByTimes = [0, 25, 75, 175, 275]

export type MarqueeGoal = 'four-stars' | 'five-stars-one-day' | 'five-stars-end-event' | 'six-stars-one-week' | 'seven-stars-one-week'

export const MARQUEES_PER_YEAR = 26
export const MARQUEE_PACK_COST = 1299
const MARQUEE_STARTING_SHARDS = 55
const EPISODE_PASS_SHARDS = 20
const MILESTONE_ONE_TIME_SHARDS = 5
const MILESTONE_DAILY_SHARDS = 5
const WEEK_DAYS = 7

const MARQUEE_PACK_ODDS: Array<{ shards: number, probability: number }> = [
  { shards: 5, probability: 17.44 },
  { shards: 7, probability: 69.76 },
  { shards: 10, probability: 5.48 },
  { shards: 12, probability: 4.98 },
  { shards: 15, probability: 1.99 },
  { shards: 20, probability: 0.07 },
  { shards: 25, probability: 0.02 },
  { shards: 50, probability: 0.02 },
  { shards: 80, probability: 0.02 },
  { shards: 145, probability: 0.10 },
  { shards: 230, probability: 0.02 },
  { shards: 330, probability: 0.10 },
]

const EXPECTED_SHARDS_PER_MARQUEE_PACK = MARQUEE_PACK_ODDS.reduce((sum, entry) => {
  return sum + (entry.shards * (entry.probability / 100))
}, 0)

const milestoneThresholds = [80, 145, 230]

const marqueeGoalConfig: Record<MarqueeGoal, { targetShards: number, recurringRewardDays: number }> = {
  'four-stars': { targetShards: 80, recurringRewardDays: 0 },
  'five-stars-one-day': { targetShards: 145, recurringRewardDays: 0 },
  'five-stars-end-event': { targetShards: 145, recurringRewardDays: WEEK_DAYS },
  'six-stars-one-week': { targetShards: 230, recurringRewardDays: WEEK_DAYS },
  'seven-stars-one-week': { targetShards: 330, recurringRewardDays: WEEK_DAYS },
}

function estimatePurchasedShardsNeeded(targetShards: number, baseShards: number, recurringRewardDays: number): number {
  for (let purchasedShards = 0; purchasedShards <= 1000; purchasedShards += 1) {
    let totalShards = baseShards + purchasedShards

    for (const threshold of milestoneThresholds) {
      if (totalShards >= threshold) {
        totalShards += MILESTONE_ONE_TIME_SHARDS + (MILESTONE_DAILY_SHARDS * recurringRewardDays)
      }
    }

    if (totalShards >= targetShards) {
      return purchasedShards
    }
  }

  return 1000
}

function expectedCrystalsForGoal(goal: MarqueeGoal, withEpisodePass: boolean): number {
  const config = marqueeGoalConfig[goal]
  const baseShards = MARQUEE_STARTING_SHARDS + (withEpisodePass ? EPISODE_PASS_SHARDS : 0)
  const purchasedShardsNeeded = estimatePurchasedShardsNeeded(config.targetShards, baseShards, config.recurringRewardDays)
  const expectedPacksNeeded = purchasedShardsNeeded / EXPECTED_SHARDS_PER_MARQUEE_PACK

  return Math.round(expectedPacksNeeded * MARQUEE_PACK_COST)
}

export const marqueeGoalOptions: Array<{ label: string, value: MarqueeGoal }> = [
  { label: '4 ⭐', value: 'four-stars' },
  { label: '5 ⭐ [In One Day]', value: 'five-stars-one-day' },
  { label: '5 ⭐ [In a week]', value: 'five-stars-end-event' },
  { label: '6 ⭐ [In One Week]', value: 'six-stars-one-week' },
  { label: '7 ⭐ [In One Week]', value: 'seven-stars-one-week' },
]

export const marqueeCostWithEpisodePass: Record<MarqueeGoal, number> = {
  'four-stars': expectedCrystalsForGoal('four-stars', true),
  'five-stars-one-day': expectedCrystalsForGoal('five-stars-one-day', true),
  'five-stars-end-event': expectedCrystalsForGoal('five-stars-end-event', true),
  'six-stars-one-week': expectedCrystalsForGoal('six-stars-one-week', true),
  'seven-stars-one-week': expectedCrystalsForGoal('seven-stars-one-week', true),
}

export const marqueeCostWithoutEpisodePass: Record<MarqueeGoal, number> = {
  'four-stars': expectedCrystalsForGoal('four-stars', false),
  'five-stars-one-day': expectedCrystalsForGoal('five-stars-one-day', false),
  'five-stars-end-event': expectedCrystalsForGoal('five-stars-end-event', false),
  'six-stars-one-week': expectedCrystalsForGoal('six-stars-one-week', false),
  'seven-stars-one-week': expectedCrystalsForGoal('seven-stars-one-week', false),
}
