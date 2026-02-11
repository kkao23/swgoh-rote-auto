<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { type data as dataType } from './../models/data';
import { difficulty, successRate, interactionType } from './../models/data';
import { creatorMap } from '~/models/creators';
import { useRouter, useRoute } from 'vue-router';
import { nextTick, watch, computed } from 'vue';
import { trackEvent } from '~/util/analytics';

const props = defineProps({
    special: Boolean,
    shard: Boolean,
    unlock: Boolean,
    phase: String,
    alignment: String,
    position: String,
    helpUrl: String,
    urlTriggered: {
        type: Boolean,
        default: true
    },
    data: {
        type: Array<dataType>,
        required: true
    },
});

const modalStore = useModalStore();
const globalToggleModal = () => modalStore.toggleModal();
const localIsModalOpen = ref(false);
const isHelpModalOpen = ref(false);

const router = useRouter();
const route = useRoute();

const openAccordionIndices = ref<number[]>([]); 
const initialDataIndexFromUrl = ref<number | null>(null);

watchEffect(() => {
    if (!props.urlTriggered) return;
    if (route.query.phase === props.phase &&
        route.query.alignment === props.alignment &&
        route.query.position === props.position) {
        const dataIndex = parseInt(route.query.dataIndex as string);
        if (!isNaN(dataIndex) && dataIndex >= 0 && props.data && dataIndex < props.data.length) {
            localIsModalOpen.value = true;
            initialDataIndexFromUrl.value = dataIndex;
        } else {
            initialDataIndexFromUrl.value = null; 
        }
    } else {
        initialDataIndexFromUrl.value = null; 
    }
});

watch(localIsModalOpen, (isOpen) => {
    if (isOpen && initialDataIndexFromUrl.value !== null) {
        nextTick(() => {
            openAccordionIndices.value = [initialDataIndexFromUrl.value as number];
        });
    } else if (isOpen && initialDataIndexFromUrl.value === null) {
        nextTick(() => {
            openAccordionIndices.value = [0];
        });
    }
    else if (!isOpen) {
        openAccordionIndices.value = [];
        initialDataIndexFromUrl.value = null;
    }
});

const difficultyColor = (item: dataType) => {
    switch (item.difficulty) {
        case difficulty.VERY_EASY: return 'text-green-500';
        case difficulty.EASY: return 'text-blue-400';
        case difficulty.CAUTION: return 'text-yellow-600';
        case difficulty.HARD: return 'text-orange-600';
        case difficulty.NO_AUTO: return 'text-red-900';
        default: return 'hidden';
    }
}

const difficultyIcon = (item: dataType) => {
    switch (item.difficulty) {
        case difficulty.VERY_EASY: return 'i-heroicons-check-circle-solid';
        case difficulty.EASY: return 'i-heroicons-hand-thumb-up-solid';
        case difficulty.CAUTION: return 'i-heroicons-exclamation-triangle-solid';
        case difficulty.HARD: return 'i-heroicons-shield-exclamation-solid';
        case difficulty.NO_AUTO: return 'i-heroicons-x-circle-solid';
        default: return 'hidden';
    }
}

// Expose method to open modal from parent
function openModal() {
    localIsModalOpen.value = true;
}

defineExpose({ openModal });

// Success Rate Badge Config
const successRateBadge = (rate?: string) => {
    switch (rate) {
        case successRate.CONSISTENT:
            return { icon: 'i-heroicons-check-circle-solid', color: 'text-green-500', tooltip: 'Consistent 2/2 waves (100%)' };
        case successRate.NINETY_PERCENT:
            return { icon: 'i-heroicons-hand-thumb-up-solid', color: 'text-blue-400', tooltip: 'Very reliable (~90%)' };
        case successRate.USUALLY:
            return { icon: 'i-heroicons-exclamation-triangle-solid', color: 'text-yellow-500', tooltip: 'Usually works (60-80%)' };
        case successRate.FIFTY_FIFTY:
            return { icon: 'i-heroicons-minus-circle-solid', color: 'text-orange-500', tooltip: '50/50 - Consistent 1/2, sometimes 2/2' };
        case successRate.UNRELIABLE:
            return { icon: 'i-heroicons-x-circle-solid', color: 'text-red-500', tooltip: 'Unreliable or cannot auto' };
        default:
            return null;
    }
}

