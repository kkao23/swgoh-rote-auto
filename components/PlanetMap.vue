<script setup lang="ts">
import type { MissionRegion } from '~/models/data'

const props = defineProps<{
  planetName: string
  imageSrc: string
  imageWidth: number
  imageHeight: number
  platoonsSrc: string
  missions: MissionRegion[]
}>()

const router = useRouter()
const isPlatoonsModalOpen = ref(false)

// Store refs to MissionTableFragments by position
const missionRefs = ref<Map<string, any>>(new Map())

function setMissionRef(el: any, position: string) {
  if (el) {
    missionRefs.value.set(position, el)
  }
}

function selectMission(mission: MissionRegion) {
  if (mission.position === 'platoons') {
    isPlatoonsModalOpen.value = true
    return
  }
  // Directly open the modal via exposed method
  const fragment = missionRefs.value.get(mission.position)
  if (fragment) {
    fragment.openModal()
  }
}

function goBack() {
  router.push('/map-view')
}

function goToPlatoons() {
  isPlatoonsModalOpen.value = true
}

const viewBox = computed(() => `0 0 ${props.imageWidth} ${props.imageHeight}`)

// Deduplicate missions by position for MissionTableFragments
const uniqueMissions = computed(() => {
  const seen = new Set<string>()
  return props.missions.filter(m => {
    if (m.position === 'platoons') return false
    if (seen.has(m.position)) return false
    seen.add(m.position)
    return true
  })
})
</script>

<template>
  <div class="px-4 pb-8">
    <div class="flex items-center gap-4 mb-6">
      <UButton
        icon="i-heroicons-arrow-left"
        color="gray"
        variant="ghost"
        @click="goBack"
      />
      <h2 class="text-xl text-white">{{ planetName }}</h2>
    </div>
    
    <div class="max-w-4xl mx-auto flex justify-center">
      <div class="relative rounded-lg shadow-lg w-fit h-fit">
        <img 
          :src="imageSrc"
          :alt="planetName"
          class="block w-full h-auto max-h-[60vh]"
        />
        <svg 
          class="absolute inset-0 w-full h-full pointer-events-none"
          :viewBox="viewBox"
          preserveAspectRatio="none"
        >
          <g v-for="(mission, index) in missions" :key="`${mission.name}-${index}`">
            <polygon
              :points="mission.points"
              fill="transparent"
              stroke="rgba(0, 255, 255, 0.5)"
              stroke-width="3"
              vector-effect="non-scaling-stroke"
              class="cursor-pointer pointer-events-auto hover:fill-cyan-500/20 hover:stroke-cyan-300 transition-all duration-200"
              @click="selectMission(mission)"
            />
          </g>
        </svg>
      </div>
    </div>
    
    <div class="flex flex-wrap gap-4 mt-6 justify-center">
      <UButton
        icon="i-heroicons-users"
        color="blue"
        variant="solid"
        @click="goToPlatoons"
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
    
    <!-- Hidden MissionTableFragments that respond to URL query params -->
    <div class="opacity-0 h-0 overflow-hidden">
      <MissionTableFragment
        v-for="(mission, index) in uniqueMissions"
        :ref="(el) => setMissionRef(el, mission.position)"
        :key="`${mission.position}-${index}`"
        :position="mission.position"
        :data="mission.data"
        :phase="mission.phase"
        :alignment="mission.alignment"
        :url-triggered="false"
      />
    </div>
    
    <!-- Platoons Image Modal -->
    <UModal v-model="isPlatoonsModalOpen" :ui="{ container: 'flex items-center justify-center min-h-screen' }">
      <UCard class="max-h-[90vh] overflow-y-auto" :ui="{
        ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', background: 'bg-gray-900'
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              <span class="text-stone-50">{{ planetName }} - Platoons</span>
            </h3>
            <UButton color="white" variant="ghost" icon="i-heroicons-x-mark-20-solid"
              class="-my-1 text-white border-2 border-white p-2 rounded-full ml-auto"
              @click="isPlatoonsModalOpen = false" />
          </div>
        </template>
        
        <img 
          :src="platoonsSrc" 
          :alt="`${planetName} Platoons`"
          class="w-full h-auto max-h-[70vh] object-contain"
        />
      </UCard>
    </UModal>
  </div>
</template>
