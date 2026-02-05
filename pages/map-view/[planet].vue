<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const planetSlug = route.params.planet as string

// Map slugs to display names
const planetNames: Record<string, string> = {
  'mustafar': 'Mustafar',
  'corellia': 'Corellia',
  'coruscant': 'Coruscant',
  'geonosis': 'Geonosis',
  'felucia': 'Felucia',
  'bracca': 'Bracca',
  'dathomir': 'Dathomir',
  'tatooine': 'Tatooine',
  'zeffo': 'Zeffo',
  'kashyyyk': 'Kashyyyk',
  'haven': 'Haven',
  'mandalore': 'Mandalore',
  'kessel': 'Kessel',
  'lothal': 'Lothal',
  'malachor': 'Malachor',
  'vandor': 'Vandor',
  'kafrene': 'Kafrene',
  'death-star': 'Death Star',
  'hoth': 'Hoth',
  'scarif': 'Scarif',
}

const planetName = planetNames[planetSlug] || planetSlug

// Check if platoons image exists (we have platoons for all planets)
const hasPlatoons = true

function goBack() {
  router.push('/map-view')
}

function viewPlatoons() {
  router.push(`/map-view/${planetSlug}/platoons`)
}
</script>

<template>
  <div class="px-4 pb-8">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <UButton
        icon="i-heroicons-arrow-left"
        color="gray"
        variant="ghost"
        @click="goBack"
      />
      <h2 class="text-xl text-white">{{ planetName }}</h2>
    </div>
    
    <!-- Planet Map -->
    <div class="max-w-4xl mx-auto">
      <div class="relative rounded-lg overflow-hidden shadow-lg">
        <img 
          :src="`/images/map_view/${planetSlug}.png`" 
          :alt="planetName"
          class="w-full h-auto"
        />
      </div>
      
      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4 mt-6 justify-center">
        <UButton
          v-if="hasPlatoons"
          icon="i-heroicons-users"
          color="blue"
          variant="solid"
          @click="viewPlatoons"
        >
          View Platoons
        </UButton>
        
        <UButton
          icon="i-heroicons-map"
          color="gray"
          variant="outline"
          @click="goBack"
        >
          Back to Galaxy Map
        </UButton>
      </div>
    </div>
  </div>
</template>
