<script setup lang="ts">

const legend = [
    {
        label: 'Legend',
        icon: 'i-heroicons-information-circle',
        slot: 'legend'
    }
]

</script>
<template>
    <UAccordion :items="legend">
        <template #legend>
            <div class="bg-gray-800 p-2 rounded-lg">
                <div class="flex flex-col space-y-1">
                    <!-- Very Easy Color -->
                    <div class="flex items-center space-x-2">
                        <UIcon name="i-heroicons-check-circle-solid" class="text-green-500"></UIcon>
                        <span class="text-gray-200 text-sm">Very Easy, literally just press auto</span>
                    </div>
                    <!-- Easy Color -->
                    <div class="flex items-center space-x-2">
                        <UIcon name="i-heroicons-hand-thumb-up-solid" class="text-blue-400"></UIcon>
                        <span class="text-gray-200 text-xs">Easy, may have to do some opening moves, or
                            can
                            occasionally get
                            unlucky</span>
                    </div>
                    <!-- Caution Color -->
                    <div class="flex items-center space-x-2">
                        <UIcon name="i-heroicons-exclamation-triangle-solid" class="text-yellow-600">
                        </UIcon>
                        <span class="text-gray-200 text-xs">Caution, can auto but may require
                            targeting/pausing</span>
                    </div>
                    <!-- Hard Color -->
                    <div class="flex items-center space-x-2">
                        <UIcon name="i-heroicons-shield-exclamation-solid" class="text-orange-600"></UIcon>
                        <span class="text-gray-200 text-sm">Hard, can often only get 1/2 on auto</span>
                    </div>
                    <!-- No Auto Color -->
                    <div class="flex items-center space-x-2">
                        <UIcon name="i-heroicons-x-circle-solid" class="text-red-900"></UIcon>
                        <span class="text-gray-200 text-sm">No Auto, must play most of the battle</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <img src="/icons/omi.png" alt="omicron" class="h-4 w-4" />
                        <span class="text-gray-200 text-xs">I had an omicron applied, auto may not be
                            guaranteed
                            without it</span>
                    </div>
                </div>
            </div>
        </template>
    </UAccordion>
</template>