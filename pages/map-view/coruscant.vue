<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Ships', 
    points: '13,273 10,407 263,416 259,270',
    phase: 'phase1',
    alignment: 'ls',
    position: 'Ships',
    data: data.phase1.ls.ships
  },
  { 
    name: 'Generic', 
    points: '25,516 21,667 299,651 284,500',
    phase: 'phase1',
    alignment: 'ls',
    position: 'Generic',
    data: data.phase1.ls.generic
  },
  { 
    name: 'Generic', 
    points: '265,400 269,534 493,526 495,391',
    phase: 'phase1',
    alignment: 'ls',
    position: 'Generic',
    data: data.phase1.ls.generic
  },
  { 
    name: 'Mace Kit', 
    points: '754,428 748,563 961,564 973,428',
    phase: 'phase1',
    alignment: 'ls',
    position: 'Mace Kit',
    data: data.phase1.ls.maceKitP1
  },
  { 
    name: 'Platoons', 
    points: '155,649 173,791 426,794 420,645',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
  { 
    name: 'Jedi', 
    points: '566,291 566,430 779,426 777,295',
    phase: 'phase1',
    alignment: 'ls',
    position: 'Jedi',
    data: data.phase1.ls.jediP1
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Coruscant"
    image-src="/images/map_view/coruscant.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/coruscant platoons.png"
    :missions="missions"
  />
</template>
