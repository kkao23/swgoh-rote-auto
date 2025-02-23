<script setup lang="ts">

type data = {
    lead: string,
    others: string,
    notes: string,
    link: string
}

defineProps({
    special: Boolean,
    shard: Boolean,
    phase: String,
    alignment: String,
    position: String,
    data: Array<data>,
    columns: Array<{
        key: string,
        label: string
    }>,
});

const modalStore = useModalStore();
const globalToggleModal = () => modalStore.toggleModal();
const localIsModalOpen = ref(false);

const columns = [{
    key: 'lead',
    label: 'Lead',
    class: 'px-3',
}, {
    key: 'others',
    label: 'Others',
    class: 'px-3',
}, {
    key: 'notes',
    label: 'Notes',
    class: 'px-3',
}, {
    key: 'link',
    label: 'Video',
    class: 'px-3',
}]
</script>

<template>
    <td>
        <div class="text-center">
            <div class="flex items-center space-x-1">
                <img v-if="special" src="/GET.png" alt="Guild Event Token Icon" class="w-6 h-6">
                <img v-if="shard" src="/sst.png" alt="Shard Icon" class="w-6 h-6">
                <span>{{ position }}</span> <button @click="localIsModalOpen = !localIsModalOpen"
                    class="w-8 h-8 text-zinc-200 cursor-pointer hover:text-zinc-50 transition duration-200"
                    v-show="!modalStore.isModalOpen" style="padding-top: 5px;">
                    <UIcon name="i-heroicons-plus-circle" v-if="!localIsModalOpen" class="w-6 h-6" />
                    <UIcon name="i-heroicons-minus-circle" v-else class="w-6 h-6" />
                </button>
            </div>

            <!-- Modal Component -->
            <UModal v-model="localIsModalOpen" prevent-close :transition="false">
                <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                <span>{{phase}} {{alignment}} {{ position }}</span>
                            </h3>
                            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                                @click="localIsModalOpen = false" />
                        </div>
                    </template>

                    <UTable :rows=data :columns="columns">
                        <template #link-data="{ row }">
                            <a :href="row.link" class="text-blue-500 underline" target="_blank">
                                Video
                            </a>
                        </template>
                        <template #others-data="{ row }">
                            <span class="whitespace-normal break-words max-w-[40vw]">{{ row.others }}</span>
                        </template>
                        <template #notes-data="{ row }">
                            <span class="whitespace-normal break-words max-w-[60vw]">{{ row.notes }}</span>
                        </template>
                    </UTable>
                </UCard>
                </div>
            </UModal>
        </div>
    </td>
</template>