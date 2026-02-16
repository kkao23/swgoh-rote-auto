<script setup lang="ts">
// --- Vue component logic ---
import { data } from '~/data/data';
import { searchLeads } from '~/util/searchLeads';
import { type data as dataType } from "~/models/data";
import { difficulty } from '~/models/data';

const { gtag } = useGtag()

useSeoMeta({
  title: 'SWGOH Team Search - Find RoTE Auto Teams',
})

onMounted(() => {
  gtag('event', 'usage_page_view', {
    path: '/usage',
    transport_type: 'beacon',
  })
})

const searchQuery = ref('');
const searchResults = ref<dataType[]>([]);
const collapsedState = ref<Record<string, boolean>>({});

// Group the search results by path using a computed property
const groupedResults = computed(() => {
  const groups: Record<string, dataType[]> = {};
  searchResults.value.forEach(result => {
    if (result.path !== undefined && !groups[result.path]) {
      groups[result.path] = [];
      collapsedState.value[result.path] = true; // Initialize all groups as collapsed
    }
    groups[result.path!].push(result);
  });
  return groups;
});

// Toggle the collapsed state of a group
const toggleCollapse = (path: string) => {
  collapsedState.value[path] = !collapsedState.value[path];
};

const formatPath = (path: string): string => {
  return path.split(' > ').map(part => {
    if (part.startsWith('phase')) {
      return `Phase ${part.replace('phase', '')}`;
    }
    if (part === 'ds') return 'Dark Side';
    if (part === 'ls') return 'Light Side';
    if (part === 'mixed') return 'Mixed';
    
    // Capitalize other parts
    return part.charAt(0).toUpperCase() + part.slice(1);
  })
  .join(' > ');
};

const formatDifficulty = (diff: difficulty): string => {
  const text = difficulty[diff];
  if (!text) return '';
  return text.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

const handleSearch = () => {
    searchResults.value = searchLeads(data, searchQuery.value);
};

// Watch the search query for changes and update results
watch(searchQuery, () => {
  handleSearch();
});
</script>
<template>
<div class="flex-1 bg-gray-900 text-gray-100 p-8 min-h-screen">
    <div class="max-w-2xl mx-auto">
      <section class="mb-6 text-center">
        <h1 class="text-white text-xl font-semibold mb-2">SWGOH Team Search</h1>
        <p class="text-gray-300 text-sm">
          Search RoTE auto teams by lead name to quickly find recommended squads, difficulty, and linked videos.
          This SWGOH team finder is designed for fast in-game lookup during Territory Battles.
        </p>
      </section>

      <div class="mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for a lead..."
          class="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div v-if="searchQuery && Object.keys(groupedResults).length > 0">
        <h2 class="text-xl font-semibold mb-4">Search Results ({{ searchResults.length }})</h2>
        <div v-for="(group, path) in groupedResults" :key="path" class="mb-6">
          <button @click="toggleCollapse(path)" class="flex justify-between items-center w-full p-4 rounded-lg bg-gray-700 text-left text-white shadow-lg focus:outline-none"
>            <h3 class="text-lg font-bold">{{ formatPath(path) }} ({{ group.length }})</h3>
            <span class="transition-transform duration-200 transform" :class="{'rotate-90': !collapsedState[path]}">
              ▶
            </span>
          </button>
          <div v-if="!collapsedState[path]" class="mt-2">
            <div v-for="(result, index) in group" :key="result.lead + index" class="bg-gray-800 p-4 rounded-lg mb-2 shadow-inner">
              <h4 class="text-lg font-bold text-blue-400">Lead: {{ result.lead }}</h4>
              <p class="text-gray-300">Others: {{ result.others }}</p>
              <p class="text-gray-400 text-sm italic">{{ result.notes }}</p>
              <p class="text-sm mt-2">Difficulty: <span :class="{
                'text-cyan-400': result.difficulty === difficulty.VERY_EASY,
                'text-green-400': result.difficulty === difficulty.EASY,
                'text-yellow-400': result.difficulty === difficulty.CAUTION,
                'text-red-400': result.difficulty === difficulty.HARD,
                'text-red-600': result.difficulty === difficulty.NO_AUTO
              }">{{ formatDifficulty(result.difficulty) }}</span></p>
                        <div v-for="(video, index) in result.videos" class="flex items-center space-x-2">
                            <a 
                            class="text-blue-200 underline flex items-center space-x-2"
                            :href="video.url" target="_blank">
                            <img src="/icons/icons8-youtube.svg" alt="YouTube" class="h-6 w-6" />
                            <span>Video</span>
                            </a>
                        </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="searchQuery && Object.keys(groupedResults).length === 0">
        <p class="text-gray-400 text-center">No results found for "{{ searchQuery }}".</p>
      </div>
      <div v-else>
        <p class="text-gray-400 text-center">Start typing to search for a lead.</p>
      </div>
    </div>
  </div>
</template>