<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
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
import type { EnergyType, MarqueeGoal } from '~/data/budgetExpenses'

const DAYS_PER_MONTH = 30
const { gtag } = useGtag()

onMounted(() => {
  gtag('event', 'budget_page_view', {
    path: '/budget',
    transport_type: 'beacon',
  })
})

const isGuaranteedIncomeAssumptionsOpen = ref(false)
const isFleetArenaSourceOpen = ref(false)
const isGacSourceOpen = ref(false)
const isTbSourceOpen = ref(false)
const isPerideaSourceOpen = ref(false)
const isDuelSourceOpen = ref(false)
const isEnergySourceOpen = ref(false)
const isShardSourceOpen = ref(false)
const isMarqueeSourceOpen = ref(false)

const guaranteedMonthlyIncome = computed(() => {
  return guaranteedIncome.loginCalendarMonthly
    + guaranteedIncome.galacticBountiesMonthly
    + ((guaranteedIncome.dailiesDaily + guaranteedIncome.galacticWarDaily) * DAYS_PER_MONTH)
})

const guaranteedDailyIncome = computed(() => {
  return guaranteedMonthlyIncome.value / DAYS_PER_MONTH
})

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

const selectedGacDivision = useLocalStorage<string>('budget.selectedGacDivision', '')

const selectedGacPayout = computed(() => {
  return gacDivisionOptions.find((option) => option.value === selectedGacDivision.value)
})

const GAC_END_OF_ROUND_REWARD = 750 / 2
const GAC_END_OF_ROUND_WEEKS_PER_YEAR = (52 * 3) / 4

const gacAnnualEndOfRoundRewards = computed(() => {
  if (!selectedGacPayout.value) {
    return 0
  }
  return GAC_END_OF_ROUND_REWARD * GAC_END_OF_ROUND_WEEKS_PER_YEAR
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
  const annualEndOfRoundIncome = gacAnnualEndOfRoundRewards.value

  return dailyIncome + annualRoundIncome + annualChampionshipIncome + annualEndOfRoundIncome
})

const gacMonthlyIncome = computed(() => {
  return gacAnnualIncome.value / 12
})

