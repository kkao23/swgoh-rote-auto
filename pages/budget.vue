<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'

const DAYS_PER_MONTH = 30

const guaranteedIncome = {
  loginCalendarMonthly: 380,
  galacticBountiesMonthly: 200,
  dailiesDaily: 80,
  galacticWarDaily: 25,
}

const guaranteedMonthlyIncome = computed(() => {
  return guaranteedIncome.loginCalendarMonthly
    + guaranteedIncome.galacticBountiesMonthly
    + ((guaranteedIncome.dailiesDaily + guaranteedIncome.galacticWarDaily) * DAYS_PER_MONTH)
})

const guaranteedDailyIncome = computed(() => {
  return guaranteedMonthlyIncome.value / DAYS_PER_MONTH
})

const fleetRankOptions = [
  { label: 'Rank 1', value: '1', crystals: 400 },
  { label: 'Rank 2', value: '2', crystals: 375 },
  { label: 'Rank 3', value: '3', crystals: 350 },
  { label: 'Rank 4', value: '4', crystals: 325 },
  { label: 'Rank 5', value: '5', crystals: 300 },
  { label: 'Rank 6-10', value: '6-10', crystals: 200 },
  { label: 'Rank 11-20', value: '11-20', crystals: 100 },
  { label: 'Rank 21-50', value: '21-50', crystals: 50 },
  { label: 'Rank 51+', value: '51+', crystals: 0 },
]

const selectedFleetRank = useLocalStorage<string>('budget.selectedFleetRank', '')

const selectedFleetReward = computed(() => {
  return fleetRankOptions.find((option) => option.value === selectedFleetRank.value)
})

const fleetDailyIncome = computed(() => {
  return selectedFleetReward.value?.crystals || 0
})

const fleetMonthlyIncome = computed(() => {
  return fleetDailyIncome.value * DAYS_PER_MONTH
})

const GAC_ROUNDS_PER_YEAR = 13
const GAC_WINS_PER_ROUND = 6
const GAC_LOSSES_PER_ROUND = 6

const gacDivisionOptions = [
  { label: 'Kyber 1', value: 'kyber-1', daily: 260, victory: 900, defeat: 200, championship: 2135 },
  { label: 'Kyber 2', value: 'kyber-2', daily: 240, victory: 825, defeat: 200, championship: 2050 },
  { label: 'Kyber 3', value: 'kyber-3', daily: 220, victory: 750, defeat: 200, championship: 1970 },
  { label: 'Kyber 4', value: 'kyber-4', daily: 200, victory: 675, defeat: 200, championship: 1895 },
  { label: 'Kyber 5', value: 'kyber-5', daily: 180, victory: 600, defeat: 200, championship: 1820 },
  { label: 'Aurodium 1', value: 'aurodium-1', daily: 170, victory: 550, defeat: 150, championship: 1590 },
  { label: 'Aurodium 2', value: 'aurodium-2', daily: 160, victory: 510, defeat: 150, championship: 1515 },
  { label: 'Aurodium 3', value: 'aurodium-3', daily: 150, victory: 470, defeat: 150, championship: 1445 },
  { label: 'Aurodium 4', value: 'aurodium-4', daily: 140, victory: 430, defeat: 150, championship: 1375 },
  { label: 'Aurodium 5', value: 'aurodium-5', daily: 130, victory: 390, defeat: 150, championship: 1310 },
  { label: 'Chromium 1', value: 'chromium-1', daily: 125, victory: 350, defeat: 80, championship: 1080 },
  { label: 'Chromium 2', value: 'chromium-2', daily: 120, victory: 320, defeat: 80, championship: 1005 },
  { label: 'Chromium 3', value: 'chromium-3', daily: 115, victory: 290, defeat: 80, championship: 935 },
  { label: 'Chromium 4', value: 'chromium-4', daily: 110, victory: 260, defeat: 80, championship: 870 },
  { label: 'Chromium 5', value: 'chromium-5', daily: 105, victory: 230, defeat: 80, championship: 805 },
  { label: 'Bronzium 1', value: 'bronzium-1', daily: 100, victory: 200, defeat: 50, championship: 670 },
  { label: 'Bronzium 2', value: 'bronzium-2', daily: 95, victory: 180, defeat: 50, championship: 630 },
  { label: 'Bronzium 3', value: 'bronzium-3', daily: 90, victory: 160, defeat: 50, championship: 595 },
  { label: 'Bronzium 4', value: 'bronzium-4', daily: 85, victory: 140, defeat: 50, championship: 560 },
  { label: 'Bronzium 5', value: 'bronzium-5', daily: 80, victory: 120, defeat: 50, championship: 530 },
  { label: 'Carbonite 1', value: 'carbonite-1', daily: 75, victory: 110, defeat: 30, championship: 290 },
  { label: 'Carbonite 2', value: 'carbonite-2', daily: 70, victory: 100, defeat: 30, championship: 225 },
  { label: 'Carbonite 3', value: 'carbonite-3', daily: 65, victory: 90, defeat: 30, championship: 170 },
  { label: 'Carbonite 4', value: 'carbonite-4', daily: 60, victory: 80, defeat: 30, championship: 130 },
  { label: 'Carbonite 5', value: 'carbonite-5', daily: 55, victory: 70, defeat: 30, championship: 100 },
  { label: "I Don't Play GAC", value: 'no-gac', daily: 55, victory: 30, defeat: 30, championship: 100 },
]

const selectedGacDivision = useLocalStorage<string>('budget.selectedGacDivision', '')

const selectedGacPayout = computed(() => {
  return gacDivisionOptions.find((option) => option.value === selectedGacDivision.value)
})

const gacAnnualIncome = computed(() => {
  const payout = selectedGacPayout.value
  if (!payout) {
    return 0
  }
  const dailyIncome = payout.daily * 365
  const perRoundMatchIncome = (payout.victory * GAC_WINS_PER_ROUND) + (payout.defeat * GAC_LOSSES_PER_ROUND)
  const annualRoundIncome = perRoundMatchIncome * GAC_ROUNDS_PER_YEAR
  const annualChampionshipIncome = payout.championship * GAC_ROUNDS_PER_YEAR

  return dailyIncome + annualRoundIncome + annualChampionshipIncome
})

const gacMonthlyIncome = computed(() => {
  return gacAnnualIncome.value / 12
})

const gacDailyIncome = computed(() => {
  return gacMonthlyIncome.value / DAYS_PER_MONTH
})

const TB_RUNS_PER_YEAR = 26

const tbTypeOptions = [
  { label: 'Hoth', value: 'hoth' },
  { label: 'Geonosis', value: 'geonosis' },
  { label: 'Rise of the Empire', value: 'rote' },
]

const maxStarsByTbType: Record<string, number> = {
  hoth: 45,
  geonosis: 33,
  rote: 56,
}

