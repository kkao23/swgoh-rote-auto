<script setup lang="ts">
import { PHASE_ORDER } from '~/util/plannerHelpers';
import { SHIP_GAME_IDS, GL_GAME_IDS } from '~/data/displayNames';

// ── Roster integration ──────────────────────────────────────────
const {
  allyCode,
  isFetching,
  fetchError,
  isFetched: playerDataFetched,
  playerName,
  rosterUnits,
  unitRelicMap,
  fetchRoster: fetchPlayerData,
  clearRoster,
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

// Relic tier map for phase-level relic requirements
const relicTierMap = computed<Map<string, number> | null>(() => {
  if (!playerDataFetched.value) return null;
  return unitRelicMap.value;
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
const expandedPlanet = ref<string | null>(null);

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
  solve(activeDay.value, rosterUnitMap.value, relicTierMap.value);
  await nextTick();
  resultsEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function solveAllDays() {
  solveAll(rosterUnitMap.value, relicTierMap.value);
  await nextTick();
  resultsEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function togglePlanetDetails(planetId: string) {
  expandedPlanet.value = expandedPlanet.value === planetId ? null : planetId;
}

// ── Phase display override ──────────────────────────────────────
const PHASE_DISPLAY: Record<string, string> = {
  P1: 'Relic 5', P2: 'Relic 6', P3: 'Relic 7',
  P4: 'Relic 8', P5: 'Relic 9', P6: 'Relic 9',
  Zeffo: 'Zeffo', Mandalore: 'Mandalore',
};
const HIDDEN_PHASES = new Set(['Special']);

// Which phases are available on each day (0-indexed)
const DAY_PHASE_AVAILABILITY: Record<number, Set<string>> = {
  0: new Set(['P1']),
  1: new Set(['P1', 'P2']),
  2: new Set(['P1', 'P2', 'P3', 'Zeffo']),
  3: new Set(['P1', 'P2', 'P3', 'P4', 'Zeffo', 'Mandalore']),
  4: new Set(['P1', 'P2', 'P3', 'P4', 'P5', 'Zeffo', 'Mandalore']),
  5: new Set(['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Zeffo', 'Mandalore']),
};

// Column order: DS(0) | Mixed/Mandalore(1) | LS/Zeffo(2)
function planetColumn(alignment: string): number {
  if (alignment.includes('Dark')) return 0;
  if (alignment === 'Mixed' || alignment === 'Mandalore') return 1;
  return 2; // Light Side, Zeffo
}

function getPlanetInColumn(planets: typeof allPlanets.value, col: number) {
  return planets.find(p => planetColumn(p.alignment) === col) ?? null;
}

// ── Split leads into GLs / characters / ships for the exclusion UI
const dayLeadGroups = computed(() => {
  const all = getDayLeadOptions(activeDay.value, relicTierMap.value);
  return {
    gls: all.filter(l => GL_GAME_IDS.has(l.key)),
    characters: all.filter(l => !GL_GAME_IDS.has(l.key) && !SHIP_GAME_IDS.has(l.key)),
    ships: all.filter(l => SHIP_GAME_IDS.has(l.key)),
  };
});

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
    <UContainer class="pt-0 sm:pt-4 pb-4 sm:pb-8">
      <div class="mb-6">
        <h1 class="text-xl sm:text-2xl font-bold text-white">Squad Planner</h1>
        <p class="text-sm text-slate-400 mt-1">
          Select planets and missions you plan to do each day. The solver assigns teams to maximise
          success rate, with no team used twice per day.
        </p>
      </div>

      <!-- Ally Code Input -->
      <div class="bg-slate-900/70 border border-slate-700 rounded-xl p-3 sm:p-5 mb-5">
        <h2 class="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Import Your Roster</h2>
        <p class="text-xs sm:text-sm text-slate-300 mb-2 sm:mb-4">
          Enter your SWGOH ally code to highlight which teams you can use based on your roster.
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <input
            v-model="allyCode"
            type="text"
            placeholder="e.g. 761-355-883"
            class="flex-1 bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2"
            @keyup.enter="fetchPlayerData"
          />
          <button
            type="button"
            :disabled="isFetching || !allyCode.trim()"
            class="px-4 py-2 text-sm font-semibold rounded-lg bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            @click="fetchPlayerData"
          >
            {{ isFetching ? 'Fetching...' : 'Fetch My Roster' }}
          </button>
        </div>

        <!-- Player Name Badge -->
        <div
          v-if="playerDataFetched && playerName"
          class="mt-3 inline-flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-full px-3 py-1 text-sm"
        >
          <span class="text-slate-300">{{ playerName }}</span>
          <button
            type="button"
            class="text-slate-400 hover:text-red-400 transition-colors leading-none text-lg"
            title="Clear roster"
            @click="clearRoster"
          >
            &times;
          </button>
        </div>

        <div v-if="fetchError" class="mt-4 rounded-lg bg-red-900/30 border border-red-700 p-3 text-sm text-red-300">
          {{ fetchError }}
        </div>

        <div v-if="playerDataFetched" class="mt-4">
          <p class="text-xs text-emerald-300">
            Roster loaded — {{ rosterUnits.length }} units found. Teams you can't field will appear grayed out.
          </p>
        </div>
      </div>

      <!-- Excluded Teams -->
      <ExcludedTeamsPanel
        :gls="dayLeadGroups.gls"
        :characters="dayLeadGroups.characters"
        :ships="dayLeadGroups.ships"
        :player-data-fetched="playerDataFetched"
        @toggle-excluded="toggleExcludedLead(activeDay, $event)"
      />

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
          <div v-for="[phase, planets] in planetsByPhase.filter(([p]) => !HIDDEN_PHASES.has(p) && DAY_PHASE_AVAILABILITY[activeDay]?.has(p))" :key="phase" class="mb-5">
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
      <PlannerResults
        ref="resultsEl"
        v-if="dayStates[activeDay]?.result"
        :result="dayStates[activeDay]!.result"
        :day-label="dayLabels[activeDay]"
      />

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
</template>

<style scoped>
.bg-color {
  background-color: #0D0D2B;
}
</style>