// Interaction Type Badge Config (single type)
const interactionBadge = (type: string) => {
    switch (type) {
        case interactionType.TARGET_START:
            return { icon: 'i-heroicons-cursor-arrow-rays', color: 'text-blue-400', tooltip: 'Target at battle start' };
        case interactionType.PAUSE_WAVE2:
            return { icon: 'i-heroicons-pause-circle', color: 'text-purple-400', tooltip: 'Pause at wave 2' };
        case interactionType.MANUAL:
            return { icon: 'i-heroicons-hand-raised', color: 'text-red-400', tooltip: 'Manual play required' };
        case interactionType.AUTO:
        default:
            return null; // Pure auto, no badge needed
    }
}

// Get all interaction badges for an array of types
const interactionBadges = (types?: string[]) => {
    if (!types || types.length === 0) return [];
    return types.map(type => interactionBadge(type)).filter(badge => badge !== null);
}

// Get numeric value for success rate (for sorting)
const successRateValue = (rate?: string): number => {
    switch (rate) {
        case successRate.CONSISTENT: return 0;
        case successRate.NINETY_PERCENT: return 1;
        case successRate.USUALLY: return 2;
        case successRate.FIFTY_FIFTY: return 3;
        case successRate.UNRELIABLE: return 4;
        default: return 5; // Fallback for missions without successRate
    }
}

// Get interaction complexity score (for sorting)
const interactionComplexity = (types?: string[]): number => {
    if (!types || types.length === 0) return 0;
    
    // Count non-auto interactions
    const nonAutoCount = types.filter(t => t !== interactionType.AUTO).length;
    
    // Weight by type: manual is most complex, then pause, then target
    let complexity = 0;
    types.forEach(type => {
        switch (type) {
            case interactionType.MANUAL: complexity += 10; break;
            case interactionType.PAUSE_WAVE2: complexity += 5; break;
            case interactionType.TARGET_START: complexity += 3; break;
            case interactionType.AUTO: complexity += 0; break;
        }
    });
    
    return complexity;
}

const isMobile = useMediaQuery('(max-width: 768px)');

const verifiedTeams = computed(() => {
    return props.data.filter(d => !d.videos?.some(video => video.creator) && !d.creator);
});

const communityTeams = computed(() => {
    return props.data.filter(d => d.videos?.some(video => video.creator) || d.creator);
});

const verifiedAccordionItems = computed(() => {
    const sortedData = [...verifiedTeams.value].sort((a, b) => {
        // Sort by success rate (better success first)
        const aSuccessValue = successRateValue(a.successRate);
        const bSuccessValue = successRateValue(b.successRate);
        if (aSuccessValue !== bSuccessValue) {
            return aSuccessValue - bSuccessValue;
        }
        
        // Sort by interaction complexity (simpler first)
        const aComplexity = interactionComplexity(a.interactionType);
        const bComplexity = interactionComplexity(b.interactionType);
        if (aComplexity !== bComplexity) {
            return aComplexity - bComplexity;
        }
        
        // Fallback to old difficulty
        return a.difficulty - b.difficulty;
    });

    return sortedData.map((d, index) => ({
        label: !isMobile.value && d.leadFull ? d.leadFull : d.lead,
        content: {
            others: d.others,
            notes: d.notes,
            videos: d.videos,
            difficulty: d.difficulty,
            omi: d.omi,
            targeted: d.targeted,
            successRate: d.successRate,
            interactionType: d.interactionType,
            icon: d.icon,
        },
        defaultOpen: initialDataIndexFromUrl.value !== null ? initialDataIndexFromUrl.value === index : index === 0,
    }));
});

const communityAccordionItems = computed(() => {
    return communityTeams.value.map((d) => ({
        label: !isMobile.value && d.leadFull ? d.leadFull : d.lead,
        content: {
            others: d.others,
            notes: d.notes,
            videos: d.videos,
            difficulty: d.difficulty,
            omi: d.omi,
            targeted: d.targeted,
            successRate: d.successRate,
            interactionType: d.interactionType,
            icon: d.icon,
            creator: d.creator,
        },
        defaultOpen: false,
    }));
});

const toast = useToast();

async function showToast(itemIndex: number) {
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set('phase', props.phase || '');
    shareUrl.searchParams.set('alignment', props.alignment || '');
    shareUrl.searchParams.set('position', props.position || '');
    shareUrl.searchParams.set('dataIndex', itemIndex.toString()); 

    try {
        await navigator.clipboard.writeText(shareUrl.toString());
        toast.add({title: 'Copied to clipboard!'});
    } catch (err) {
        console.error('Failed to copy: ', err);
        toast.add({title: 'Failed to copy URL.', color: 'red'});
    }
}
</script>

