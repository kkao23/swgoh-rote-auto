<script setup lang="ts">
export interface LeadOption {
  key: string;
  label: string;
  icon?: string;
  excluded: boolean;
  relicStatus: 'owned' | 'below_relic' | 'unowned' | null;
}

const props = defineProps<{
  gls: LeadOption[];
  characters: LeadOption[];
  ships: LeadOption[];
  playerDataFetched: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-excluded', leadKey: string): void;
}>();

const showExcluded = ref(false);

function excludedCount(list: LeadOption[]): number {
  return list.filter(l => l.excluded).length;
}

const totalExcluded = computed(() =>
  excludedCount(props.gls) + excludedCount(props.characters) + excludedCount(props.ships),
);

function btnClass(lead: LeadOption): string {
  if (lead.excluded) return 'bg-red-900/50 text-red-300 border border-red-700';
  if (lead.relicStatus === 'unowned') return 'bg-slate-800 text-red-400/70 border border-red-800/50 hover:bg-slate-700';
  if (lead.relicStatus === 'below_relic') return 'bg-slate-800 text-amber-400/80 border border-amber-800/50 hover:bg-slate-700';
  return 'bg-slate-800 text-slate-300 border border-slate-600 hover:bg-slate-700';
}
</script>

<template>
  <div class="bg-slate-900/70 border border-slate-700 rounded-xl mb-5">
    <button
      class="w-full flex items-center justify-between px-4 py-3 text-left"
      @click="showExcluded = !showExcluded"
    >
      <span class="text-white font-semibold text-sm">
        Excluded Teams ({{ totalExcluded }})
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
        <!-- Galactic Legends -->
        <template v-if="gls.length">
          <div class="w-full text-[10px] text-yellow-400 uppercase tracking-wider mt-1 mb-0.5">Galactic Legends</div>
          <button
            v-for="lead in gls"
            :key="lead.key"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
            :class="btnClass(lead)"
            @click="emit('toggle-excluded', lead.key)"
          >
            <img v-if="lead.icon" :src="lead.icon" class="h-4 w-4 rounded" />
            {{ lead.label }}
          </button>
        </template>
        <!-- Characters -->
        <template v-if="characters.length">
          <div class="w-full text-[10px] text-slate-500 uppercase tracking-wider mt-3 mb-0.5">Characters</div>
          <button
            v-for="lead in characters"
            :key="lead.key"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
            :class="btnClass(lead)"
            @click="emit('toggle-excluded', lead.key)"
          >
            <img v-if="lead.icon" :src="lead.icon" class="h-4 w-4 rounded" />
            {{ lead.label }}
          </button>
        </template>
        <!-- Ships -->
        <template v-if="ships.length">
          <div class="w-full text-[10px] text-slate-500 uppercase tracking-wider mt-3 mb-0.5">Ships</div>
          <button
            v-for="lead in ships"
            :key="lead.key"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
            :class="btnClass(lead)"
            @click="emit('toggle-excluded', lead.key)"
          >
            <img v-if="lead.icon" :src="lead.icon" class="h-4 w-4 rounded" />
            {{ lead.label }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