const tbPayoutByType: Record<string, Record<number, number>> = {
  hoth: {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
    11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0,
    20: 50, 21: 50, 22: 50, 23: 50, 24: 50,
    25: 100, 26: 100, 27: 100,
    28: 125, 29: 125,
    30: 150, 31: 150, 32: 150,
    33: 175, 34: 175,
    35: 200, 36: 200, 37: 200,
    38: 225,
    39: 250,
    40: 300,
    41: 350,
    42: 400,
    43: 450,
    44: 500,
    45: 550,
  },
  geonosis: {
    1: 100, 2: 100,
    3: 150, 4: 150, 5: 150,
    6: 200, 7: 200,
    8: 250, 9: 250, 10: 250,
    11: 300, 12: 300,
    13: 375, 14: 375, 15: 375,
    16: 450, 17: 450,
    18: 525, 19: 525, 20: 525,
    21: 600, 22: 600,
    23: 675, 24: 675,
    25: 750, 26: 750, 27: 750,
    28: 825, 29: 825, 30: 825,
    31: 900, 32: 900, 33: 900,
  },
  rote: {
    1: 250, 2: 275, 3: 300, 4: 325, 5: 350, 6: 375, 7: 400, 8: 425, 9: 450, 10: 475,
    11: 500, 12: 525, 13: 550, 14: 575, 15: 600, 16: 625, 17: 650, 18: 675, 19: 700, 20: 725,
    21: 750, 22: 775, 23: 800, 24: 825, 25: 850, 26: 875, 27: 900, 28: 925, 29: 950, 30: 975,
    31: 1000, 32: 1025, 33: 1050, 34: 1075, 35: 1100, 36: 1125, 37: 1150, 38: 1175, 39: 1200, 40: 1225,
    41: 1250, 42: 1275, 43: 1300, 44: 1325, 45: 1350, 46: 1375, 47: 1400, 48: 1425, 49: 1450, 50: 1475,
    51: 1500, 52: 1525, 53: 1550, 54: 1575, 55: 1600, 56: 1675,
  },
}

const selectedTbType = useLocalStorage<string>('budget.selectedTbType', '')
const selectedTbStars = useLocalStorage<number | null>('budget.selectedTbStars', null)

const maxTbStars = computed(() => {
  if (!selectedTbType.value) {
    return 0
  }
  return maxStarsByTbType[selectedTbType.value]
})

const tbStarOptions = computed(() => {
  return Array.from({ length: maxTbStars.value }, (_, index) => {
    const stars = index + 1
    return {
      value: stars,
      label: stars.toString().padStart(2, '0'),
    }
  })
})

watch(selectedTbType, () => {
  if (!selectedTbType.value) {
    selectedTbStars.value = null
    return
  }

  if (selectedTbStars.value === null) {
    return
  }

  if (selectedTbStars.value > maxTbStars.value) {
    selectedTbStars.value = maxTbStars.value
  }
})

const tbCrystalsPerRun = computed(() => {
  if (!selectedTbType.value || selectedTbStars.value === null) {
    return 0
  }
  return tbPayoutByType[selectedTbType.value]?.[selectedTbStars.value] || 0
})

const tbAnnualIncome = computed(() => {
  return tbCrystalsPerRun.value * TB_RUNS_PER_YEAR
})

const tbMonthlyIncome = computed(() => {
  return tbAnnualIncome.value / 12
})

const tbDailyIncome = computed(() => {
  return tbMonthlyIncome.value / DAYS_PER_MONTH
})

const doesPerideaPatrol = useLocalStorage<'yes' | 'no' | ''>('budget.doesPerideaPatrol', '')
const perideaTierOptions = [
  { label: 'Tier 3 or below', value: 't3', monthlyCrystals: 0 },
  { label: 'Tier 4 [Relic 5]', value: 't4', monthlyCrystals: 100 },
  { label: 'Tier 5 [Relic 7]', value: 't5', monthlyCrystals: 200 },
  { label: 'Tier 6 [Relic 9]', value: 't6', monthlyCrystals: 300 },
]
const selectedPerideaTier = useLocalStorage<string>('budget.selectedPerideaTier', '')

const selectedPerideaTierPayout = computed(() => {
  return perideaTierOptions.find((tier) => tier.value === selectedPerideaTier.value)
})

const perideaMonthlyIncome = computed(() => {
  if (doesPerideaPatrol.value === 'no') {
    return 0
  }
  return selectedPerideaTierPayout.value?.monthlyCrystals || 0
})

const perideaDailyIncome = computed(() => {
  return perideaMonthlyIncome.value / DAYS_PER_MONTH
})

const doesDuelOfFates = useLocalStorage<'yes' | 'no' | ''>('budget.doesDuelOfFates', '')
const selectedDuelTier = useLocalStorage<string>('budget.selectedDuelTier', '')

const selectedDuelTierPayout = computed(() => {
  return perideaTierOptions.find((tier) => tier.value === selectedDuelTier.value)
})

const duelMonthlyIncome = computed(() => {
  if (doesDuelOfFates.value === 'no') {
    return 0
  }
  return selectedDuelTierPayout.value?.monthlyCrystals || 0
})

const duelDailyIncome = computed(() => {
  return duelMonthlyIncome.value / DAYS_PER_MONTH
})

const doesWhale = useLocalStorage<'yes' | 'no' | ''>('budget.doesWhale', '')
const whalePurchasedMonthly = useLocalStorage<number | null>('budget.whalePurchasedMonthly', null)

const whaleMonthlyIncome = computed(() => {
  if (doesWhale.value === 'no') {
    return 0
  }
  return Math.max(0, Number(whalePurchasedMonthly.value || 0))
})

const whaleDailyIncome = computed(() => {
  return whaleMonthlyIncome.value / DAYS_PER_MONTH
})

const totalMonthlyIncome = computed(() => {
  return guaranteedMonthlyIncome.value
    + fleetMonthlyIncome.value
    + gacMonthlyIncome.value
    + tbMonthlyIncome.value
    + perideaMonthlyIncome.value
    + duelMonthlyIncome.value
    + whaleMonthlyIncome.value
})

const totalDailyIncome = computed(() => {
  return totalMonthlyIncome.value / DAYS_PER_MONTH
})

type StepKey = 'fleet' | 'gac' | 'tb' | 'peridea' | 'duel' | 'whale'

const stepOrder: StepKey[] = ['fleet', 'gac', 'tb', 'peridea', 'duel', 'whale']

const fleetComplete = computed(() => selectedFleetRank.value !== '')
const gacComplete = computed(() => selectedGacDivision.value !== '')
const tbComplete = computed(() => selectedTbType.value !== '' && selectedTbStars.value !== null)
const perideaComplete = computed(() => doesPerideaPatrol.value === 'no' || (doesPerideaPatrol.value === 'yes' && selectedPerideaTier.value !== ''))
const duelComplete = computed(() => doesDuelOfFates.value === 'no' || (doesDuelOfFates.value === 'yes' && selectedDuelTier.value !== ''))
const whaleComplete = computed(() => doesWhale.value === 'no' || (doesWhale.value === 'yes' && whalePurchasedMonthly.value !== null))

