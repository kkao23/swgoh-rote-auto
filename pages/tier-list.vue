<template>
  <div class="px-4 pb-8">
    <UCard class="bg-gray-800 text-white">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Omicron Tier List</h2>
          <span class="text-sm text-gray-400">Last updated: 2/3/26</span>
        </div>
      </template>
      
      <div class="space-y-6">
        <!-- Tier List Image -->
        <div class="flex justify-center">
          <img 
            src="/images/tier-list.png" 
            alt="Omicron Tier List" 
            class="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        
        <!-- Explanation Link -->
        <div class="flex justify-center">
          <a 
            href="https://youtu.be/CDgUV6SRZWE" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            <UIcon name="i-heroicons-play-circle" class="w-5 h-5" />
            <span class="underline">Explanation Video</span>
          </a>
        </div>
      </div>
    </UCard>
  </div>
</template>
