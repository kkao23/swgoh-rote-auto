<script setup lang="ts">

type data = {
    lead: string,
    others: string,
    notes: string,
    link: string
}

defineProps({
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
const isExpanded = ref(false);

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
                <span>{{ position }}</span> <button @click="globalToggleModal(); localIsModalOpen = !localIsModalOpen"
                    class="w-8 h-8 text-blue-500 cursor-pointer hover:text-blue-700 transition duration-200"
                    v-show="!modalStore.isModalOpen" style="padding-top: 5px;">
                    <UIcon name="i-heroicons-plus-circle" v-if="!localIsModalOpen" class="w-6 h-6" />
                    <UIcon name="i-heroicons-minus-circle" v-else class="w-6 h-6" />
                </button>
            </div>

            <!-- Modal Component -->
            <Modal :isOpen="localIsModalOpen" @update:isOpen="localIsModalOpen = $event">
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
            </Modal>
        </div>
    </td>
</template>