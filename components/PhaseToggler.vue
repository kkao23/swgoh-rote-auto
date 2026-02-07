<script setup lang="ts">
import { useModalStore } from '~/stores/modal';
import { trackEvent } from '~/util/analytics';

const props = defineProps({
    phase: String,
});

const modalStore = useModalStore();

const emit = defineEmits();
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
  trackEvent('open_phase', { phase: props.phase })
  emit('toggleExpanded', isExpanded.value);
};

const isExpanded = ref(false);
</script>
<template>
    <div class="flex items-center space-x-2">
        <span>{{ props.phase }}</span>
        <button @click="toggleExpanded" class="p-1 bg-blue-100 rounded" v-if="!modalStore.isModalOpen">
            <UIcon name="i-heroicons-chevron-down" v-if="!isExpanded" class="w-4 h-4" />
            <UIcon name="i-heroicons-chevron-up" v-else class="w-4 h-4" />
        </button>
    </div>
</template>