const stepStatus = computed<Record<StepKey, boolean>>(() => ({
  fleet: fleetComplete.value,
  gac: gacComplete.value,
  tb: tbComplete.value,
  peridea: perideaComplete.value,
  duel: duelComplete.value,
  whale: whaleComplete.value,
}))

const currentStepKey = computed<StepKey | null>(() => {
  return stepOrder.find((step) => !stepStatus.value[step]) || null
})

function isCurrentStep(step: StepKey): boolean {
  return currentStepKey.value === step
}

function isStepComplete(step: StepKey): boolean {
  return stepStatus.value[step]
}

function getNextStep(step: StepKey): StepKey | null {
  const stepIndex = stepOrder.indexOf(step)
  return stepOrder[stepIndex + 1] || null
}

function scrollToStep(step: StepKey): void {
  const stepElement = document.getElementById(`step-${step}`)
  stepElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function goToNextStep(step: StepKey): void {
  const nextStep = getNextStep(step)
  if (nextStep) {
    scrollToStep(nextStep)
  }
}

const isWizardComplete = computed(() => {
  return stepOrder.every((step) => stepStatus.value[step])
})

const isEnergyExpensesComplete = computed(() => {
  return conquestRefreshes.value !== null
})

const isShardExpensesComplete = computed(() => {
  if (shardCharactersPerDay.value === null) {
    return false
  }
  return Number(shardCharactersPerDay.value) === 0 || shardRefreshesPerCharacter.value !== null
})

const isMarqueeExpensesComplete = computed(() => {
  return Boolean(selectedMarqueeGoal.value && purchasesEpisodePass.value)
})

const eraMaterialsMonthlyWhaling = useLocalStorage<number>('budget.eraMaterialsMonthlyWhaling', 0)

const eraMaterialsMonthlyExpense = computed(() => {
  return Math.max(0, Number(eraMaterialsMonthlyWhaling.value || 0))
})

const eraMaterialsDailyExpense = computed(() => {
  return eraMaterialsMonthlyExpense.value / DAYS_PER_MONTH
})

const isEraExpensesComplete = computed(() => {
  return Number.isFinite(eraMaterialsMonthlyExpense.value)
})

type ExpenseStepKey = 'energy' | 'shard' | 'marquee' | 'era'

const expenseStepOrder: ExpenseStepKey[] = ['energy', 'shard', 'marquee', 'era']

const expenseStepStatus = computed<Record<ExpenseStepKey, boolean>>(() => ({
  energy: isEnergyExpensesComplete.value,
  shard: isShardExpensesComplete.value,
  marquee: isMarqueeExpensesComplete.value,
  era: isEraExpensesComplete.value,
}))

const currentExpenseStepKey = computed<ExpenseStepKey | null>(() => {
  if (!isWizardComplete.value) {
    return null
  }
  return expenseStepOrder.find((step) => !expenseStepStatus.value[step]) || null
})

const areExpenseStepsComplete = computed(() => {
  return expenseStepOrder.every((step) => expenseStepStatus.value[step])
})

const hasCompletedBudgetResults = useLocalStorage<boolean>('budget.hasCompletedBudgetResults', false)
const shouldShowResults = computed(() => {
  return (isWizardComplete.value && areExpenseStepsComplete.value) || hasCompletedBudgetResults.value
})

function scrollToSection(sectionId: string): void {
  const sectionElement = document.getElementById(sectionId)
  sectionElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function getNextExpenseStep(step: ExpenseStepKey): ExpenseStepKey | null {
  const stepIndex = expenseStepOrder.indexOf(step)
  return expenseStepOrder[stepIndex + 1] || null
}

function goToNextExpenseStep(step: ExpenseStepKey): void {
  const nextStep = getNextExpenseStep(step)
  if (nextStep) {
    scrollToSection(`step-${nextStep}`)
    return
  }
  scrollToSection('step-results')
}

function withSelection(label: string, selection?: string): string {
  if (!selection) {
    return label
  }
  return `${label} (${selection})`
}

const tbTypeSummaryLabel: Record<string, string> = {
  hoth: 'Hoth',
  geonosis: 'Geonosis',
  rote: 'RotE',
}

const fleetSummaryLabel = computed(() => {
  return withSelection('Fleet Arena', selectedFleetReward.value?.label)
})

const gacSummaryLabel = computed(() => {
  return withSelection('Grand Arena Championship', selectedGacPayout.value?.label)
})

const tbSummaryLabel = computed(() => {
  if (!selectedTbType.value || selectedTbStars.value === null) {
    return 'Territory Battles'
  }

  const tbTypeLabel = tbTypeSummaryLabel[selectedTbType.value] || selectedTbType.value
  return withSelection('Territory Battles', `${tbTypeLabel} ${selectedTbStars.value} Stars`)
})

const perideaSummaryLabel = computed(() => {
  if (doesPerideaPatrol.value !== 'yes') {
    return withSelection('Peridea Patrol AB', 'No')
  }
  return withSelection('Peridea Patrol AB', selectedPerideaTierPayout.value?.label)
})

const duelSummaryLabel = computed(() => {
  if (doesDuelOfFates.value !== 'yes') {
    return withSelection('Duel of the Fates AB', 'No')
  }
  return withSelection('Duel of the Fates AB', selectedDuelTierPayout.value?.label)
})

const marqueeGoalSummaryText: Record<MarqueeGoal, string> = {
  'four-stars': '4 Stars',
  'five-stars-one-day': '5 Stars in One Day',
  'five-stars-end-event': '5 Stars by End of Event',
  'six-stars-one-week': '6 Stars in One Week',
  'seven-stars-one-week': '7 Stars in One Week',
}

const energyExpenseSummaryLabel = computed(() => {
  const normal = Number(normalRefreshes.value ?? 0)
  const cantina = Number(cantinaRefreshes.value ?? 0)
  const mod = Number(modRefreshes.value ?? 0)
  const fleet = Number(shipRefreshes.value ?? 0)
  const conquest = Number(conquestRefreshes.value ?? 0)

  return withSelection('Energy Refresh Expenses', `${normal} Normal, ${cantina} Cantina, ${mod} Mod, ${fleet} Fleet, ${conquest} Conquest`)
})

const shardExpenseSummaryLabel = computed(() => {
  if (shardCharactersPerDay.value === null) {
    return 'Shard Refresh Expenses'
  }

  const characters = Number(shardCharactersPerDay.value)
  if (characters === 0) {
    return withSelection('Shard Refresh Expenses', '0 characters')
  }

  const refreshEach = Number(shardRefreshesPerCharacter.value ?? 0)
  const characterLabel = characters === 1 ? 'character' : 'characters'
  const refreshLabel = refreshEach === 1 ? 'refresh' : 'refreshes'
  return withSelection('Shard Refresh Expenses', `${characters} ${characterLabel}, ${refreshEach} ${refreshLabel} each`)
})

const marqueeExpenseSummaryLabel = computed(() => {
  if (!selectedMarqueeGoal.value) {
    return 'Marquee Goal Expenses'
  }

  const goalText = marqueeGoalSummaryText[selectedMarqueeGoal.value]
  const passText = purchasesEpisodePass.value === 'yes'
    ? 'with Episode pass'
    : purchasesEpisodePass.value === 'no'
      ? 'no Episode pass'
      : undefined

  const details = passText ? `${goalText}, ${passText}` : goalText
  return withSelection('Marquee Goal Expenses', details)
})

const eraExpenseSummaryLabel = computed(() => {
  return withSelection('Era/Materials Whaling Expenses', `${Math.round(eraMaterialsMonthlyExpense.value)} monthly`)
})

const finalSummaryRows = computed(() => {
  return [
    { label: 'Guaranteed Income', daily: guaranteedDailyIncome.value, monthly: guaranteedMonthlyIncome.value },
    { label: fleetSummaryLabel.value, daily: fleetDailyIncome.value, monthly: fleetMonthlyIncome.value },
    { label: gacSummaryLabel.value, daily: gacDailyIncome.value, monthly: gacMonthlyIncome.value },
    { label: tbSummaryLabel.value, daily: tbDailyIncome.value, monthly: tbMonthlyIncome.value },
    { label: perideaSummaryLabel.value, daily: perideaDailyIncome.value, monthly: perideaMonthlyIncome.value },
    { label: duelSummaryLabel.value, daily: duelDailyIncome.value, monthly: duelMonthlyIncome.value },
    { label: 'Crystal Purchases (Whale)', daily: whaleDailyIncome.value, monthly: whaleMonthlyIncome.value },
    { label: energyExpenseSummaryLabel.value, daily: -totalDailyRefreshExpense.value, monthly: -totalMonthlyRefreshExpense.value },
    { label: shardExpenseSummaryLabel.value, daily: -shardDailyExpense.value, monthly: -shardMonthlyExpense.value },
    { label: marqueeExpenseSummaryLabel.value, daily: -marqueeDailyExpense.value, monthly: -marqueeMonthlyExpense.value },
    { label: eraExpenseSummaryLabel.value, daily: -eraMaterialsDailyExpense.value, monthly: -eraMaterialsMonthlyExpense.value },
    { label: 'NET', daily: netDailyCrystals.value, monthly: netMonthlyCrystals.value },
  ]
})

const copiedResults = ref(false)

async function copyResultsTable(): Promise<void> {
  const header = 'Category\tDaily\tMonthly'
  const body = finalSummaryRows.value
    .map((row) => `${row.label}\t${row.daily.toFixed(1)}\t${row.monthly.toFixed(0)}`)
    .join('\n')

  const textToCopy = `${header}\n${body}`

  await navigator.clipboard.writeText(textToCopy)
  copiedResults.value = true
  setTimeout(() => {
    copiedResults.value = false
  }, 1800)
}

type EnergyType = 'normal' | 'cantina' | 'ship' | 'mod' | 'conquest'

const refreshOptions = Array.from({ length: 13 }, (_, index) => index)

const refreshCosts: Record<EnergyType, number[]> = {
  normal: [0, 50, 100, 150, 250, 350, 450, 650, 850, 1050, 1450, 1850, 2250],
  cantina: [0, 100, 200, 300, 500, 700, 1100, 1500, 2300, 3100, 3900, 5500, 7100],
  ship: [0, 50, 100, 150, 250, 350, 450, 650, 850, 1050, 1450, 1850, 2250],
  mod: [0, 50, 100, 150, 250, 350, 450, 650, 850, 1050, 1450, 1850, 2250],
  conquest: [0, 50, 100, 150, 250, 350, 450, 650, 850, 1050, 1450, 1850, 2250],
}

const normalRefreshes = useLocalStorage<number | null>('budget.normalRefreshes', null)
const cantinaRefreshes = useLocalStorage<number | null>('budget.cantinaRefreshes', null)
const shipRefreshes = useLocalStorage<number | null>('budget.shipRefreshes', null)
const modRefreshes = useLocalStorage<number | null>('budget.modRefreshes', null)
const conquestRefreshes = useLocalStorage<number | null>('budget.conquestRefreshes', null)

function refreshCost(type: EnergyType, count: number | null): number {
  if (count === null) {
    return 0
  }
  return refreshCosts[type][count] ?? 0
}

const normalRefreshCost = computed(() => refreshCost('normal', normalRefreshes.value))
const cantinaRefreshCost = computed(() => refreshCost('cantina', cantinaRefreshes.value))
const shipRefreshCost = computed(() => refreshCost('ship', shipRefreshes.value))
const modRefreshCost = computed(() => refreshCost('mod', modRefreshes.value))
const conquestRefreshBaseCost = computed(() => refreshCost('conquest', conquestRefreshes.value))
const conquestDailyExpense = computed(() => conquestRefreshBaseCost.value / 2)

const totalDailyRefreshExpense = computed(() => {
  return normalRefreshCost.value
    + cantinaRefreshCost.value
    + shipRefreshCost.value
    + modRefreshCost.value
    + conquestDailyExpense.value
})

const totalMonthlyRefreshExpense = computed(() => {
  return totalDailyRefreshExpense.value * DAYS_PER_MONTH
})

const shardCharacterOptions = Array.from({ length: 21 }, (_, index) => index)
const shardRefreshPerCharacterOptions = [0, 1, 2, 3, 4]
const shardRefreshCostByTimes = [0, 25, 75, 175, 275]

const shardCharactersPerDay = useLocalStorage<number | null>('budget.shardCharactersPerDay', null)
const shardRefreshesPerCharacter = useLocalStorage<number | null>('budget.shardRefreshesPerCharacter', null)

const shardCostPerCharacter = computed(() => {
  if (shardRefreshesPerCharacter.value === null) {
    return 0
  }
  return shardRefreshCostByTimes[shardRefreshesPerCharacter.value] ?? 0
})

const shardDailyExpense = computed(() => {
  if (shardCharactersPerDay.value === null) {
    return 0
  }
  return shardCharactersPerDay.value * shardCostPerCharacter.value
})

const shardMonthlyExpense = computed(() => {
  return shardDailyExpense.value * DAYS_PER_MONTH
})

type MarqueeGoal = 'four-stars' | 'five-stars-one-day' | 'five-stars-end-event' | 'six-stars-one-week' | 'seven-stars-one-week'

const MARQUEES_PER_YEAR = 26
const MARQUEE_PACK_COST = 1299
const SURGE_PACK_COST = 5999
const EPIC_SURGE_PACK_COST = 12990

const marqueeGoalOptions: Array<{ label: string, value: MarqueeGoal }> = [
  { label: 'Four Stars', value: 'four-stars' },
  { label: 'Five Stars [In One Day]', value: 'five-stars-one-day' },
  { label: 'Five Stars [By End of Event]', value: 'five-stars-end-event' },
  { label: 'Six Stars [In One Week]', value: 'six-stars-one-week' },
  { label: 'Seven Stars [In One Week]', value: 'seven-stars-one-week' },
]

const marqueeCostWithEpisodePass: Record<MarqueeGoal, number> = {
  'four-stars': 0,
  'five-stars-one-day': SURGE_PACK_COST + (2 * MARQUEE_PACK_COST),
  'five-stars-end-event': 3 * MARQUEE_PACK_COST,
  'six-stars-one-week': SURGE_PACK_COST + (4 * MARQUEE_PACK_COST),
  'seven-stars-one-week': EPIC_SURGE_PACK_COST + SURGE_PACK_COST,
}

const marqueeCostWithoutEpisodePass: Record<MarqueeGoal, number> = {
  'four-stars': 2.5 * MARQUEE_PACK_COST,
  'five-stars-one-day': SURGE_PACK_COST + (5 * MARQUEE_PACK_COST),
  'five-stars-end-event': SURGE_PACK_COST + MARQUEE_PACK_COST,
  'six-stars-one-week': EPIC_SURGE_PACK_COST,
  'seven-stars-one-week': EPIC_SURGE_PACK_COST + SURGE_PACK_COST + (2 * MARQUEE_PACK_COST),
}

const selectedMarqueeGoal = useLocalStorage<MarqueeGoal | ''>('budget.selectedMarqueeGoal', '')
const purchasesEpisodePass = useLocalStorage<'yes' | 'no' | ''>('budget.purchasesEpisodePass', '')

const marqueeCostPerRelease = computed(() => {
  if (!selectedMarqueeGoal.value || !purchasesEpisodePass.value) {
    return 0
  }

  if (purchasesEpisodePass.value === 'yes') {
    return marqueeCostWithEpisodePass[selectedMarqueeGoal.value]
  }

  return marqueeCostWithoutEpisodePass[selectedMarqueeGoal.value]
})

const marqueeAnnualExpense = computed(() => {
  return marqueeCostPerRelease.value * MARQUEES_PER_YEAR
})

const marqueeMonthlyExpense = computed(() => {
  return marqueeAnnualExpense.value / 12
})

const marqueeDailyExpense = computed(() => {
  return marqueeMonthlyExpense.value / DAYS_PER_MONTH
})

const totalDailyExpense = computed(() => {
  return totalDailyRefreshExpense.value + shardDailyExpense.value + marqueeDailyExpense.value + eraMaterialsDailyExpense.value
})

const totalMonthlyExpense = computed(() => {
  return totalMonthlyRefreshExpense.value + shardMonthlyExpense.value + marqueeMonthlyExpense.value + eraMaterialsMonthlyExpense.value
})

const netDailyCrystals = computed(() => {
  return totalDailyIncome.value - totalDailyExpense.value
})

const netMonthlyCrystals = computed(() => {
  return totalMonthlyIncome.value - totalMonthlyExpense.value
})

watch(currentStepKey, async (newStep, oldStep) => {
  if (!newStep || !oldStep || newStep === oldStep) {
    return
  }

  await nextTick()
  scrollToStep(newStep)
})

watch(currentExpenseStepKey, async (newStep, oldStep) => {
  if (!newStep || !oldStep || newStep === oldStep) {
    return
  }

  await nextTick()
  scrollToSection(`step-${newStep}`)
})

watch([isWizardComplete, areExpenseStepsComplete], ([wizardDone, expensesDone]) => {
  if (wizardDone && expensesDone) {
    hasCompletedBudgetResults.value = true
  }
}, { immediate: true })
</script>

<template>
  <div class="flex-1 bg-color min-h-screen">
    <UContainer class="py-8">
      <h1 class="text-2xl font-bold text-white mb-2">Crystal Budget Wizard - Beta</h1>
      <p class="text-gray-300 mb-6">Monthly and daily crystal budgeting.</p>

      <details class="sticky top-3 z-30 bg-gradient-to-r from-emerald-900/90 to-cyan-900/80 border border-emerald-700 rounded-xl p-4 mb-5 shadow-xl backdrop-blur-sm">
        <summary class="cursor-pointer select-none">
          <div class="grid grid-cols-3 gap-2 items-center">
            <p class="text-sm font-semibold text-cyan-100">Net</p>
            <p class="text-xl font-bold" :class="netDailyCrystals >= 0 ? 'text-cyan-200' : 'text-rose-300'">{{ netDailyCrystals.toFixed(1) }}</p>
            <p class="text-xl font-bold" :class="netMonthlyCrystals >= 0 ? 'text-cyan-200' : 'text-rose-300'">{{ netMonthlyCrystals.toFixed(0) }}</p>
          </div>
        </summary>

        <div class="pt-3">
          <p class="text-xs uppercase tracking-wide text-emerald-200 mb-2">Running Crystal Total</p>
          <div class="grid grid-cols-3 gap-2 text-xs text-emerald-100/90 mb-1">
            <p></p>
            <p>Daily</p>
            <p>Monthly</p>
          </div>

          <div class="grid grid-cols-3 gap-2 items-center mb-2">
            <p class="text-sm text-emerald-100/90">Income</p>
            <p class="text-lg font-bold text-emerald-200">{{ totalDailyIncome.toFixed(1) }}</p>
            <p class="text-lg font-bold text-emerald-200">{{ totalMonthlyIncome.toFixed(0) }}</p>
          </div>

          <div class="grid grid-cols-3 gap-2 items-center mb-2">
            <p class="text-sm text-rose-200/90">Expenses</p>
            <p class="text-lg font-bold text-rose-300">{{ totalDailyExpense.toFixed(1) }}</p>
            <p class="text-lg font-bold text-rose-300">{{ totalMonthlyExpense.toFixed(0) }}</p>
          </div>

          <div class="grid grid-cols-3 gap-2 items-center pt-2 border-t border-emerald-700/40">
            <p class="text-sm text-cyan-100">Net</p>
            <p class="text-xl font-bold" :class="netDailyCrystals >= 0 ? 'text-cyan-200' : 'text-rose-300'">{{ netDailyCrystals.toFixed(1) }}</p>
            <p class="text-xl font-bold" :class="netMonthlyCrystals >= 0 ? 'text-cyan-200' : 'text-rose-300'">{{ netMonthlyCrystals.toFixed(0) }}</p>
          </div>
        </div>
      </details>

      <details class="bg-slate-900/70 border border-slate-700 rounded-xl p-5">
        <summary class="cursor-pointer select-none text-lg font-semibold text-white">Guaranteed Income</summary>

        <div class="pt-4">
          <ul class="space-y-2 text-sm mb-5">
            <li class="flex justify-between text-slate-200">
              <span>Login Calendar</span>
              <span class="font-semibold">{{ guaranteedIncome.loginCalendarMonthly }} / month</span>
            </li>
            <li class="flex justify-between text-slate-200">
              <span>Galactic Bounties</span>
              <span class="font-semibold">{{ guaranteedIncome.galacticBountiesMonthly }} / month</span>
            </li>
            <li class="flex justify-between text-slate-200">
              <span>Dailies</span>
              <span class="font-semibold">{{ guaranteedIncome.dailiesDaily }} / day</span>
            </li>
            <li class="flex justify-between text-slate-200">
              <span>Galactic War</span>
              <span class="font-semibold">{{ guaranteedIncome.galacticWarDaily }} / day</span>
            </li>
          </ul>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
              <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Guaranteed Daily Income</p>
              <p class="text-xl font-bold text-emerald-300">{{ guaranteedDailyIncome.toFixed(1) }}</p>
            </div>
            <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
              <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Guaranteed Monthly Income</p>
              <p class="text-xl font-bold text-emerald-300">{{ guaranteedMonthlyIncome }}</p>
            </div>
          </div>
        </div>

      </details>

      <div id="step-fleet" :class="['bg-slate-900/70 border border-slate-700 rounded-xl p-5 mt-5 scroll-mt-28', isCurrentStep('fleet') ? 'step-highlight' : '']">
        <h2 class="text-lg font-semibold text-white mb-2">Step 1: Fleet Arena Rank</h2>
        <p class="text-sm text-slate-300 mb-4">What rank do you usually finish in Fleet Arena each day?</p>

        <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Average Daily Fleet Rank</label>
        <select
          v-model="selectedFleetRank"
          class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 mb-4"
        >
          <option disabled value="">Select your rank range</option>
          <option v-for="option in fleetRankOptions" :key="option.value" :value="option.value">
            {{ option.label }} ({{ option.crystals }} crystals/day)
          </option>
        </select>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Fleet Daily Income</p>
            <p class="text-xl font-bold text-cyan-300">{{ fleetDailyIncome }}</p>
          </div>
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Fleet Monthly Income</p>
            <p class="text-xl font-bold text-cyan-300">{{ fleetMonthlyIncome }}</p>
          </div>
        </div>

        <button
          v-if="isStepComplete('fleet') && getNextStep('fleet')"
          @click="goToNextStep('fleet')"
          class="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors"
        >
          Next: Step 2
        </button>
      </div>

      <div v-if="fleetComplete" id="step-gac" :class="['bg-slate-900/70 border border-slate-700 rounded-xl p-5 mt-5 scroll-mt-28', isCurrentStep('gac') ? 'step-highlight' : '']">
        <h2 class="text-lg font-semibold text-white mb-2">Step 2: GAC Division</h2>
        <p class="text-sm text-slate-300 mb-2">Which GAC division are you currently in?</p>
        <p class="text-xs text-slate-400 mb-4">Assumption: 13 GAC rounds/year, 6 wins + 6 losses per round.</p>

        <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Current GAC Division</label>
        <select
          v-model="selectedGacDivision"
          class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 mb-4"
        >
          <option disabled value="">Select your GAC division</option>
          <option v-for="option in gacDivisionOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>

        <details class="mb-3 rounded-lg border border-slate-700 bg-slate-800/40">
          <summary class="cursor-pointer select-none px-3 py-2 text-sm text-slate-200">Show detailed GAC payouts</summary>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 pt-0">
            <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
              <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Daily Payout</p>
              <p class="text-lg font-bold text-violet-300">{{ selectedGacPayout?.daily || 0 }}</p>
            </div>
            <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
              <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Victory Payout</p>
              <p class="text-lg font-bold text-violet-300">{{ selectedGacPayout?.victory || 0 }}</p>
            </div>
            <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
              <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Defeat Payout</p>
              <p class="text-lg font-bold text-violet-300">{{ selectedGacPayout?.defeat || 0 }}</p>
            </div>
            <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
              <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Championship</p>
              <p class="text-lg font-bold text-violet-300">{{ selectedGacPayout?.championship || 0 }}</p>
            </div>
          </div>
        </details>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Estimated GAC Daily Income</p>
            <p class="text-xl font-bold text-violet-300">{{ gacDailyIncome.toFixed(1) }}</p>
          </div>
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Estimated GAC Monthly Income</p>
            <p class="text-xl font-bold text-violet-300">{{ gacMonthlyIncome.toFixed(0) }}</p>
          </div>
        </div>

        <button
          v-if="isStepComplete('gac') && getNextStep('gac')"
          @click="goToNextStep('gac')"
          class="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors"
        >
          Next: Step 3
        </button>
      </div>

      <div v-if="gacComplete" id="step-tb" :class="['bg-slate-900/70 border border-slate-700 rounded-xl p-5 mt-5 scroll-mt-28', isCurrentStep('tb') ? 'step-highlight' : '']">
        <h2 class="text-lg font-semibold text-white mb-2">Step 3: Territory Battles</h2>
        <p class="text-sm text-slate-300 mb-2">Which Territory Battle does your guild run, and how many stars do you average?</p>
        <p class="text-xs text-slate-400 mb-4">Assumption: Territory Battles run 26 times per year.</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Territory Battle</label>
            <select
              v-model="selectedTbType"
              class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2"
            >
              <option disabled value="">Select TB type</option>
              <option v-for="option in tbTypeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div>
            <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Average Stars</label>
            <select
              v-model.number="selectedTbStars"
              class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2"
              :disabled="!selectedTbType"
            >
              <option :value="null" disabled>Select stars</option>
              <option v-for="option in tbStarOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <p v-if="selectedTbType === 'hoth' || selectedTbType === 'geonosis'" class="text-xs text-amber-300 mb-3">
          Star options are capped at the first row where payout data becomes unreliable.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Crystals Per TB</p>
            <p class="text-xl font-bold text-amber-300">{{ tbCrystalsPerRun }}</p>
          </div>
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Estimated TB Daily Income</p>
            <p class="text-xl font-bold text-amber-300">{{ tbDailyIncome.toFixed(1) }}</p>
          </div>
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Estimated TB Monthly Income</p>
            <p class="text-xl font-bold text-amber-300">{{ tbMonthlyIncome.toFixed(0) }}</p>
          </div>
        </div>

        <button
          v-if="isStepComplete('tb') && getNextStep('tb')"
          @click="goToNextStep('tb')"
          class="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors"
        >
          Next: Step 4
        </button>
      </div>

      <div v-if="tbComplete" id="step-peridea" :class="['bg-slate-900/70 border border-slate-700 rounded-xl p-5 mt-5 scroll-mt-28', isCurrentStep('peridea') ? 'step-highlight' : '']">
        <h2 class="text-lg font-semibold text-white mb-2">Step 4: Peridea Patrol Assault Battle</h2>
        <p class="text-sm text-slate-300 mb-4">Do you complete the Peridea Patrol Assault Battle?</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <label class="flex items-center gap-2 text-slate-200 text-sm">
            <input v-model="doesPerideaPatrol" type="radio" value="yes" class="accent-emerald-500" />
            Yes
          </label>
          <label class="flex items-center gap-2 text-slate-200 text-sm">
            <input v-model="doesPerideaPatrol" type="radio" value="no" class="accent-emerald-500" />
            No
          </label>
        </div>

        <div v-if="doesPerideaPatrol === 'yes'" class="mb-4">
          <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Highest Tier Completed</label>
          <select
            v-model="selectedPerideaTier"
            class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2"
          >
            <option disabled value="">Select tier</option>
            <option v-for="option in perideaTierOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Peridea Daily Income</p>
            <p class="text-xl font-bold text-lime-300">{{ perideaDailyIncome.toFixed(1) }}</p>
          </div>
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Peridea Monthly Income</p>
            <p class="text-xl font-bold text-lime-300">{{ perideaMonthlyIncome }}</p>
          </div>
        </div>

        <button
          v-if="isStepComplete('peridea') && getNextStep('peridea')"
          @click="goToNextStep('peridea')"
          class="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors"
        >
          Next: Step 5
        </button>
      </div>

      <div v-if="perideaComplete" id="step-duel" :class="['bg-slate-900/70 border border-slate-700 rounded-xl p-5 mt-5 scroll-mt-28', isCurrentStep('duel') ? 'step-highlight' : '']">
        <h2 class="text-lg font-semibold text-white mb-2">Step 5: Duel of the Fates Assault Battle</h2>
        <p class="text-sm text-slate-300 mb-4">Do you complete the Duel of the Fates Assault Battle?</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <label class="flex items-center gap-2 text-slate-200 text-sm">
            <input v-model="doesDuelOfFates" type="radio" value="yes" class="accent-emerald-500" />
            Yes
          </label>
          <label class="flex items-center gap-2 text-slate-200 text-sm">
            <input v-model="doesDuelOfFates" type="radio" value="no" class="accent-emerald-500" />
            No
          </label>
        </div>

        <div v-if="doesDuelOfFates === 'yes'" class="mb-4">
          <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Highest Tier Completed</label>
          <select
            v-model="selectedDuelTier"
            class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2"
          >
            <option disabled value="">Select tier</option>
            <option v-for="option in perideaTierOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Duel Daily Income</p>
            <p class="text-xl font-bold text-lime-300">{{ duelDailyIncome.toFixed(1) }}</p>
          </div>
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Duel Monthly Income</p>
            <p class="text-xl font-bold text-lime-300">{{ duelMonthlyIncome }}</p>
          </div>
        </div>

        <button
          v-if="isStepComplete('duel') && getNextStep('duel')"
          @click="goToNextStep('duel')"
          class="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors"
        >
          Next: Step 6
        </button>
      </div>

      <div v-if="duelComplete" id="step-whale" :class="['bg-slate-900/70 border border-slate-700 rounded-xl p-5 mt-5 scroll-mt-28', isCurrentStep('whale') ? 'step-highlight' : '']">
        <h2 class="text-lg font-semibold text-white mb-2">Step 6: Crystal Purchases</h2>
        <p class="text-sm text-slate-300 mb-4">Do you whale?</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <label class="flex items-center gap-2 text-slate-200 text-sm">
            <input v-model="doesWhale" type="radio" value="yes" class="accent-emerald-500" />
            Yes
          </label>
          <label class="flex items-center gap-2 text-slate-200 text-sm">
            <input v-model="doesWhale" type="radio" value="no" class="accent-emerald-500" />
            No
          </label>
        </div>

        <div v-if="doesWhale === 'yes'" class="mb-4">
          <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Crystals Purchased Per Month</label>
          <input
            v-model.number="whalePurchasedMonthly"
            type="number"
            min="0"
            step="1"
            class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2"
            placeholder="0"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Whale Daily Income</p>
            <p class="text-xl font-bold text-pink-300">{{ whaleDailyIncome.toFixed(1) }}</p>
          </div>
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Whale Monthly Income</p>
            <p class="text-xl font-bold text-pink-300">{{ whaleMonthlyIncome }}</p>
          </div>
        </div>

        <button
          v-if="isStepComplete('whale')"
          @click="scrollToSection('step-energy')"
          class="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors"
        >
          Next: Step 7
        </button>
      </div>

      <div id="step-energy" v-if="isWizardComplete" class="bg-slate-900/80 border border-rose-700 rounded-xl p-5 mt-5 scroll-mt-28">
        <h2 class="text-lg font-semibold text-white mb-2">Step 7: Expenses - Energy Refreshes</h2>
        <p class="text-sm text-slate-300 mb-4">Enter these in order: Normal → Cantina → Ship → Mod → Conquest.</p>

        <div class="space-y-4">
          <div>
            <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Normal refreshes/day</label>
            <select v-model.number="normalRefreshes" class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2">
              <option :value="null" disabled>Select count</option>
              <option v-for="option in refreshOptions" :key="`normal-${option}`" :value="option">{{ option }}</option>
            </select>
          </div>

          <div v-if="normalRefreshes !== null">
            <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Cantina refreshes/day</label>
            <select v-model.number="cantinaRefreshes" class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2">
              <option :value="null" disabled>Select count</option>
              <option v-for="option in refreshOptions" :key="`cantina-${option}`" :value="option">{{ option }}</option>
            </select>
          </div>

          <div v-if="cantinaRefreshes !== null">
            <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Ship refreshes/day</label>
            <select v-model.number="shipRefreshes" class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2">
              <option :value="null" disabled>Select count</option>
              <option v-for="option in refreshOptions" :key="`ship-${option}`" :value="option">{{ option }}</option>
            </select>
          </div>

          <div v-if="shipRefreshes !== null">
            <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Mod refreshes/day</label>
            <select v-model.number="modRefreshes" class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2">
              <option :value="null" disabled>Select count</option>
              <option v-for="option in refreshOptions" :key="`mod-${option}`" :value="option">{{ option }}</option>
            </select>
          </div>

          <div v-if="modRefreshes !== null">
            <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Conquest refreshes/day</label>
            <select v-model.number="conquestRefreshes" class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2">
              <option :value="null" disabled>Select count</option>
              <option v-for="option in refreshOptions" :key="`conquest-${option}`" :value="option">{{ option }}</option>
            </select>
            <p class="text-xs text-slate-400 mt-2">Conquest is only active about half the time, so this cost is halved in daily/monthly totals.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Total Daily Refresh Expense</p>
            <p class="text-xl font-bold text-rose-300">{{ totalDailyRefreshExpense }}</p>
          </div>
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Total Monthly Refresh Expense</p>
            <p class="text-xl font-bold text-rose-300">{{ totalMonthlyRefreshExpense }}</p>
          </div>
        </div>

        <button
          v-if="isEnergyExpensesComplete"
          @click="goToNextExpenseStep('energy')"
          class="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors"
        >
          Next: Step 8
        </button>
      </div>

      <div id="step-shard" v-if="isWizardComplete && isEnergyExpensesComplete" class="bg-slate-900/80 border border-rose-700 rounded-xl p-5 mt-5 scroll-mt-28">
        <h2 class="text-lg font-semibold text-white mb-2">Step 8: Expenses - Shard Refreshes</h2>
        <p class="text-sm text-slate-300 mb-4">How many characters are you shard refreshing per day, and how many times each?</p>

        <div class="space-y-4">
          <div>
            <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Characters shard refreshed per day</label>
            <select v-model.number="shardCharactersPerDay" class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2">
              <option :value="null" disabled>Select count</option>
              <option v-for="option in shardCharacterOptions" :key="`shard-character-${option}`" :value="option">{{ option }}</option>
            </select>
          </div>

          <div v-if="shardCharactersPerDay !== null && shardCharactersPerDay > 0">
            <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Refreshes per character per day</label>
            <select v-model.number="shardRefreshesPerCharacter" class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2">
              <option :value="null" disabled>Select refresh count</option>
              <option v-for="option in shardRefreshPerCharacterOptions" :key="`shard-times-${option}`" :value="option">{{ option }}</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Total Daily Shard Expense</p>
            <p class="text-xl font-bold text-rose-300">{{ shardDailyExpense }}</p>
          </div>
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Total Monthly Shard Expense</p>
            <p class="text-xl font-bold text-rose-300">{{ shardMonthlyExpense }}</p>
          </div>
        </div>

        <button
          v-if="isShardExpensesComplete"
          @click="goToNextExpenseStep('shard')"
          class="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors"
        >
          Next: Step 9
        </button>
      </div>

      <div id="step-marquee" v-if="isWizardComplete && isShardExpensesComplete" class="bg-slate-900/80 border border-rose-700 rounded-xl p-5 mt-5 scroll-mt-28">
        <h2 class="text-lg font-semibold text-white mb-2">Step 9: Expenses - New Marquee Shard Goals</h2>
        <p class="text-sm text-slate-300 mb-4">A new marquee is released every 2 weeks (26 per year). Choose your goal and whether you purchase the Episode Pass.</p>

        <div class="space-y-4">
          <div>
            <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Marquee goal</label>
            <select v-model="selectedMarqueeGoal" class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2">
              <option value="" disabled>Select goal</option>
              <option v-for="option in marqueeGoalOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
          </div>

          <div v-if="selectedMarqueeGoal">
            <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Do you purchase the Episode Pass?</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label class="flex items-center gap-2 text-slate-200 text-sm">
                <input v-model="purchasesEpisodePass" type="radio" value="yes" class="accent-emerald-500" />
                Yes
              </label>
              <label class="flex items-center gap-2 text-slate-200 text-sm">
                <input v-model="purchasesEpisodePass" type="radio" value="no" class="accent-emerald-500" />
                No
              </label>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Marquee Daily Expense</p>
            <p class="text-xl font-bold text-rose-300">{{ marqueeDailyExpense.toFixed(1) }}</p>
          </div>
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Marquee Monthly Expense</p>
            <p class="text-xl font-bold text-rose-300">{{ marqueeMonthlyExpense.toFixed(0) }}</p>
          </div>
        </div>

        <button
          v-if="isMarqueeExpensesComplete"
          @click="goToNextExpenseStep('marquee')"
          class="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors"
        >
          Next: Step 10
        </button>
      </div>

      <div id="step-era" v-if="isWizardComplete && isMarqueeExpensesComplete" class="bg-slate-900/80 border border-rose-700 rounded-xl p-5 mt-5 scroll-mt-28">
        <h2 class="text-lg font-semibold text-white mb-2">Step 10: Estimate Monthly Crystal Whaling on Era Currency and Materials</h2>
        <p class="text-sm text-slate-300 mb-4">This defaults to 0.</p>

        <label class="text-xs uppercase tracking-wide text-slate-400 mb-2 block">Monthly crystal spend on era currency/materials</label>
        <input
          v-model.number="eraMaterialsMonthlyWhaling"
          type="number"
          min="0"
          step="1"
          class="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2"
          placeholder="0"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Era/Materials Daily Expense</p>
            <p class="text-xl font-bold text-rose-300">{{ eraMaterialsDailyExpense.toFixed(1) }}</p>
          </div>
          <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
            <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">Era/Materials Monthly Expense</p>
            <p class="text-xl font-bold text-rose-300">{{ eraMaterialsMonthlyExpense.toFixed(0) }}</p>
          </div>
        </div>

        <button
          v-if="isEraExpensesComplete"
          @click="goToNextExpenseStep('era')"
          class="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors"
        >
          Next: Results
        </button>
      </div>

      <div v-if="shouldShowResults" class="bg-slate-900/80 border border-rose-700 rounded-xl p-5 mt-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="bg-slate-800/70 rounded-lg p-3 border border-rose-500/40">
            <p class="text-xs uppercase tracking-wide text-slate-300 mb-1">Total Daily Expense (All)</p>
            <p class="text-xl font-bold text-rose-300">{{ Math.round(totalDailyExpense) }}</p>
          </div>
          <div class="bg-slate-800/70 rounded-lg p-3 border border-rose-500/40">
            <p class="text-xs uppercase tracking-wide text-slate-300 mb-1">Total Monthly Expense (All)</p>
            <p class="text-xl font-bold text-rose-300">{{ Math.round(totalMonthlyExpense) }}</p>
          </div>
        </div>
      </div>

      <div v-if="shouldShowResults" id="step-results" class="bg-slate-900/80 border border-emerald-700 rounded-xl p-5 mt-5 scroll-mt-28">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h2 class="text-lg font-semibold text-white">Total Monthly Budget</h2>
          <button
            @click="copyResultsTable"
            class="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-500 text-slate-900 hover:bg-emerald-400 transition-colors"
          >
            {{ copiedResults ? 'Copied!' : 'Copy Table' }}
          </button>
        </div>

        <p class="text-sm text-slate-300 mb-3">Income and expenses combined. Copy and paste this into notes or a spreadsheet.</p>

        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left border border-slate-700 rounded-lg overflow-hidden">
            <thead class="bg-slate-800">
              <tr>
                <th class="px-3 py-2 text-slate-300 font-semibold">Category</th>
                <th class="px-3 py-2 text-slate-300 font-semibold">Daily</th>
                <th class="px-3 py-2 text-slate-300 font-semibold">Monthly</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in finalSummaryRows" :key="row.label" class="border-t border-slate-700" :class="row.label === 'NET' ? 'bg-emerald-900/20' : ''">
                <td class="px-3 py-2 text-slate-200" :class="row.label === 'NET' ? 'font-bold text-emerald-200' : ''">{{ row.label }}</td>
                <td class="px-3 py-2 text-slate-200" :class="row.label === 'NET' ? 'font-bold text-emerald-200' : ''">{{ row.daily.toFixed(1) }}</td>
                <td class="px-3 py-2 text-slate-200" :class="row.label === 'NET' ? 'font-bold text-emerald-200' : ''">{{ row.monthly.toFixed(0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.bg-color {
  background-color: #0D0D2B;
}

.step-highlight {
  border-color: #22d3ee;
  box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.45);
}
</style>
