<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Generic', 
    points: '33,269 19,414 213,418 257,274',
    phase: 'phase4',
    alignment: 'mixed',
    position: 'Generic',
    data: data.phase4.mixed.generic
  },
  { 
    name: 'Generic', 
    points: '762,349 719,486 976,506 1013,362',
    phase: 'phase4',
    alignment: 'mixed',
    position: 'Generic',
    data: data.phase4.mixed.generic
  },
  { 
    name: 'Jabba', 
    points: '581,542 568,693 829,696 836,553',
    phase: 'phase4',
    alignment: 'mixed',
    position: 'Jabba',
    data: data.phase4.mixed.jabba
  },
  { 
    name: 'Fleet', 
    points: '994,648 990,766 1232,771 1230,650',
    phase: 'phase4',
    alignment: 'mixed',
    position: 'Fleet',
    data: data.phase4.mixed.fleet
  },
  { 
    name: 'Qira', 
    points: '27,616 31,769 313,762 307,612',
    phase: 'phase4',
    alignment: 'mixed',
    position: 'Qira',
    data: data.phase4.mixed.qira
  },
  { 
    name: 'Platoons', 
    points: '489,216 485,375 773,379 783,223',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Kessel"
    image-src="/images/map_view/kessel.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/kessel platoons.png"
    :missions="missions"
  />
</template>
