<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { type data as dataType } from './../models/data';
import { difficulty } from './../models/data';
import { creatorMap } from '~/models/creators';
import { useRouter, useRoute } from 'vue-router';
import { nextTick, watch, computed } from 'vue'; // Ensure computed is imported

const props = defineProps({
    special: Boolean,
    shard: Boolean,
    unlock: Boolean,
    phase: String,
    alignment: String,
    position: String,
    helpUrl: String,
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

// Reactive variable to store the indices of currently open accordion items
// This will still be used for user interaction with the accordion after initial load
const openAccordionIndices = ref<number[]>([]); 

// Reactive variable to store the dataIndex from the URL for initial open state
const initialDataIndexFromUrl = ref<number | null>(null);

// Watch for changes in route query parameters to trigger modal open and set initialDataIndex
watchEffect(() => {
    if (route.query.phase === props.phase &&
        route.query.alignment === props.alignment &&
        route.query.position === props.position) {
        const dataIndex = parseInt(route.query.dataIndex as string);
        if (!isNaN(dataIndex) && dataIndex >= 0 && props.data && dataIndex < props.data.length) {
            localIsModalOpen.value = true;
            initialDataIndexFromUrl.value = dataIndex; // Set the index from URL
        } else {
            // If no valid dataIndex in URL, set to null, which will trigger defaultOpen for index 0
            initialDataIndexFromUrl.value = null; 
        }
    } else {
        // If props don't match, reset initialDataIndexFromUrl to null
        initialDataIndexFromUrl.value = null; 
    }
});

// Watch for localIsModalOpen to become true and initialDataIndexFromUrl to be set
// This ensures the accordion is opened after the modal is rendered.
watch(localIsModalOpen, (isOpen) => {
    if (isOpen && initialDataIndexFromUrl.value !== null) {
        nextTick(() => {
            // Set openAccordionIndices to trigger the v-model update for UAccordion
            // This is still useful for programmatic control after initial load.
            openAccordionIndices.value = [initialDataIndexFromUrl.value as number];
        });
    } else if (isOpen && initialDataIndexFromUrl.value === null) {
        // If modal opens and no specific index is requested, open the first item by default
        nextTick(() => {
            openAccordionIndices.value = [0];
        });
    }
    else if (!isOpen) {
        // Optionally clear openAccordionIndices when modal closes
        openAccordionIndices.value = [];
        initialDataIndexFromUrl.value = null; // Also clear the initial index
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

const isMobile = useMediaQuery('(max-width: 768px)');

const accordionItems = computed(() => {
    // First, sort items: items with any video having a creator go to the end
    const sortedData = [...props.data].sort((a, b) => {
        const aHasCreatorVideo = a.videos?.some(video => video.creator);
        const bHasCreatorVideo = b.videos?.some(video => video.creator);
        if (aHasCreatorVideo === bHasCreatorVideo) return 0;
        return aHasCreatorVideo ? 1 : -1;
    }).sort((a, b) => a.difficulty - b.difficulty); // Then sort by difficulty

    return sortedData.map((d, index) => {
        return {
            label: !isMobile.value && d.leadFull ? d.leadFull : d.lead,
            content: {
                others: d.others,
                notes: d.notes,
                videos: d.videos,
                difficulty: d.difficulty,
                omi: d.omi,
            },
            // Set defaultOpen based on initialDataIndexFromUrl for initial page load
            // If initialDataIndexFromUrl is null, default to opening the first item (index 0)
            defaultOpen: initialDataIndexFromUrl.value !== null ? initialDataIndexFromUrl.value === index : index === 0,
        }
    });
});


const creatorMapLocal: { [key: string]: string } = creatorMap;

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
            <span class="flex-1 text-left hover:underline cursor-pointer" @click="localIsModalOpen = !localIsModalOpen">{{ position }}</span>
            <UIcon v-if="helpUrl" name="i-heroicons-question-mark-circle" @click="isHelpModalOpen = true" class="pl-2 w-6 h-6 text-blue-300 cursor-pointer"></UIcon>
            <UIcon v-if="unlock" name="i-heroicons-lock-open" class="pl-2 w-6 h-6" /><button
                @click="localIsModalOpen = !localIsModalOpen"
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
                <!-- Bind v-model to openAccordionIndices to track open items -->
                <UAccordion :items="accordionItems" v-model="openAccordionIndices">
                    <template #default="{ item, index, open }">
                        <UButton
                            class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 text-primary-500 dark:text-primary-400 bg-primary-50 hover:bg-primary-100 disabled:bg-primary-50 aria-disabled:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-900 dark:disabled:bg-primary-950 dark:aria-disabled:bg-primary-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center mb-1.5 w-full"
                            :ui="{ padding: { sm: 'p-3' } }">
                            <template #leading>
                                <div class="w-6 h-6 flex items-center justify-center -my-1">
                                    <UIcon :name="difficultyIcon(item.content)" class="w-8 h-8"
                                        :class="difficultyColor(item.content)"></UIcon>
                                </div>
                            </template>
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
                            <span v-if="video.creator" class="text-gray-300"> by </span><img v-if="video.creator" :src="creatorMapLocal[video.creator as string]" class="h-12 w-12" />
                        </div>
                    </template>
                </UAccordion>
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
