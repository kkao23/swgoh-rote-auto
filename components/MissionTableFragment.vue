<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { type data as dataType } from './../models/data';
import { difficulty, successRate, interactionType } from './../models/data';
import { creatorMap } from '~/models/creators';
import { useRouter, useRoute } from 'vue-router';
import { nextTick, watch, computed, inject, type Ref } from 'vue';
import { trackEvent } from '~/util/analytics';
import {
    difficultyColor,
    difficultyIcon,
    successRateBadge,
    successRateValue,
    interactionBadge,
    interactionBadges,
    interactionComplexity,
} from '~/util/missionHelpers';
import { isUnitOwned as isUnitOwnedPure, teamMeetsRelicReq } from '~/util/rosterUtils';

const { isSaved, toggleSaved } = useSavedTeams();

const { fetchVotes, voteCounts, getTeamKey } = useVoteTracker();

// Inject player roster for ownership checks
const playerRoster = inject<{
  hasUnit: (gameId: string) => boolean
  getRelicTier: (gameId: string) => number | null
  isFetched: Ref<boolean>
} | null>('playerRoster', null)

function isUnitOwned(gameId: string | undefined): boolean {
  return isUnitOwnedPure(gameId, playerRoster?.isFetched.value ?? false, (id) => playerRoster?.hasUnit(id) ?? false)
}

function meetsRelicReq(gameId: string | undefined): boolean {
  return teamMeetsRelicReq(
    gameId,
    props.phase,
    playerRoster?.isFetched.value ?? false,
    (id) => playerRoster?.getRelicTier(id) ?? null,
  )
}

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

// Fetch vote counts when the accordion modal opens
watch(localIsModalOpen, (isOpen) => {
    if (isOpen && props.phase && props.alignment && props.position) {
        fetchVotes(props.phase, props.alignment, props.position);
    }
});

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

// Expose method to open modal from parent
function openModal() {
    localIsModalOpen.value = true;
}

defineExpose({ openModal });

const isMobile = useMediaQuery('(max-width: 768px)');

const verifiedTeams = computed(() => {
    return props.data.filter(d => !d.videos?.some(video => video.creator) && !d.creator);
});

const communityTeams = computed(() => {
    return props.data.filter(d => d.videos?.some(video => video.creator) || d.creator);
});

const verifiedAccordionItems = computed(() => {
    const sortedData = [...verifiedTeams.value].sort((a, b) => {
        // Saved/hearted teams sort to top
        const aSaved = isSaved(props.phase || '', props.alignment || '', props.position || '', a.lead) ? 0 : 1;
        const bSaved = isSaved(props.phase || '', props.alignment || '', props.position || '', b.lead) ? 0 : 1;
        if (aSaved !== bSaved) return aSaved - bSaved;

        // Vote-based sort: teams with ≥ 50 votes cast sort by net votes (highest first)
        const aKey = getTeamKey(props.phase || '', props.alignment || '', props.position || '', a.lead);
        const bKey = getTeamKey(props.phase || '', props.alignment || '', props.position || '', b.lead);
        const aVotes = voteCounts.value[aKey] ?? 0;
        const bVotes = voteCounts.value[bKey] ?? 0;
        const aHasEnough = Math.abs(aVotes) >= 50;
        const bHasEnough = Math.abs(bVotes) >= 50;

        if (aHasEnough || bHasEnough) {
            // If one has enough votes and the other doesn't, the voted one wins
            if (aHasEnough && !bHasEnough) return -1;
            if (!aHasEnough && bHasEnough) return 1;
            // Both have enough: sort by net votes descending
            return bVotes - aVotes;
        }

        // Ownership: owned leads before unowned
        const aOwned = isUnitOwned(a.gameId) ? 0 : 1
        const bOwned = isUnitOwned(b.gameId) ? 0 : 1
        if (aOwned !== bOwned) return aOwned - bOwned

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
            lead: d.lead,
            gameId: d.gameId,
            owned: isUnitOwned(d.gameId),
            meetsRelic: meetsRelicReq(d.gameId),
        },
        defaultOpen: initialDataIndexFromUrl.value !== null ? initialDataIndexFromUrl.value === index : index === 0,
    }));
});

