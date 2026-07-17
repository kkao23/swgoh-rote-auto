<script setup lang="ts">
import { PHASE_ORDER, type SolveResult, isTeamEligible, getFlatMissions, teamScore } from '~/util/plannerHelpers';
import type { data as TeamData } from '~/models/data';

const props = defineProps<{
  result: SolveResult;
  dayLabel: string;
  excludedLeads: Set<string>;
  rosterUnitMap: Set<string> | null;
}>();

const expandedResult = ref<string | null>(null);

// ── Mission teams lookup (all teams for every mission) ──────────
const missionTeamsMap = computed(() => {
  const map = new Map<string, TeamData[]>();
  for (const m of getFlatMissions()) {
    map.set(m.id, m.teams as TeamData[]);
  }
  return map;
});

// ── Manual team overrides: missionId → team index ──────────────
const manualTeamIdx = ref<Record<string, number>>({});

// ── Sorted solver assignments ────────────────────────────────────
const sortedAssignments = computed(() => {
  const r = props.result;
  if (!r) return [];
  return [...r.assignments].sort((a, b) => {
    const pa = PHASE_ORDER.indexOf(a.phase);
    const pb = PHASE_ORDER.indexOf(b.phase);
    if (pa !== pb) return pa - pb;
    return a.alignment.localeCompare(b.alignment);
  });
});

// ── Get eligible teams for a mission ────────────────────────────
function eligibleTeams(missionId: string): TeamData[] {
  const teams = missionTeamsMap.value.get(missionId);
  if (!teams) return [];
  return teams.filter(t => isTeamEligible(t, props.excludedLeads, props.rosterUnitMap));
}

// ── Find a team in the list (prefer gameId, fall back to lead) ──
function findTeamIndex(teams: TeamData[], gameId: string | undefined, lead: string, others: string): number {
  if (gameId) {
    const gid = gameId.toLowerCase();
    const idx = teams.findIndex(t => t.gameId?.toLowerCase() === gid);
    if (idx >= 0) return idx;
  }
  return teams.findIndex(t =>
    (t.lead === lead || t.leadFull === lead) && t.others === others,
  );
}

// ── Unified table rows ──────────────────────────────────────────
interface UnifiedRow {
  missionId: string;
  missionLabel: string;
  phase: string;
  alignment: string;
  kind: 'assigned' | 'unavailable' | 'unassigned';
  // Original solver assignment (null for unavailable/unassigned)
  solverLead: string | null;
  solverOthers: string | null;
  solverSuccessRate: string | undefined;
  solverScore: number;
  solverIcon: string | undefined;
  solverNotes: string;
  solverVideos: { url: string; creator?: string }[];
}

const unifiedRows = computed<UnifiedRow[]>(() => {
  const r = props.result;
  if (!r) return [];

  const rows: UnifiedRow[] = [];

  for (const a of sortedAssignments.value) {
    rows.push({
      missionId: a.missionId,
      missionLabel: a.missionLabel,
      phase: a.phase,
      alignment: a.alignment,
      kind: 'assigned',
      solverLead: a.leadFull || a.lead,
      solverOthers: a.others,
      solverSuccessRate: a.successRate,
      solverScore: a.score,
      solverIcon: a.icon,
      solverNotes: a.notes,
      solverVideos: a.videos,
    });
  }

  for (const m of r.unassigned) {
    rows.push({
      missionId: m.id,
      missionLabel: m.label,
      phase: m.phase,
      alignment: m.alignment,
      kind: 'unassigned',
      solverLead: null,
      solverOthers: null,
      solverSuccessRate: undefined,
      solverScore: 0,
      solverIcon: undefined,
      solverNotes: '',
      solverVideos: [],
    });
  }

  for (const m of r.unavailableMissions) {
    rows.push({
      missionId: m.id,
      missionLabel: m.label,
      phase: m.phase,
      alignment: m.alignment,
      kind: 'unavailable',
      solverLead: null,
      solverOthers: null,
      solverSuccessRate: undefined,
      solverScore: 0,
      solverIcon: undefined,
      solverNotes: '',
      solverVideos: [],
    });
  }

  const KIND_ORDER: Record<string, number> = { assigned: 0, unassigned: 1, unavailable: 2 };

  rows.sort((a, b) => {
    const ka = KIND_ORDER[a.kind];
    const kb = KIND_ORDER[b.kind];
    if (ka !== kb) return ka - kb;
    const pa = PHASE_ORDER.indexOf(a.phase);
    const pb = PHASE_ORDER.indexOf(b.phase);
    if (pa !== pb) return pa - pb;
    return a.alignment.localeCompare(b.alignment);
  });

  return rows;
});

