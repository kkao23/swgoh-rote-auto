<script setup lang="ts">
const props = defineProps<{
  phase: string;
  alignment: string;
  position: string;
  lead: string;
}>();

const { voteCounts, hasVoted, upvote, downvote, getTeamKey, votedTeams } =
  useVoteTracker();

const teamKey = computed(() =>
  getTeamKey(props.phase, props.alignment, props.position, props.lead)
);
</script>

<template>
  <span class="text-xs text-gray-400 min-w-[22px] text-center tabular-nums mr-1">
    {{ voteCounts[teamKey] ?? 0 }}
  </span>
  <button
    class="rounded-full p-0.5"
    :class="
      hasVoted(phase, alignment, position, lead) &&
      votedTeams[teamKey] === 'up'
        ? 'text-red-400'
        : 'text-gray-500'
    "
    @click.stop="upvote(phase, alignment, position, lead)"
  >
    <UIcon name="i-heroicons-hand-thumb-up-solid" class="w-4 h-4" />
  </button>
  <button
    class="rounded-full p-0.5"
    :class="
      hasVoted(phase, alignment, position, lead) &&
      votedTeams[teamKey] === 'down'
        ? 'text-blue-400'
        : 'text-gray-500'
    "
    @click.stop="downvote(phase, alignment, position, lead)"
  >
    <UIcon name="i-heroicons-hand-thumb-down-solid" class="w-4 h-4" />
  </button>
</template>
