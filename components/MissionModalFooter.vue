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
                <div class="flex flex-col space-y-3">
                    <!-- Success Rate Section -->
                    <div>
                        <h4 class="text-gray-100 font-semibold text-sm mb-2">Success Rate</h4>
                        <div class="flex flex-col space-y-1">
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-check-circle-solid" class="text-green-500 w-5 h-5"></UIcon>
                                <span class="text-gray-200 text-xs md:text-sm">Consistent 2/2 waves</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-exclamation-triangle-solid" class="text-yellow-500 w-5 h-5"></UIcon>
                                <span class="text-gray-200 text-xs md:text-sm">Usually works, can fail (60-80%)</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-minus-circle-solid" class="text-orange-500 w-5 h-5"></UIcon>
                                <span class="text-gray-200 text-xs md:text-sm">50/50 - Consistent 1/2, sometimes 2/2</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-x-circle-solid" class="text-red-500 w-5 h-5"></UIcon>
                                <span class="text-gray-200 text-xs md:text-sm">Unreliable or cannot auto</span>
                            </div>
                        </div>
                    </div>

                    <!-- Interaction Type Section -->
                    <div>
                        <h4 class="text-gray-100 font-semibold text-sm mb-2">Interaction Required</h4>
                        <div class="flex flex-col space-y-1">
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-cursor-arrow-rays" class="text-blue-400 w-5 h-5"></UIcon>
                                <span class="text-gray-200 text-xs md:text-sm">Target at battle start</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-pause-circle" class="text-purple-400 w-5 h-5"></UIcon>
                                <span class="text-gray-200 text-xs md:text-sm">Pause at wave 2</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-hand-raised" class="text-red-400 w-5 h-5"></UIcon>
                                <span class="text-gray-200 text-xs md:text-sm">Manual play required</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="text-gray-400 text-xs italic ml-7">No badge = Pure auto</span>
                            </div>
                        </div>
                    </div>

                    <!-- Legacy/Other Section -->
                    <div>
                        <h4 class="text-gray-100 font-semibold text-sm mb-2">Other</h4>
                        <div class="flex flex-col space-y-1">
                            <div class="flex items-center space-x-2">
                                <img src="/icons/omi.png" alt="omicron" class="h-4 w-4" />
                                <span class="text-gray-200 text-xs md:text-sm">Omicron applied - may not work without it</span>
                            </div>
                        </div>
                    </div>

                    <!-- Legacy Difficulty (for missions not yet updated) -->
                    <div>
                        <h4 class="text-gray-100 font-semibold text-sm mb-2">Legacy Difficulty Icons</h4>
                        <div class="flex flex-col space-y-1">
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-check-circle-solid" class="text-green-500 w-5 h-5"></UIcon>
                                <span class="text-gray-200 text-xs md:text-sm">Very Easy - just press auto</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-hand-thumb-up-solid" class="text-blue-400 w-5 h-5"></UIcon>
                                <span class="text-gray-200 text-xs md:text-sm">Easy - may need opening moves</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-exclamation-triangle-solid" class="text-yellow-600 w-5 h-5"></UIcon>
                                <span class="text-gray-200 text-xs md:text-sm">Caution - may require targeting/pausing</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-shield-exclamation-solid" class="text-orange-600 w-5 h-5"></UIcon>
                                <span class="text-gray-200 text-xs md:text-sm">Hard - often only 1/2 on auto</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <UIcon name="i-heroicons-x-circle-solid" class="text-red-900 w-5 h-5"></UIcon>
                                <span class="text-gray-200 text-xs md:text-sm">No Auto - must play most of battle</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </UAccordion>
</template>
