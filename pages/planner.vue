<script setup lang="ts">
import { PHASE_ORDER } from '~/util/plannerHelpers';

// ── Roster integration ──────────────────────────────────────────
const {
  isFetched: playerDataFetched,
  rosterUnits,
} = usePlayerRoster();

const rosterUnitMap = computed<Set<string> | null>(() => {
  if (!playerDataFetched.value) return null;
  const set = new Set<string>();
  for (const unit of rosterUnits.value) {
    const defId = unit.definitionId;
    if (!defId) continue;
    const [gameIdRaw, rarity] = defId.split(':');
    if (rarity === 'SEVEN_STAR' && gameIdRaw) {
      set.add(gameIdRaw.toLowerCase());
    }
  }
  return set;
});

// ── Planner state ───────────────────────────────────────────────
const {
  DAYS,
  dayStates,
  allPlanets,
  getDayLeadOptions,
  isMissionSelected,
  toggleMission,
  planetSelectionCount,
  togglePlanet,
  toggleExcludedLead,
  getPlanetAvailability,
  solve,
  solveAll,
  clearDay,
  clearAll,
} = usePlanner();

const activeDay = ref(0);
const showExcluded = ref(false);
const expandedPlanet = ref<string | null>(null);
const expandedResult = ref<string | null>(null);

const dayLabels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];

