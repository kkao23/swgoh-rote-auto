<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Young Lando', 
    points: '257,298 253,453 508,455 526,302',
    phase: 'phase2',
    alignment: 'mixed',
    position: 'Young Lando',
    data: data.phase2.mixed.youngLando
  },
  { 
    name: 'Hondo', 
    points: '355,559 334,731 618,738 631,578',
    phase: 'phase2',
    alignment: 'mixed',
    position: 'Hondo',
    data: data.phase2.mixed.hondo
  },
  { 
    name: 'Platoons', 
    points: '863,596 850,756 1120,754 1153,601',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
  { 
    name: 'Combat', 
    points: '838,321 827,483 1061,443 1078,328',
    phase: 'phase2',
    alignment: 'mixed',
    position: 'Combat',
    data: data.phase2.mixed.combat
  },
  { 
    name: 'Jabba', 
    points: '925,500 1195,408 1247,589 961,589',
    phase: 'phase2',
    alignment: 'mixed',
    position: 'Jabba',
    data: data.phase2.mixed.jabba
  },
  { 
    name: 'Ships', 
    points: '1097,161 1090,320 1331,326 1322,159',
    phase: 'phase2',
    alignment: 'mixed',
    position: 'Ships',
    data: data.phase2.mixed.ships
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Felucia"
    image-src="/images/map_view/felucia.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/felucia platoons.png"
    :missions="missions"
  />
</template>
