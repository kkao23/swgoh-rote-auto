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

export type MarqueeGoal = 'four-stars' | 'five-stars-end-event' | 'six-stars-one-week' | 'seven-stars-one-week'

export const MARQUEES_PER_YEAR = 26
export const MARQUEE_PACK_COST = 1299

export const marqueeGoalOptions: Array<{ label: string, value: MarqueeGoal }> = [
  { label: '4 ⭐', value: 'four-stars' },
  { label: '5 ⭐ [In a week]', value: 'five-stars-end-event' },
  { label: '6 ⭐ [In One Week]', value: 'six-stars-one-week' },
  { label: '7 ⭐ [In One Week]', value: 'seven-stars-one-week' },
]

export const marqueeCostWithEpisodePass: Record<MarqueeGoal, number> = {
  'four-stars': 0,
  'five-stars-end-event': 3897,
  'six-stars-one-week': 11196,
  'seven-stars-one-week': 24990,
}

export const marqueeCostWithoutEpisodePass: Record<MarqueeGoal, number> = {
  'four-stars': 2598,
  'five-stars-end-event': 7299,
  'six-stars-one-week': 12990,
  'seven-stars-one-week': 25980,
}