// ── Group planets by phase ─────────────────────────────────────
const planetsByPhase = computed(() => {
  const map = new Map<string, typeof allPlanets.value>();
  for (const p of allPlanets.value) {
    const phase = p.phase;
    if (!map.has(phase)) map.set(phase, []);
    map.get(phase)!.push(p);
  }
  const entries = [...map.entries()].sort(([a], [b]) => {
    const ai = PHASE_ORDER.indexOf(a);
    const bi = PHASE_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
  return entries;
});

// ── Actions ────────────────────────────────────────────────────
const resultsEl = ref<HTMLElement | null>(null);

async function solveCurrentDay() {
  solve(activeDay.value, rosterUnitMap.value);
  await nextTick();
  resultsEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function solveAllDays() {
  solveAll(rosterUnitMap.value);
  await nextTick();
  resultsEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function togglePlanetDetails(planetId: string) {
  expandedPlanet.value = expandedPlanet.value === planetId ? null : planetId;
}

// ── Sorted results ──────────────────────────────────────────────
const sortedAssignments = computed(() => {
  const result = dayStates.value[activeDay.value]?.result;
  if (!result) return [];
  return [...result.assignments].sort((a, b) => {
    const pa = PHASE_ORDER.indexOf(a.phase);
    const pb = PHASE_ORDER.indexOf(b.phase);
    if (pa !== pb) return pa - pb;
    return a.alignment.localeCompare(b.alignment);
  });
});

// ── Phase display override ──────────────────────────────────────
const PHASE_DISPLAY: Record<string, string> = {
  P1: 'Relic 5', P2: 'Relic 6', P3: 'Relic 7',
  P4: 'Relic 8', P5: 'Relic 9', P6: 'Relic 9',
  Zeffo: 'Zeffo', Mandalore: 'Mandalore',
};
const HIDDEN_PHASES = new Set(['Special']);

// Column order: DS(0) | Mixed/Mandalore(1) | LS/Zeffo(2)
function planetColumn(alignment: string): number {
  if (alignment.includes('Dark')) return 0;
  if (alignment === 'Mixed' || alignment === 'Mandalore') return 1;
  return 2; // Light Side, Zeffo
}

function getPlanetInColumn(planets: typeof allPlanets.value, col: number) {
  return planets.find(p => planetColumn(p.alignment) === col) ?? null;
}

// ── Format helpers ──────────────────────────────────────────────
function successLabel(rate: string | undefined): string {
  switch (rate) {
    case 'consistent': return '100%';
    case 'ninety-percent': return '90%';
    case 'usually': return '70%';
    case 'fifty-fifty': return '50%';
    case 'unreliable': return 'Unreliable';
    default: return '—';
  }
}

const alignmentColors: Record<string, string> = {
  'Dark Side': 'text-red-400',
  'Light Side': 'text-blue-300',
  'Mixed': 'text-purple-300',
  'Zeffo': 'text-emerald-300',
  'Mandalore': 'text-amber-300',
  'Special': 'text-pink-300',
};
</script>

<template>
  <div class="flex-1 bg-color">
    <UContainer class="pt-0 sm:pt-4 pb-4 sm:pb-8">
      <div class="mb-6">
        <h1 class="text-xl sm:text-2xl font-bold text-white">Squad Planner</h1>
        <p class="text-sm text-slate-400 mt-1">
          Select planets and missions you plan to do each day. The solver assigns teams to maximise
          success rate, with no team used twice per day.
        </p>
      </div>

      <!-- Roster Status -->
      <div
        v-if="playerDataFetched"
        class="mb-4 rounded-lg bg-cyan-900/30 border border-cyan-700 p-3 text-sm text-cyan-300"
      >
        Roster loaded — unavailable missions are flagged below.
      </div>

      <!-- Excluded Teams -->
      <div class="bg-slate-900/70 border border-slate-700 rounded-xl mb-5">
        <button
          class="w-full flex items-center justify-between px-4 py-3 text-left"
          @click="showExcluded = !showExcluded"
        >
          <span class="text-white font-semibold text-sm">
            Excluded Teams ({{ getDayLeadOptions(activeDay).filter(l => l.excluded).length }})
          </span>
          <UIcon
            :name="showExcluded ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
            class="w-5 h-5 text-slate-400"
          />
        </button>
        <div v-if="showExcluded" class="px-4 pb-4 border-t border-slate-700">
          <p class="text-xs text-slate-400 mt-3 mb-2">
            Toggle teams you don't have, are platooned or don't want the solver to use.
            <template v-if="!playerDataFetched">
              <NuxtLink to="/" class="text-cyan-400 underline">Import your roster</NuxtLink>
              to auto-exclude unowned teams.
            </template>
          </p>
          <div class="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
            <button
              v-for="lead in getDayLeadOptions(activeDay)"
              :key="lead.key"
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
              :class="lead.excluded
                ? 'bg-red-900/50 text-red-300 border border-red-700'
                : 'bg-slate-800 text-slate-300 border border-slate-600 hover:bg-slate-700'"
              @click="toggleExcludedLead(activeDay, lead.key)"
            >
              <img v-if="lead.icon" :src="lead.icon" class="h-4 w-4 rounded" />
              {{ lead.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Solve Buttons (top) -->
      <div class="flex gap-3 mb-5">
        <button
          type="button"
          :disabled="!dayStates[activeDay]?.selectedMissions.length"
          class="px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          @click="solveCurrentDay"
        >
          Solve Day {{ activeDay + 1 }}
        </button>
        <button
          type="button"
          class="px-4 py-2 text-sm font-semibold rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors"
          @click="solveAllDays"
        >
          Solve All Days
        </button>
      </div>

      <!-- Day Tabs -->
      <div class="bg-slate-900/70 border border-slate-700 rounded-xl mb-5">
        <div class="flex border-b border-slate-700 overflow-x-auto">
          <button
            v-for="(label, i) in dayLabels"
            :key="i"
            class="flex-1 px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors min-w-0"
            :class="activeDay === i
              ? 'text-white border-b-2 border-cyan-400 bg-slate-800/50'
              : 'text-slate-400 hover:text-slate-200'"
            @click="activeDay = i"
          >
            {{ label }}
            <span
              v-if="dayStates[i]?.selectedMissions.length"
              class="ml-1 text-xs text-cyan-400"
            >({{ dayStates[i].selectedMissions.length }})</span>
          </button>
        </div>

        <!-- Day Content -->
        <div class="p-4">
          <div v-for="[phase, planets] in planetsByPhase.filter(([p]) => !HIDDEN_PHASES.has(p))" :key="phase" class="mb-5">
            <h3 class="text-sm font-semibold text-slate-300 mb-2 border-b border-slate-700 pb-1">
              {{ PHASE_DISPLAY[phase] ?? phase }}
            </h3>
            <div class="grid grid-cols-3 gap-2">
              <template v-for="col in [0, 1, 2]" :key="col">
                <div v-if="getPlanetInColumn(planets, col)" class="relative">
                  <!-- Planet Card -->
                  <div
                    class="rounded-lg border cursor-pointer transition-all"
                    :class="planetSelectionCount(activeDay, getPlanetInColumn(planets, col)!.id).selected > 0
                      ? 'bg-cyan-900/30 border-cyan-500'
                      : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-500'"
                    @click="togglePlanet(activeDay, getPlanetInColumn(planets, col)!.id)"
                  >
                  <div class="px-3 py-2.5 flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-1.5">
                        <!-- Checkbox -->
                        <div
                          class="w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center"
                          :class="planetSelectionCount(activeDay, getPlanetInColumn(planets, col)!.id).selected === planetSelectionCount(activeDay, getPlanetInColumn(planets, col)!.id).total
                            ? 'bg-cyan-500 border-cyan-500'
                            : planetSelectionCount(activeDay, getPlanetInColumn(planets, col)!.id).selected > 0
                              ? 'bg-cyan-500/50 border-cyan-500'
                              : 'border-slate-500'"
                        >
                          <UIcon
                            v-if="planetSelectionCount(activeDay, getPlanetInColumn(planets, col)!.id).selected > 0"
                            name="i-heroicons-check"
                            class="w-3 h-3 text-white"
                          />
                        </div>
                        <span class="text-sm font-medium text-white truncate">
                          {{ getPlanetInColumn(planets, col)!.planet }}
                        </span>
                        <span
                          class="text-xs flex-shrink-0"
                          :class="alignmentColors[getPlanetInColumn(planets, col)!.alignment] ?? 'text-slate-400'"
                        >{{ getPlanetInColumn(planets, col)!.alignment }}</span>
                      </div>
                    </div>

                    <div class="flex items-center gap-2 flex-shrink-0 ml-2">
                      <!-- Selection counter -->
                      <span class="text-xs" :class="planetSelectionCount(activeDay, getPlanetInColumn(planets, col)!.id).selected > 0 ? 'text-cyan-400' : 'text-slate-500'">
                        {{ planetSelectionCount(activeDay, getPlanetInColumn(planets, col)!.id).selected }}/{{ planetSelectionCount(activeDay, getPlanetInColumn(planets, col)!.id).total }}
                      </span>

                      <!-- Availability warning -->
                      <div
                        v-if="planetSelectionCount(activeDay, getPlanetInColumn(planets, col)!.id).selected > 0 && playerDataFetched"
                      >
                        <div
                          v-if="getPlanetAvailability(activeDay, getPlanetInColumn(planets, col)!.id, rosterUnitMap)?.hasIssues"
                          class="flex items-center gap-1 text-amber-400 text-xs"
                          :title="getPlanetAvailability(activeDay, getPlanetInColumn(planets, col)!.id, rosterUnitMap)!.unavailableMissions.map(m => m.label).join(', ') + ' unavailable'"
                        >
                          <UIcon name="i-heroicons-exclamation-triangle" class="w-3.5 h-3.5" />
                          {{ getPlanetAvailability(activeDay, getPlanetInColumn(planets, col)!.id, rosterUnitMap)!.unavailableMissions.length }}
                        </div>
                      </div>

                      <!-- Expand chevron -->
                      <UIcon
                        name="i-heroicons-chevron-down"
                        class="w-4 h-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        :class="{ 'rotate-180': expandedPlanet === getPlanetInColumn(planets, col)!.id }"
                        @click.stop="togglePlanetDetails(getPlanetInColumn(planets, col)!.id)"
                      />
                    </div>
                  </div>
                </div>

                <!-- Expanded mission checkboxes -->
                <div
                  v-if="expandedPlanet === getPlanetInColumn(planets, col)!.id"
                  class="mt-1 mx-1 bg-slate-800/70 border border-slate-700 rounded-lg p-3"
                >
                  <label
                    v-for="mission in getPlanetInColumn(planets, col)!.missions"
                    :key="mission.id"
                    class="flex items-center gap-2 py-1.5 cursor-pointer text-xs group"
                    :class="isMissionSelected(activeDay, mission.id) ? 'text-slate-200' : 'text-slate-500'"
                    @click.stop="toggleMission(activeDay, mission.id)"
                  >
                    <div
                      class="w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center"
                      :class="isMissionSelected(activeDay, mission.id)
                        ? 'bg-cyan-500 border-cyan-500'
                        : 'border-slate-600 group-hover:border-slate-400'"
                    >
                      <UIcon
                        v-if="isMissionSelected(activeDay, mission.id)"
                        name="i-heroicons-check"
                        class="w-2.5 h-2.5 text-white"
                      />
                    </div>
                    <span>{{ mission.label }}</span>
                    <span class="text-slate-600">({{ mission.teams.length }} teams)</span>
                    <!-- Unavailable indicator -->
                    <UIcon
                      v-if="playerDataFetched && getPlanetAvailability(activeDay, getPlanetInColumn(planets, col)!.id, rosterUnitMap)?.unavailableMissions.some(m => m.id === mission.id)"
                      name="i-heroicons-x-circle"
                      class="w-3.5 h-3.5 text-red-400 ml-auto"
                      title="No valid teams — will be skipped by solver"
                    />
                  </label>
                </div>
              </div>
                <div v-else />
              </template>
            </div>
          </div>

          <!-- Empty state -->
          <div
            v-if="!dayStates[activeDay]?.selectedMissions.length"
            class="text-center py-8 text-slate-500 text-sm"
          >
            Click a planet to select all its missions, then expand to deselect individual ones.
          </div>

          <!-- Solve Buttons -->
          <div class="mt-4 flex gap-3">
            <button
              type="button"
              :disabled="!dayStates[activeDay]?.selectedMissions.length"
              class="px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              @click="solveCurrentDay"
            >
              Solve Day {{ activeDay + 1 }}
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm font-semibold rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors"
              @click="solveAllDays"
            >
              Solve All Days
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 transition-colors ml-auto"
              @click="clearDay(activeDay)"
            >
              Clear Day
            </button>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div
        ref="resultsEl"
        v-if="dayStates[activeDay]?.result"
        class="bg-slate-900/70 border border-slate-700 rounded-xl p-5"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">
            {{ dayLabels[activeDay] }} Results
          </h2>
          <div class="text-sm text-slate-400">
            Score:
            <span class="text-white font-semibold">{{ dayStates[activeDay].result.totalScore }}</span>
            <span class="text-slate-500">
              / {{ dayStates[activeDay].result.maxPossibleScore }}
            </span>
          </div>
        </div>

        <div
          v-if="dayStates[activeDay].result.infeasible"
          class="rounded-lg bg-red-900/30 border border-red-700 p-3 text-sm text-red-300 mb-4"
        >
          Not enough unique teams available. You need at least one distinct team per mission.
          Try excluding fewer teams or reducing the number of missions.
        </div>

        <div
          v-if="dayStates[activeDay].result.unavailableMissions.length > 0"
          class="rounded-lg bg-amber-900/30 border border-amber-700 p-3 text-sm text-amber-300 mb-4"
        >
          <strong>{{ dayStates[activeDay].result.unavailableMissions.length }} mission(s)</strong>
          have no valid teams (all leads excluded or unowned):
          {{ dayStates[activeDay].result.unavailableMissions.map(m => m.label).join(', ') }}
        </div>

        <div v-if="dayStates[activeDay].result.assignments.length > 0" class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-slate-400 border-b border-slate-700">
                <th class="pb-2 font-medium">Mission</th>
                <th class="pb-2 font-medium hidden sm:table-cell">Planet</th>
                <th class="pb-2 font-medium">Assigned Team</th>
                <th class="pb-2 font-medium hidden sm:table-cell">Squad</th>
                <th class="pb-2 font-medium text-center">Success</th>
                <th class="pb-2 font-medium text-right">Score</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              <template
                v-for="a in sortedAssignments"
                :key="a.missionId"
              >
                <tr
                  class="text-white cursor-pointer hover:bg-slate-800/50 transition-colors"
                  @click="expandedResult = expandedResult === a.missionId ? null : a.missionId"
                >
                  <td class="py-2 pr-2">
                    <div class="flex items-center gap-1">
                      <UIcon
                        name="i-heroicons-chevron-right"
                        class="w-3.5 h-3.5 text-slate-500 transition-transform flex-shrink-0"
                        :class="{ 'rotate-90': expandedResult === a.missionId }"
                      />
                      <div>
                        <div>{{ a.missionLabel }}</div>
                        <div class="text-xs text-slate-500 sm:hidden">{{ a.phase }} {{ a.alignment }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-2 pr-2 hidden sm:table-cell text-slate-500 text-xs">
                    {{ a.phase }} {{ a.alignment }}
                  </td>
                  <td class="py-2 pr-2">
                    <div class="flex items-center gap-2">
                      <img v-if="a.icon" :src="a.icon" class="h-6 w-6 rounded" />
                      <span class="text-sm">{{ a.leadFull || a.lead }}</span>
                    </div>
                  </td>
                  <td class="py-2 pr-2 hidden sm:table-cell text-slate-400 text-xs">
                    {{ a.others }}
                  </td>
                  <td class="py-2 text-center">
                    <span
                      class="inline-block px-2 py-0.5 rounded text-xs font-medium"
                      :class="{
                        'bg-green-900/50 text-green-300': a.successRate === 'consistent',
                        'bg-blue-900/50 text-blue-300': a.successRate === 'ninety-percent',
                        'bg-yellow-900/50 text-yellow-300': a.successRate === 'usually',
                        'bg-orange-900/50 text-orange-300': a.successRate === 'fifty-fifty',
                        'bg-red-900/50 text-red-300': a.successRate === 'unreliable',
                        'bg-slate-800 text-slate-400': !a.successRate,
                      }"
                    >{{ successLabel(a.successRate) }}</span>
                  </td>
                  <td class="py-2 text-right font-mono text-slate-300">{{ a.score }}</td>
                </tr>
                <!-- Expanded detail row -->
                <tr v-if="expandedResult === a.missionId" class="bg-slate-800/50">
                  <td :colspan="6" class="px-4 py-3">
                    <div class="text-sm space-y-2">
                      <div v-if="a.notes">
                        <strong class="text-slate-300">Notes:</strong>
                        <p class="text-slate-400 mt-0.5">{{ a.notes }}</p>
                      </div>
                      <div v-if="a.videos && a.videos.length > 0">
                        <strong class="text-slate-300">Videos:</strong>
                        <div class="mt-1 space-y-1">
                          <div v-for="(v, vi) in a.videos" :key="vi">
                            <a
                              :href="v.url"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="text-blue-400 hover:text-blue-300 underline text-xs inline-flex items-center gap-1"
                            >
                              <img src="/icons/icons8-youtube.svg" alt="YouTube" class="h-4 w-4" />
                              <span v-if="v.creator">Video by {{ v.creator }}</span>
                              <span v-else>Watch Video</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div v-if="!a.notes && (!a.videos || a.videos.length === 0)" class="text-slate-600 text-xs">
                        No notes or videos for this team.
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div
          v-if="dayStates[activeDay].result.unassigned.length > 0"
          class="mt-4 text-sm text-amber-400"
        >
          <span class="font-medium">Unassigned missions:</span>
          {{ dayStates[activeDay].result.unassigned.map(m => m.label).join(', ') }}
        </div>
      </div>

      <!-- Clear All -->
      <div class="mt-8 text-center">
        <button
          type="button"
          class="text-xs text-slate-600 hover:text-red-400 transition-colors"
          @click="clearAll"
        >
          Clear All Data
        </button>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.bg-color {
  background-color: #0D0D2B;
}
</style>