const communityAccordionItems = computed(() => {
    return [...communityTeams.value]
        .sort((a, b) => {
            const aKey = getTeamKey(props.phase || '', props.alignment || '', props.position || '', a.lead);
            const bKey = getTeamKey(props.phase || '', props.alignment || '', props.position || '', b.lead);
            const aVotes = voteCounts.value[aKey] ?? 0;
            const bVotes = voteCounts.value[bKey] ?? 0;

            // Ownership: owned leads before unowned
            const aOwned = isUnitOwned(a.gameId) ? 0 : 1
            const bOwned = isUnitOwned(b.gameId) ? 0 : 1
            if (aOwned !== bOwned) return aOwned - bOwned

            return bVotes - aVotes;
        })
        .map((d) => ({
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
            lead: d.lead,
            gameId: d.gameId,
            owned: isUnitOwned(d.gameId),
            meetsRelic: meetsRelicReq(d.gameId),
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
    <div class="text-center mission-fragment">
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
                
                <MissionModalFooter></MissionModalFooter>

                <!-- Coming soon message when data is empty -->
                <div v-if="!data || data.length === 0" class="py-8 text-center">
                    <p class="text-gray-300 text-lg">Coming soon</p>
                </div>
                
                <UAccordion v-else :items="verifiedAccordionItems" v-model="openAccordionIndices">
                    <template #default="{ item, index, open }">
                        <UButton
                            class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 text-gray-200 dark:text-gray-200 bg-primary-50 hover:bg-primary-100 disabled:bg-primary-50 aria-disabled:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-900 dark:disabled:bg-primary-950 dark:aria-disabled:bg-primary-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center mb-1.5 w-full"
                            :class="{ 'opacity-40 grayscale': playerRoster?.isFetched && (!item.content.owned || !item.content.meetsRelic) }"
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
                            <span class="mission-team-label">{{ item.label }}</span>
                            <span v-if="playerRoster?.isFetched && !item.content.owned" class="text-xs text-red-400/70 ml-1">unowned</span>
                            <span v-else-if="playerRoster?.isFetched && !item.content.meetsRelic" class="text-xs text-amber-400/70 ml-1">below relic</span>
                            <img v-if="item.content.omi" src="/icons/omi.png" alt="omicron" class="h-4 w-4" />
                            <template #trailing>
                                <div class="flex items-center gap-0.5 ml-auto">
                                    <VoteButtons
                                        :phase="phase || ''"
                                        :alignment="alignment || ''"
                                        :position="position || ''"
                                        :lead="item.content.lead"
                                    />
                                    <!-- Share -->
                                    <UButton color="white" variant="outline" icon="i-heroicons-share" size="xs"
                                        class="rounded-full text-blue-400" @click.stop="showToast(index)"/>
                                    <!-- Heart -->
                                    <UButton color="white" variant="ghost" size="xs"
                                        class="rounded-full"
                                        :class="isSaved(phase || '', alignment || '', position || '', item.content.lead) ? 'text-red-500' : 'text-gray-400'"
                                        @click.stop="trackEvent('team_favorite', { action: isSaved(phase || '', alignment || '', position || '', item.content.lead) ? 'unsave' : 'save', target: `${phase} ${alignment} ${position}`, team: item.content.lead }); toggleSaved(phase || '', alignment || '', position || '', item.content.lead)">
                                        <UIcon
                                            :name="isSaved(phase || '', alignment || '', position || '', item.content.lead) ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
                                            class="w-4 h-4" />
                                    </UButton>
                                    <!-- Expand chevron -->
                                    <UIcon name="i-heroicons-chevron-down-20-solid"
                                        class="w-5 h-5 transform transition-transform duration-200 flex-shrink-0"
                                        :class="[open && 'rotate-180']" />
                                </div>
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
                        <h4 class="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                            Community Suggestions
                        </h4>
                    </div>
                    <UAccordion :items="communityAccordionItems">
                        <template #default="{ item, index, open }">
                            <UButton
                                class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 text-gray-200 dark:text-gray-200 bg-primary-50 hover:bg-primary-100 disabled:bg-primary-50 aria-disabled:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-900 dark:disabled:bg-primary-950 dark:aria-disabled:bg-primary-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center mb-1.5 w-full"
                                :class="{ 'opacity-40 grayscale': playerRoster?.isFetched && (!item.content.owned || !item.content.meetsRelic) }"
                                :ui="{ padding: { sm: 'py-4 px-4' } }">
                                <img v-if="item.content.icon" :src="item.content.icon" class="h-9 w-9 rounded" />
                                <span class="mission-team-label">{{ item.label }}</span>
                                <span v-if="playerRoster?.isFetched && !item.content.owned" class="text-xs text-red-400/70 ml-1">unowned</span>
                            <span v-else-if="playerRoster?.isFetched && !item.content.meetsRelic" class="text-xs text-amber-400/70 ml-1">below relic</span>
                                <img v-if="item.content.omi" src="/icons/omi.png" alt="omicron" class="h-4 w-4" />
                                <template #trailing>
                                    <div class="flex items-center gap-0.5 ml-auto">
                                        <VoteButtons
                                            :phase="phase || ''"
                                            :alignment="alignment || ''"
                                            :position="position || ''"
                                            :lead="item.content.lead"
                                        />
                                        <UIcon name="i-heroicons-chevron-right-20-solid" class="w-5 h-5 transform transition-transform duration-200"
                                            :class="[open && 'rotate-90']" />
                                    </div>
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
            </UCard>
        </UModal>

        <UModal v-model="isHelpModalOpen" :ui="{ container: 'flex min-h-full items-center justify-center' }">
            <img :src="helpUrl" class="object-contain max-h-[90vh] max-w-[90vw]" />
        </UModal>
    </div>
</template>