const gacDailyIncome = computed(() => {
  return gacMonthlyIncome.value / DAYS_PER_MONTH
})

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
  'four-stars': '4 ⭐',
  'five-stars-one-day': '5 ⭐ first day',
  'five-stars-end-event': '5 ⭐ in a week',
  'six-stars-one-week': '6 ⭐ in a week',
  'seven-stars-one-week': '7 ⭐ in a week',
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
          <button
            type="button"
            @click="isGuaranteedIncomeAssumptionsOpen = true"
            class="mb-4 text-xs font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
          >
            How were these guaranteed values estimated?
          </button>

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

          <UModal v-model="isGuaranteedIncomeAssumptionsOpen" :ui="{ width: 'sm:max-w-2xl' }">
            <UCard :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-slate-700' }">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-semibold text-white">Guaranteed Income Assumptions</h3>
                  <button
                    type="button"
                    class="text-slate-400 hover:text-white"
                    @click="isGuaranteedIncomeAssumptionsOpen = false"
                  >
                    ✕
                  </button>
                </div>
              </template>

              <div class="space-y-3 text-sm text-slate-200">
                <p>
                  <span class="font-semibold text-white">Galactic Bounties:</span>
                  assuming this event runs once per month, each sim gives 100 crystals, and you can sim it twice (2 × 100 = 200/month).
                </p>
                <p>
                  <span class="font-semibold text-white">Dailies:</span>
                  assuming a guaranteed 65 crystals from the prize box plus an estimated 15 crystals on average from the bonus box (65 + 15 = 80/day).
                </p>
              </div>
            </UCard>
          </UModal>
        </div>

      </details>

      <div id="step-fleet" :class="['bg-slate-900/70 border border-slate-700 rounded-xl p-5 mt-5 scroll-mt-28', isCurrentStep('fleet') ? 'step-highlight' : '']">
        <h2 class="text-lg font-semibold text-white mb-2">Step 1: Fleet Arena Rank</h2>
        <p class="text-sm text-slate-300 mb-4">What rank do you usually finish in Fleet Arena each day?</p>

        <button
          type="button"
          @click="isFleetArenaSourceOpen = true"
          class="mb-4 text-xs font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
        >
          Source for Fleet Arena payouts
        </button>

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

        <UModal v-model="isFleetArenaSourceOpen" :ui="{ width: 'sm:max-w-xl' }">
          <UCard :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-slate-700' }">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold text-white">Fleet Arena Source</h3>
                <button
                  type="button"
                  class="text-slate-400 hover:text-white"
                  @click="isFleetArenaSourceOpen = false"
                >
                  ✕
                </button>
              </div>
            </template>

            <p class="text-sm text-slate-200">
              Fleet Arena rank payout values are sourced from
              <a
                href="https://swgoh.wiki/wiki/Fleet_Arena"
                target="_blank"
                rel="noopener noreferrer"
                class="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
              >
                swgoh.wiki/wiki/Fleet_Arena
              </a>
            </p>
          </UCard>
        </UModal>

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
        <p class="text-xs text-slate-400 mb-4">Assumption: 13 GAC rounds/year, average 4.5 wins + 4.5 losses per active cycle, and end of round rewards (750/2) for 3 out of 4 weeks.</p>

        <button
          type="button"
          @click="isGacSourceOpen = true"
          class="mb-4 text-xs font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
        >
          Source for GAC payouts
        </button>

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
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-3 pt-0">
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
            <div class="bg-slate-800/70 rounded-lg p-3 border border-slate-700">
              <p class="text-xs uppercase tracking-wide text-slate-400 mb-1">End of Round Rewards</p>
              <p class="text-lg font-bold text-violet-300">{{ GAC_END_OF_ROUND_REWARD }}</p>
              <p class="text-[11px] text-slate-400 mt-1">3 of 4 weeks ({{ GAC_END_OF_ROUND_WEEKS_PER_YEAR }}/year)</p>
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

        <UModal v-model="isGacSourceOpen" :ui="{ width: 'sm:max-w-xl' }">
          <UCard :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-slate-700' }">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold text-white">Grand Arena Source</h3>
                <button
                  type="button"
                  class="text-slate-400 hover:text-white"
                  @click="isGacSourceOpen = false"
                >
                  ✕
                </button>
              </div>
            </template>

            <p class="text-sm text-slate-200">
              Grand Arena payout values are sourced from
              <a
                href="https://swgoh.wiki/wiki/Grand_Arena_Championships"
                target="_blank"
                rel="noopener noreferrer"
                class="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
              >
                swgoh.wiki/wiki/Grand_Arena_Championships
              </a>
            </p>
          </UCard>
        </UModal>

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

        <button
          type="button"
          @click="isTbSourceOpen = true"
          class="mb-4 text-xs font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
        >
          Source for Territory Battle payouts
        </button>

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

        <UModal v-model="isTbSourceOpen" :ui="{ width: 'sm:max-w-xl' }">
          <UCard :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-slate-700' }">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold text-white">Territory Battle Source</h3>
                <button
                  type="button"
                  class="text-slate-400 hover:text-white"
                  @click="isTbSourceOpen = false"
                >
                  ✕
                </button>
              </div>
            </template>

            <p class="text-sm text-slate-200">
              Territory Battle payout values are sourced from
              <a
                href="https://swgoh.wiki/wiki/Rise_of_the_Empire#Rewards:_56_to_37_Stars"
                target="_blank"
                rel="noopener noreferrer"
                class="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
              >
                swgoh.wiki/wiki/Rise_of_the_Empire#Rewards:_56_to_37_Stars
              </a>
            </p>
          </UCard>
        </UModal>

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

        <button
          type="button"
          @click="isPerideaSourceOpen = true"
          class="mb-4 text-xs font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
        >
          Source for Peridea Patrol payouts
        </button>

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

        <UModal v-model="isPerideaSourceOpen" :ui="{ width: 'sm:max-w-xl' }">
          <UCard :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-slate-700' }">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold text-white">Peridea Patrol Source</h3>
                <button
                  type="button"
                  class="text-slate-400 hover:text-white"
                  @click="isPerideaSourceOpen = false"
                >
                  ✕
                </button>
              </div>
            </template>

            <p class="text-sm text-slate-200">
              Peridea Patrol payout values are sourced from
              <a
                href="https://swgoh.wiki/wiki/Peridea_Patrol"
                target="_blank"
                rel="noopener noreferrer"
                class="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
              >
                swgoh.wiki/wiki/Peridea_Patrol
              </a>
            </p>
          </UCard>
        </UModal>

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

        <button
          type="button"
          @click="isDuelSourceOpen = true"
          class="mb-4 text-xs font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
        >
          Source for Duel of the Fates payouts
        </button>

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

        <UModal v-model="isDuelSourceOpen" :ui="{ width: 'sm:max-w-xl' }">
          <UCard :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-slate-700' }">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold text-white">Duel of the Fates Source</h3>
                <button
                  type="button"
                  class="text-slate-400 hover:text-white"
                  @click="isDuelSourceOpen = false"
                >
                  ✕
                </button>
              </div>
            </template>

            <p class="text-sm text-slate-200">
              Duel of the Fates payout values are sourced from
              <a
                href="https://swgoh.wiki/wiki/Duel_of_the_Fates"
                target="_blank"
                rel="noopener noreferrer"
                class="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
              >
                swgoh.wiki/wiki/Duel_of_the_Fates
              </a>
            </p>
          </UCard>
        </UModal>

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

        <button
          type="button"
          @click="isEnergySourceOpen = true"
          class="mb-4 text-xs font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
        >
          Sources for energy refresh costs
        </button>

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

        <UModal v-model="isEnergySourceOpen" :ui="{ width: 'sm:max-w-2xl' }">
          <UCard :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-slate-700' }">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold text-white">Energy Refresh Sources</h3>
                <button
                  type="button"
                  class="text-slate-400 hover:text-white"
                  @click="isEnergySourceOpen = false"
                >
                  ✕
                </button>
              </div>
            </template>

            <ul class="space-y-2 text-sm text-slate-200">
              <li>
                <span class="font-semibold text-white">Normal + Fleet Energy:</span>
                <a href="https://swgoh.wiki/wiki/Energy" target="_blank" rel="noopener noreferrer" class="ml-1 text-cyan-300 underline underline-offset-2 hover:text-cyan-200">swgoh.wiki/wiki/Energy</a>
              </li>
              <li>
                <span class="font-semibold text-white">Cantina Energy:</span>
                <a href="https://swgoh.wiki/wiki/Cantina_Energy" target="_blank" rel="noopener noreferrer" class="ml-1 text-cyan-300 underline underline-offset-2 hover:text-cyan-200">swgoh.wiki/wiki/Cantina_Energy</a>
              </li>
              <li>
                <span class="font-semibold text-white">Mod Energy:</span>
                <a href="https://swgoh.wiki/wiki/Mod_Energy" target="_blank" rel="noopener noreferrer" class="ml-1 text-cyan-300 underline underline-offset-2 hover:text-cyan-200">swgoh.wiki/wiki/Mod_Energy</a>
              </li>
              <li>
                <span class="font-semibold text-white">Conquest Energy:</span>
                <a href="https://swgoh.wiki/wiki/Conquest_Energy" target="_blank" rel="noopener noreferrer" class="ml-1 text-cyan-300 underline underline-offset-2 hover:text-cyan-200">swgoh.wiki/wiki/Conquest_Energy</a>
              </li>
            </ul>
          </UCard>
        </UModal>

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

        <button
          type="button"
          @click="isShardSourceOpen = true"
          class="mb-4 text-xs font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
        >
          Source for hard node refresh costs
        </button>

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

        <UModal v-model="isShardSourceOpen" :ui="{ width: 'sm:max-w-xl' }">
          <UCard :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-slate-700' }">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold text-white">Hard Node Refresh Costs Source</h3>
                <button
                  type="button"
                  class="text-slate-400 hover:text-white"
                  @click="isShardSourceOpen = false"
                >
                  ✕
                </button>
              </div>
            </template>

            <p class="text-sm text-slate-200">
              Hard node refresh costs are sourced from
              <a
                href="https://www.reddit.com/r/SWGalaxyOfHeroes/comments/aem1kw/hard_node_refresh_costs/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
              >
                reddit.com/r/SWGalaxyOfHeroes/comments/aem1kw/hard_node_refresh_costs
              </a>
            </p>
          </UCard>
        </UModal>

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

        <button
          type="button"
          @click="isMarqueeSourceOpen = true"
          class="mb-4 text-xs font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
        >
          Sources and assumptions for marquee math
        </button>

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

        <UModal v-model="isMarqueeSourceOpen" :ui="{ width: 'sm:max-w-2xl' }">
          <UCard :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-slate-700' }">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold text-white">Marquee Sources & Assumptions</h3>
                <button
                  type="button"
                  class="text-slate-400 hover:text-white"
                  @click="isMarqueeSourceOpen = false"
                >
                  ✕
                </button>
              </div>
            </template>

            <div class="space-y-3 text-sm text-slate-200">
              <p>
                Odds source:
                <a
                  href="/images/marquee_odds.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
                >
                  /images/marquee_odds.png
                </a>
              </p>
              <p>
                Event source:
                <a
                  href="https://swgoh.gg/events/EVENT_MARQUEE_KLEYA/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
                >
                  swgoh.gg/events/EVENT_MARQUEE_KLEYA/
                </a>
              </p>
              <p>Assumptions: 1 marquee pack = 1299 crystals, surge pack = 5 marquee packs, epic surge pack = 12 marquee packs, and all pulls are independent.</p>

              <div class="mt-4 rounded-lg border border-slate-700 overflow-hidden">
                <div class="grid grid-cols-3 bg-slate-800/70 text-xs uppercase tracking-wide text-slate-300">
                  <p class="px-3 py-2">Goal</p>
                  <p class="px-3 py-2">With Episode Pass</p>
                  <p class="px-3 py-2">Without Episode Pass</p>
                </div>
                <div
                  v-for="option in marqueeGoalOptions"
                  :key="`marquee-cost-${option.value}`"
                  class="grid grid-cols-3 border-t border-slate-700 text-sm"
                >
                  <p class="px-3 py-2 text-slate-200">{{ option.label }}</p>
                  <p class="px-3 py-2 text-rose-300">{{ marqueeCostWithEpisodePass[option.value].toFixed(0) }}</p>
                  <p class="px-3 py-2 text-rose-300">{{ marqueeCostWithoutEpisodePass[option.value].toFixed(0) }}</p>
                </div>
              </div>
            </div>
          </UCard>
        </UModal>

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
