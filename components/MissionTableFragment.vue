<script setup lang="ts">

import { type data as dataType } from './../models/data';
import { difficulty } from './../models/data';

defineProps({
    special: Boolean,
    shard: Boolean,
    unlock: Boolean,
    phase: String,
    alignment: String,
    position: String,
    data: {
        type: Array<dataType>,
        required: true
    },
    columns: Array<{
        key: string,
        label: string
    }>,
});

const modalStore = useModalStore();
const globalToggleModal = () => modalStore.toggleModal();
const localIsModalOpen = ref(false);

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
</script>

<template>
    <div class="text-center">
        <div class="flex items-center space-x-1">
            <img v-if="special" src="/icons/GET.png" alt="Guild Event Token Icon" class="w-6 h-6">
            <img v-if="shard" src="/icons/sst.png" alt="Shard Icon" class="w-6 h-6">
            <span>{{ position }}</span>
            <UIcon v-if="unlock" name="i-heroicons-lock-open" class="pl-2 w-6 h-6" /><button
                @click="localIsModalOpen = !localIsModalOpen"
                class="w-8 h-8 text-zinc-200 cursor-pointer hover:text-zinc-50 transition duration-200"
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
                            class="-my-1 text-white border-2 border-white p-2 rounded-full"
                            @click="localIsModalOpen = false" />
                    </div>
                </template>
                <UAccordion :items="data.sort((a, b) => a.difficulty - b.difficulty).map(d => {
                    return {
                        label: d.lead, content: {
                            others: d.others,
                            notes: d.notes,
                            link: d.link,
                            difficulty: d.difficulty,
                        },
                        defaultOpen: data.length === 1,
                    }
                })">
                    <template #default="{ item, index, open }">
                        <UButton
                            class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 text-primary-500 dark:text-primary-400 bg-primary-50 hover:bg-primary-100 disabled:bg-primary-50 aria-disabled:bg-primary-50 dark:bg-primary-950 dark:hover:bg-primary-900 dark:disabled:bg-primary-950 dark:aria-disabled:bg-primary-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center mb-1.5 w-full"
                            :ui="{ padding: { sm: 'p-3' } }">
                            <template #leading>
                                <div class="w-6 h-6 flex items-center justify-center -my-1">
                                    <UIcon name="i-heroicons-information-circle-solid" class="w-8 h-8"
                                        :class="difficultyColor(item.content)"></UIcon>
                                </div>
                            </template>
                            <span>{{ item.label }}</span>
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
                        <a class="text-blue-200 underline flex items-center space-x-2" :href="item.content.link"
                            target="_blank">
                            <img src="/icons/icons8-youtube.svg" alt="YouTube" class="h-6 w-6" /><span>Video</span></a>
                    </template>
                </UAccordion>
                <template #footer>
                    <div class="bg-gray-800 p-2 rounded-lg">
                        <div class="flex flex-col space-y-1">
                            <!-- Very Easy Color -->
                            <div class="flex items-center space-x-2">
                                <div class="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                                <span class="text-gray-200 text-sm">Very Easy, literally just press auto</span>
                            </div>
                            <!-- Easy Color -->
                            <div class="flex items-center space-x-2">
                                <div class="w-4 h-4 bg-blue-400 rounded-full flex-shrink-0"></div>
                                <span class="text-gray-200 text-xs">Easy, may have to do some opening moves, or can occasionally get unlucky</span>
                            </div>
                            <!-- Caution Color -->
                            <div class="flex items-center space-x-2">
                                <div class="w-4 h-4 bg-yellow-600 rounded-full flex-shrink-0"></div>
                                <span class="text-gray-200 text-xs">Caution, can auto but may require targeting/pausing</span>
                            </div>
                            <!-- Hard Color -->
                            <div class="flex items-center space-x-2">
                                <div class="w-4 h-4 bg-orange-600 rounded-full flex-shrink-0"></div>
                                <span class="text-gray-200 text-sm">Hard, can often only get 1/2 on auto</span>
                            </div>
                            <!-- No Auto Color -->
                            <div class="flex items-center space-x-2">
                                <div class="w-4 h-4 bg-red-900 rounded-full flex-shrink-0"></div>
                                <span class="text-gray-200 text-sm">No Auto, must play most of the battle</span>
                            </div>
                        </div>
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>