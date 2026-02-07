<script setup lang="ts">
import { useRouter } from 'vue-router'

interface PlanetRegion {
  name: string
  slug: string
  points: string 
}

// Updated coordinates based on 1362 x 802 resolution
const planetRegions: PlanetRegion[] = [
  // --- PHASE 1 (Bottom Row) ---
  { name: 'Mustafar', slug: 'mustafar', points: '447,746 598,763 646,693 568,592' },
  { name: 'Corellia', slug: 'corellia', points: '647,684 774,687 848,590 573,590' },
  { name: 'Coruscant', slug: 'coruscant', points: '778,697 821,769 976,748 849,591' },
  
  // --- PHASE 2 ---
  { name: 'Geonosis', slug: 'geonosis', points: '466,697 597,576 556,468 334,646' },
  { name: 'Felucia', slug: 'felucia', points: '606,575 818,577 877,463 560,468' },
  { name: 'Bracca', slug: 'bracca', points: '826,574 959,698 1098,654 881,467' },
  
  // --- PHASE 3 ---
  { name: 'Dathomir', slug: 'dathomir', points: '414,562 297,475 131,772 262,775' },
  { name: 'Tatooine', slug: 'tatooine', points: '610,446 810,446 850,335 570,336' },
  { name: 'Zeffo', slug: 'zeffo', points: '812,448 1020,550 1107,479 852,340' },
  { name: 'Kashyyyk', slug: 'kashyyyk', points: '1026,551 1136,772 1301,768 1128,480' },
  
  // --- PHASE 4 ---
  { name: 'Haven', slug: 'haven', points: '34,571 355,296 421,387 176,606' },
  { name: 'Mandalore', slug: 'mandalore', points: '357,294 710,229 712,316 418,383' },
  { name: 'Kessel', slug: 'kessel', points: '714,229 1065,292 1012,381 714,316' },
  { name: 'Lothal', slug: 'lothal', points: '1069,294 1358,515 1242,603 1003,384' },
  
  // --- PHASE 5 ---
  { name: 'Malachor', slug: 'malachor', points: '5,420 214,244 286,319 98,467' },
  { name: 'Vandor', slug: 'vandor', points: '514,131 908,135 877,228 546,230' },
  { name: 'Kafrene', slug: 'kafrene', points: '1205,240 1360,351 1323,457 1143,317' },
  
  // --- PHASE 6 (Top Row) ---
  { name: 'Death Star', slug: 'death-star', points: '7,252 334,78 380,165 68,300' },
  { name: 'Hoth', slug: 'hoth', points: '711,14 1086,72 1038,158 712,115' },
  { name: 'Scarif', slug: 'scarif', points: '1083,82 1039,162 1349,304 1358,196' },
]

const router = useRouter()

function navigateToPlanet(slug: string) {
  router.push(`/map-view/${slug}`)
}
</script>

<template>
  <div class="px-4 pb-8">
    <p class="text-gray-400 text-sm text-center mb-6">Click on a planet to view mission details</p>
    
    <div class="relative w-full max-w-4xl mx-auto">
      <img 
        src="/images/map_view/world map.png" 
        alt="Galaxy Map" 
        class="w-full h-auto rounded-lg shadow-lg"
      />
      
      <svg 
        class="absolute inset-0 w-full h-full pointer-events-none" 
        viewBox="0 0 1362 802" 
        preserveAspectRatio="none"
      >
        <g v-for="planet in planetRegions" :key="planet.slug">
          <polygon
            :points="planet.points"
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.3)"
            stroke-width="3"
            vector-effect="non-scaling-stroke"
            class="cursor-pointer pointer-events-auto hover:fill-white/10 hover:stroke-white transition-all duration-200"
            @click="navigateToPlanet(planet.slug)"
          />
        </g>
      </svg>
    </div>
  </div>
</template>