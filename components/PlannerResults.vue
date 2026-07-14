<script setup lang="ts">
import { PHASE_ORDER, type SolveResult } from '~/util/plannerHelpers';

const props = defineProps<{
  result: SolveResult;
  dayLabel: string;
}>();

const expandedResult = ref<string | null>(null);

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

    <div v-if="result.assignments.length > 0" class="overflow-x-auto">
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
      v-if="result.unassigned.length > 0"
      class="mt-4 text-sm text-amber-400"
    >
      <span class="font-medium">Unassigned missions:</span>
      {{ result.unassigned.map(m => `${m.label} (${m.planet})`).join(', ') }}
    </div>
  </div>
</template>
