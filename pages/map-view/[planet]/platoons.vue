<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const planetSlug = route.params.planet as string

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

function goBackToPlanet() {
  router.push(`/map-view/${planetSlug}`)
}

function goBackToMap() {
  router.push('/map-view')
}
</script>

<template>
  <div class="px-4 pb-8">
    <!-- Breadcrumb Header -->
    <div class="flex items-center gap-2 mb-6 text-sm text-gray-400">
      <span class="cursor-pointer hover:text-white" @click="goBackToMap">Galaxy Map</span>
      <span>/</span>
      <span class="cursor-pointer hover:text-white" @click="goBackToPlanet">{{ planetName }}</span>
      <span>/</span>
      <span class="text-white">Platoons</span>
    </div>
    
    <h2 class="text-xl text-white mb-4 text-center">{{ planetName }} - Platoons</h2>
    
    <!-- Platoons Map -->
    <div class="max-w-4xl mx-auto">
      <div class="relative rounded-lg overflow-hidden shadow-lg">
        <img 
          :src="`/images/map_view/${planetSlug} platoons.png`" 
          :alt="`${planetName} Platoons`"
          class="w-full h-auto"
        />
      </div>
      
      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4 mt-6 justify-center">
        <UButton
          icon="i-heroicons-map"
          color="blue"
          variant="outline"
          @click="goBackToPlanet"
        >
          Back to {{ planetName }}
        </UButton>
        
        <UButton
          icon="i-heroicons-globe-alt"
          color="gray"
          variant="ghost"
          @click="goBackToMap"
        >
          Galaxy Map
        </UButton>
      </div>
    </div>
  </div>
</template>
