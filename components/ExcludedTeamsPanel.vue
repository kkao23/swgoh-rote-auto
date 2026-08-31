<script setup lang="ts">
import { matchHotUtilsUnitNames, parseHotUtilsPlatoons } from '~/util/hotUtils';

export interface LeadOption {
  key: string;
  label: string;
  icon?: string;
  excluded: boolean;
  relicStatus: 'owned' | 'below_relic' | 'unowned' | null;
}

const props = defineProps<{
  gls: LeadOption[];
  journey: LeadOption[];
  characters: LeadOption[];
  ships: LeadOption[];
  playerDataFetched: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle-excluded', leadKey: string): void;
}>();

const toast = useToast();

const showExcluded = ref(false);

// ── HotUtils paste modal ──────────────────────────────────────────
const showHotUtilsModal = ref(false);
const hotUtilsText = ref('');

const hotUtilsExample = `Zone Dark Side (Death Star):
• Platoon #1
✅ Ugnaught
✅ Supreme Leader Kylo Ren
🚫 Hyena Bomber
• Platoon #2
✅ Executor
✅ Lord Vader
✅ Krrsantan`;

const allLeadOptions = computed<LeadOption[]>(() => [
  ...props.gls,
  ...props.journey,
  ...props.characters,
  ...props.ships,
]);

const excludedKeySet = computed(() =>
  new Set(allLeadOptions.value.filter(l => l.excluded).map(l => l.key)),
);

function confirmHotUtilsPaste() {
  const names = parseHotUtilsPlatoons(hotUtilsText.value);
  if (names.length === 0) {
    toast.add({ title: 'No units found in the pasted text.', color: 'amber' });
    return;
  }

  const { matched, unmatched } = matchHotUtilsUnitNames(names, allLeadOptions.value);

  let excluded = 0;
  for (const match of matched) {
    if (excludedKeySet.value.has(match.key)) continue;
    emit('toggle-excluded', match.key);
    excluded++;
  }

  if (excluded === 0 && unmatched.length > 0) {
    toast.add({
      title: `No units matched. ${unmatched.length} not in the Excluded Teams list: ${unmatched.slice(0, 5).join(', ')}${unmatched.length > 5 ? '…' : ''}`,
      color: 'red',
    });
    return;
  }

  if (excluded === 0) {
    toast.add({ title: 'All matched units are already excluded.', color: 'amber' });
    showHotUtilsModal.value = false;
    hotUtilsText.value = '';
    return;
  }

  if (unmatched.length > 0) {
    toast.add({
      title: `Excluded ${excluded} unit(s). Not in the Excluded Teams list: ${unmatched.slice(0, 5).join(', ')}${unmatched.length > 5 ? '…' : ''}`,
      color: 'amber',
    });
  } else {
    toast.add({ title: `Excluded ${excluded} unit(s) from pasted platoons.` });
  }

  showHotUtilsModal.value = false;
  hotUtilsText.value = '';
}

function excludedCount(list: LeadOption[]): number {
  return list.filter(l => l.excluded).length;
}

const totalExcluded = computed(() =>
  excludedCount(props.gls) + excludedCount(props.journey) + excludedCount(props.characters) + excludedCount(props.ships),
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
    <div class="flex items-center">
      <button
        class="flex-1 flex items-center justify-between px-4 py-3 text-left"
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
      <button
        type="button"
        class="mr-4 px-3 py-1.5 text-xs font-medium rounded bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
        @click="showHotUtilsModal = true"
      >
        Paste from HotUtils
      </button>
    </div>
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
        <!-- Journey Guide -->
        <template v-if="journey.length">
          <div class="w-full text-[10px] text-purple-400 uppercase tracking-wider mt-3 mb-0.5">Journey Guide</div>
          <button
            v-for="lead in journey"
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

    <!-- HotUtils paste modal -->
    <UModal v-model="showHotUtilsModal" :ui="{ width: 'sm:max-w-2xl' }">
      <UCard :ui="{ background: 'bg-slate-900', ring: 'ring-1 ring-slate-700' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Paste from HotUtils
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              @click="showHotUtilsModal = false"
            />
          </div>
        </template>

        <p class="text-sm text-slate-400 mb-3">
          Paste your HotUtils platoon assignment text below. Every unit found
          (regardless of ✅/🚫 status or platoon) will be excluded for this day.
        </p>
        <UTextarea
          v-model="hotUtilsText"
          :rows="12"
          :placeholder="hotUtilsExample"
        />

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="gray" variant="ghost" @click="showHotUtilsModal = false">
              Cancel
            </UButton>
            <UButton color="cyan" @click="confirmHotUtilsPaste">
              Exclude Units
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
