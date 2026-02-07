<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Bottom Left', 
    points: '13,636 25,778 249,777 242,639',
    phase: 'phase5',
    alignment: 'mixed',
    position: 'Bottom Left',
    data: data.phase5.mixed.bottomLeft
  },
  { 
    name: 'Fleet', 
    points: '840,591 804,741 1078,748 1111,596',
    phase: 'phase5',
    alignment: 'mixed',
    position: 'Fleet',
    data: data.phase5.mixed.fleet
  },
  { 
    name: 'Jabba', 
    points: '572,410 539,544 819,557 815,414',
    phase: 'phase5',
    alignment: 'mixed',
    position: 'Jabba',
    data: data.phase5.mixed.jabba
  },
  { 
    name: 'Top Right', 
    points: '760,241 752,366 1034,378 1024,242',
    phase: 'phase5',
    alignment: 'mixed',
    position: 'Top Right',
    data: data.phase5.mixed.topRight
  },
  { 
    name: 'Platoons', 
    points: '399,591 401,750 712,756 712,587',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Vandor"
    image-src="/images/map_view/vandor.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/vandor platoons.png"
    :missions="missions"
  />
</template>