<template>
    <div class="text-center">
        <div class="flex items-center space-x-1">
            <img v-if="special" src="/icons/GET.png" alt="Guild Event Token Icon" class="w-6 h-6">
            <img v-if="shard" src="/icons/sst.png" alt="Shard Icon" class="w-6 h-6">
            <span class="flex-1 text-left hover:underline cursor-pointer" @click="trackEvent('mission_click', { target: `${phase} ${alignment} ${position}` }); localIsModalOpen = !localIsModalOpen">{{ position }}</span>
            <UIcon v-if="helpUrl" name="i-heroicons-question-mark-circle" @click="isHelpModalOpen = true" class="pl-2 w-6 h-6 text-blue-300 cursor-pointer"></UIcon>
            <UIcon v-if="unlock" name="i-heroicons-lock-open" class="pl-2 w-6 h-6" /><button
                @click="trackEvent('mission_expand', { target: `${phase} ${alignment} ${position}` }); localIsModalOpen = !localIsModalOpen"
                class="w-8 h-8 ml-auto text-zinc-200 cursor-pointer hover:text-zinc-50 transition duration-200"
                v-show="!modalStore.isModalOpen" style="padding-top: 5px;">
                <UIcon name="i-heroicons-plus-circle" v-if="!localIsModalOpen" class="w-6 h-6" />
                <UIcon name="i-heroicons-minus-circle" v-else class="w-6 h-6" />
            </button>
        </div>

        <!-- Modal Component -->
        <UModal v-model="localIsModalOpen" prevent-close :transition="false"
            :ui="{ container: 'flex items-center justify-center min-h-screen', background: 'bg-gray-900' }">
            <UCard class="max-h-[80vh] overflow-y-auto" :ui="{
                ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', background: 'bg-gray-700'
            }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            <span class="text-stone-50">{{ phase }} {{ alignment }} {{ position }}</span>
                        </h3>
                        <UButton color="white" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                            class="-my-1 text-white border-2 border-white p-2 rounded-full ml-auto"
                            @click="localIsModalOpen = false" />
                    </div>
                </template>
                
                <!-- Coming soon message when data is empty -->
                <div v-if="!data || data.length === 0" class="py-8 text-center">
                    <p class="text-gray-300 text-lg">Coming soon</p>
                </div>
                
                <UAccordion v-else :items="verifiedAccordionItems" v-model="openAccordionIndices">
                    <template #default="{ item, index, open }">
                        <UButton
                            class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 text-primary-500 dark:text-primary-400 bg-primary-50 hover:bg-primary-100 disabled:bg-primary-50 aria-disabled:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-900 dark:disabled:bg-primary-950 dark:aria-disabled:bg-primary-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center mb-1.5 w-full"
                            :ui="{ padding: { sm: 'py-4 px-4' } }">
                            <template #leading>
                                <!-- Badge Cluster -->
                                <div class="flex items-center gap-1 -my-1">
                                    <!-- Success Rate Badge -->
                                    <UTooltip v-if="successRateBadge(item.content.successRate)" @click.stop 
                                        :text="successRateBadge(item.content.successRate)!.tooltip"
                                        :popper="{ placement: 'top', strategy: 'fixed', touch: ['hold', 500] }">
                                        <div class="w-5 h-5 flex items-center justify-center">
                                            <UIcon 
                                                :name="successRateBadge(item.content.successRate)!.icon" 
                                                class="w-5 h-5"
                                                :class="successRateBadge(item.content.successRate)!.color">
                                            </UIcon>
                                        </div>
                                    </UTooltip>
                                    
                                    <!-- Fallback to old difficulty icon if no successRate -->
                                    <div v-else class="w-6 h-6 flex items-center justify-center">
                                        <UIcon :name="difficultyIcon(item.content)" class="w-8 h-8"
                                            :class="difficultyColor(item.content)"></UIcon>
                                    </div>

                                    <!-- Interaction Type Badges (array) -->
                                    <template v-if="item.content.interactionType && item.content.interactionType.length > 0">
                                        <UTooltip 
                                            v-for="(badge, badgeIndex) in interactionBadges(item.content.interactionType)" 
                                            :key="badgeIndex"
                                            :text="badge!.tooltip"
                                            :popper="{ placement: 'top', strategy: 'fixed', touch: ['hold', 500] }">
                                            <div class="w-5 h-5 flex items-center justify-center">
                                                <UIcon 
                                                    :name="badge!.icon" 
                                                    class="w-5 h-5"
                                                    :class="badge!.color">
                                                </UIcon>
                                            </div>
                                        </UTooltip>
                                    </template>

                                    <!-- Legacy Targeted Badge (for backward compatibility) -->
                                    <UTooltip v-else-if="item.content.targeted" 
                                        :popper="{ placement: 'top', strategy: 'fixed', touch: ['hold', 500] }">
                                        <template #text>
                                            <div class="text-center max-w-xs">
                                                Manual targeting or pausing<br>recommended - see Notes
                                            </div>
                                        </template>
                                        <span class="text-xl cursor-help">🎯</span>
                                    </UTooltip>
                                </div>
                            </template>
                            <img v-if="item.content.icon" :src="item.content.icon" class="h-9 w-9 rounded" />
                            <span>{{ item.label }}</span>
                            <img v-if="item.content.omi" src="/icons/omi.png" alt="omicron" class="h-4 w-4" />
                            <UButton color="white" variant="outline" icon="i-heroicons-share" size="xs" 
                                class="rounded-full text-blue-400 ml-2" @click.stop="showToast(index)"/>
                            <template #trailing>
                                <UIcon name="i-heroicons-chevron-down-20-solid"
                                    class="w-5 h-5 ms-auto transform transition-transform duration-200 flex-shrink-0"
                                    :class="[open && 'rotate-180']" />
                            </template>
                        </UButton>
                    </template>

                    <template #item="{ item }">
                        <dl>
                            <dt class="text-gray-200 font-semibold">Others</dt>
                            <dd class="text-gray-300 mb-2">{{ item.content.others }}</dd>

                            <dt class="text-gray-200 font-semibold">Notes</dt>
                            <dd class="text-gray-300 mb-2">{{ item.content.notes }}</dd>
                        </dl>
                        <div v-for="(video, index) in item.content.videos" class="flex items-center space-x-2">
                            <a 
                            class="text-blue-200 underline flex items-center space-x-2"
                            :href="video.url" target="_blank">
                            <img src="/icons/icons8-youtube.svg" alt="YouTube" class="h-6 w-6" />
                            <span>Video</span>
                            </a>
                        </div>
                    </template>
                </UAccordion>
                
                <!-- Community Suggestions Section -->
                <div v-if="communityAccordionItems.length > 0" class="mt-6">
                    <div class="mb-3 px-3">
                        <h4 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                            Community Suggestions
                        </h4>
                    </div>
                    <UAccordion :items="communityAccordionItems">
                        <template #default="{ item, index, open }">
                            <UButton
                                class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 text-primary-500 dark:text-primary-400 bg-primary-50 hover:bg-primary-100 disabled:bg-primary-50 aria-disabled:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-900 dark:disabled:bg-primary-950 dark:aria-disabled:bg-primary-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center mb-1.5 w-full"
                                :ui="{ padding: { sm: 'py-4 px-4' } }">
                                <img v-if="item.content.icon" :src="item.content.icon" class="h-9 w-9 rounded" />
                                <span>{{ item.label }}</span>
                                <img v-if="item.content.omi" src="/icons/omi.png" alt="omicron" class="h-4 w-4" />
                                <template #trailing>
                                    <UIcon name="i-heroicons-chevron-right-20-solid" class="w-5 h-5 ms-auto transform transition-transform duration-200"
                                        :class="[open && 'rotate-90']" />
                                </template>
                            </UButton>
                        </template>
                        <template #item="{ item }">
                            <div class="text-sm text-gray-300 space-y-4 px-4 py-3">
                                <div>
                                    <strong class="text-white">Team:</strong>
                                    <p class="mt-1">{{ item.content.others }}</p>
                                </div>
                                <div>
                                    <strong class="text-white">Notes:</strong>
                                    <p class="mt-1 whitespace-pre-line">{{ item.content.notes }}</p>
                                </div>
                                <div v-if="item.content.videos && item.content.videos.length > 0">
                                    <strong class="text-white">Videos:</strong>
                                    <div class="mt-2 space-y-2">
                                        <div v-for="(video, videoIndex) in item.content.videos" :key="videoIndex">
                                            <a :href="video.url" target="_blank" rel="noopener noreferrer"
                                                class="text-blue-400 hover:text-blue-300 underline flex items-center gap-2">
                                                <img src="/icons/icons8-youtube.svg" alt="YouTube" class="h-4 w-4" />
                                                <span v-if="video.creator || item.content.creator">by {{ video.creator || item.content.creator }}</span>
                                                <span v-else>Watch Video</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="item.content.creator && !item.content.videos.length">
                                    <strong class="text-white">Suggested by:</strong>
                                    <p class="mt-1">{{ item.content.creator }}</p>
                                </div>
                            </div>
                        </template>
                    </UAccordion>
                </div>
                <template #footer>
                    <MissionModalFooter></MissionModalFooter>
                </template>
            </UCard>
        </UModal>

        <UModal v-model="isHelpModalOpen" :ui="{ container: 'flex min-h-full items-center justify-center' }">
            <img :src="helpUrl" class="object-contain max-h-[90vh] max-w-[90vw]" />
        </UModal>
    </div>
</template>
