<template>
  <div class="bg-color flex flex-col min-h-screen pt-8">
    <div class="px-4">
      <UCard class="mb-8 bg-gradient-to-r from-blue-400 via-indigo-500 to-red-600 text-white shadow-lg rounded-xl p-6">
        <template #header>
          <div class="flex justify-center items-center">
            <h1 class="text-l font-[Orbitron]">SWGOH RoTE Auto Guide</h1>
          </div>
        </template>
      </UCard>
    </div>
    <NuxtPage class="flex-grow" />
    <div class="bg-color flex items-center text-white px-4 py-2 rounded-b-xl">
      <p class="text-xs font-semibold">Questions? Comments?</p>
      <!-- Wrapper for icons -->
      <div class="flex-grow flex justify-end space-x-2">
        <!-- YouTube Link -->
        <a href="https://www.youtube.com/channel/UCUDT-IWDuCUwQIqXshV9aQw" target="_blank" class="hover:opacity-80">
          <img src="/icons8-youtube.svg" alt="YouTube" class="h-8 w-8" />
        </a>
        <!-- Reddit Link -->
        <a href="https://www.reddit.com/user/captsolo23/" target="_blank" class="hover:opacity-80">
          <img src="/icons8-reddit.svg" alt="Reddit" class="h-8 w-8" />
        </a>
      </div>
    </div>
  </div>
</template>