// ── Seed manual indexes from solver assignments ──────────────────
watch(() => props.result, (r) => {
  if (!r) return;
  const next: Record<string, number> = {};
  for (const a of r.assignments) {
    const teams = missionTeamsMap.value.get(a.missionId);
    if (!teams) continue;
    const idx = findTeamIndex(teams, a.gameId, a.lead, a.others);
    if (idx >= 0) next[a.missionId] = idx;
  }
  manualTeamIdx.value = next;
}, { immediate: true });

// ── Effective team for a row (manual override or solver seed) ────
function getEffectiveTeam(row: UnifiedRow): TeamData | null {
  const teams = missionTeamsMap.value.get(row.missionId);
  if (!teams) return null;

  const overrideIdx = manualTeamIdx.value[row.missionId];
  if (overrideIdx !== undefined && overrideIdx >= 0 && overrideIdx < teams.length) {
    return teams[overrideIdx];
  }

  return null;
}

function onTeamChange(row: UnifiedRow, event: Event) {
  const idx = parseInt((event.target as HTMLSelectElement).value, 10);
  manualTeamIdx.value = { ...manualTeamIdx.value, [row.missionId]: idx };
}

// ── Display helpers ──────────────────────────────────────────────
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

function teamOptionLabel(t: TeamData): string {
  const name = t.leadFull || t.lead;
  const pct = successLabel(t.successRate);
  return `${name} (${pct})`;
}
</script>

<template>
  <div class="bg-slate-900/70 border border-slate-700 rounded-xl p-5">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-white">
        {{ dayLabel }} Results
      </h2>
      <div class="text-sm text-slate-400">
        Score:
        <span class="text-white font-semibold">{{ result.totalScore }}</span>
        <span class="text-slate-500">
          / {{ result.maxPossibleScore }}
        </span>
      </div>
    </div>

    <div
      v-if="result.infeasible"
      class="rounded-lg bg-red-900/30 border border-red-700 p-3 text-sm text-red-300 mb-4"
    >
      Not enough unique teams available. You need at least one distinct team per mission.
      Try excluding fewer teams or reducing the number of missions.
    </div>

    <div
      v-if="result.unavailableMissions.length > 0"
      class="rounded-lg bg-amber-900/30 border border-amber-700 p-3 text-sm text-amber-300 mb-4"
    >
      <strong>{{ result.unavailableMissions.length }} mission(s)</strong>
      have no valid teams (all leads excluded or unowned):
      {{ result.unavailableMissions.map(m => m.label).join(', ') }}
    </div>

    <div v-if="unifiedRows.length > 0" class="overflow-x-auto">
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
            v-for="row in unifiedRows"
            :key="row.missionId + row.kind"
          >
            <tr
              :class="[
                'transition-colors',
                row.kind === 'assigned'
                  ? 'text-white cursor-pointer hover:bg-slate-800/50'
                  : 'text-slate-500',
              ]"
              @click="row.kind === 'assigned' && (expandedResult = expandedResult === row.missionId ? null : row.missionId)"
            >
              <td class="py-2 pr-2">
                <div class="flex items-center gap-1">
                  <UIcon
                    v-if="row.kind === 'assigned'"
                    name="i-heroicons-chevron-right"
                    class="w-3.5 h-3.5 text-slate-500 transition-transform flex-shrink-0"
                    :class="{ 'rotate-90': expandedResult === row.missionId }"
                  />
                  <div :class="{ 'ml-5': row.kind !== 'assigned' }">
                    <div>{{ row.missionLabel }}</div>
                    <div class="text-xs text-slate-500 sm:hidden">{{ row.phase }} {{ row.alignment }}</div>
                  </div>
                </div>
              </td>
              <td class="py-2 pr-2 hidden sm:table-cell text-slate-500 text-xs">
                {{ row.phase }} {{ row.alignment }}
              </td>
              <td class="py-2 pr-2">
                <!-- Dropdown for assigned & unassigned missions -->
                <select
                  v-if="row.kind !== 'unavailable' && eligibleTeams(row.missionId).length > 0"
                  class="bg-slate-800 border border-slate-600 rounded text-sm text-white px-2 py-1 w-full max-w-[220px] focus:outline-none focus:border-cyan-500"
                  :value="getEffectiveTeam(row) ? findTeamIndex(missionTeamsMap.get(row.missionId) ?? [], getEffectiveTeam(row)!.gameId, getEffectiveTeam(row)!.lead, getEffectiveTeam(row)!.others) : ''"
                  @change="onTeamChange(row, $event)"
                  @click.stop
                >
                  <option value="" disabled v-if="!getEffectiveTeam(row)">— Select a team —</option>
                  <option
                    v-for="(t, ti) in eligibleTeams(row.missionId)"
                    :key="ti"
                    :value="ti"
                  >
                    {{ teamOptionLabel(t) }}
                  </option>
                </select>
                <!-- N/A text for unavailable missions -->
                <span v-else class="text-sm italic text-slate-500">N/A (No Eligible Leads)</span>
              </td>
              <td class="py-2 pr-2 hidden sm:table-cell text-slate-400 text-xs">
                {{ getEffectiveTeam(row)?.others ?? '' }}
              </td>
              <td class="py-2 text-center">
                <span
                  v-if="getEffectiveTeam(row)"
                  class="inline-block px-2 py-0.5 rounded text-xs font-medium"
                  :class="{
                    'bg-green-900/50 text-green-300': getEffectiveTeam(row)!.successRate === 'consistent',
                    'bg-blue-900/50 text-blue-300': getEffectiveTeam(row)!.successRate === 'ninety-percent',
                    'bg-yellow-900/50 text-yellow-300': getEffectiveTeam(row)!.successRate === 'usually',
                    'bg-orange-900/50 text-orange-300': getEffectiveTeam(row)!.successRate === 'fifty-fifty',
                    'bg-red-900/50 text-red-300': getEffectiveTeam(row)!.successRate === 'unreliable',
                    'bg-slate-800 text-slate-400': !getEffectiveTeam(row)!.successRate,
                  }"
                >{{ successLabel(getEffectiveTeam(row)!.successRate) }}</span>
                <span v-else class="text-slate-600 text-xs">—</span>
              </td>
              <td class="py-2 text-right font-mono" :class="getEffectiveTeam(row) ? 'text-slate-300' : 'text-slate-600'">
                {{ getEffectiveTeam(row) ? teamScore(getEffectiveTeam(row)!) : '—' }}
              </td>
            </tr>
            <tr v-if="row.kind === 'assigned' && expandedResult === row.missionId" class="bg-slate-800/50">
              <td :colspan="6" class="px-4 py-3">
                <div class="text-sm space-y-2">
                  <div v-if="getEffectiveTeam(row)?.notes">
                    <strong class="text-slate-300">Notes:</strong>
                    <p class="text-slate-400 mt-0.5">{{ getEffectiveTeam(row)!.notes }}</p>
                  </div>
                  <div v-if="getEffectiveTeam(row)?.videos && getEffectiveTeam(row)!.videos.length > 0">
                    <strong class="text-slate-300">Videos:</strong>
                    <div class="mt-1 space-y-1">
                      <div v-for="(v, vi) in getEffectiveTeam(row)!.videos" :key="vi">
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
                  <div v-if="!getEffectiveTeam(row)?.notes && (!getEffectiveTeam(row)?.videos || getEffectiveTeam(row)!.videos.length === 0)" class="text-slate-600 text-xs">
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
      v-if="result.unassigned.length > 0"
      class="mt-4 text-sm text-amber-400"
    >
      <span class="font-medium">Unassigned missions:</span>
      {{ result.unassigned.map(m => `${m.label} (${m.planet})`).join(', ') }}
    </div>
  </div>
</template>
