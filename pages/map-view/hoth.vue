<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Generic', 
    points: '188,657 188,783 445,779 451,650',
    phase: 'phase6',
    alignment: 'mixed',
    position: 'Generic',
    data: data.phase6.mixed.generic
  },
  { 
    name: 'Generic', 
    points: '677,297 696,428 909,418 919,297',
    phase: 'phase6',
    alignment: 'mixed',
    position: 'Generic',
    data: data.phase6.mixed.generic
  },
  { 
    name: 'Jabba', 
    points: '146,333 123,472 378,472 399,331',
    phase: 'phase6',
    alignment: 'mixed',
    position: 'Jabba',
    data: data.phase6.mixed.jabba
  },
  { 
    name: 'Ships', 
    points: '1072,215 1065,331 1278,335 1297,218',
    phase: 'phase6',
    alignment: 'mixed',
    position: 'Ships',
    data: data.phase6.mixed.ships
  },
  { 
    name: 'Aphra', 
    points: '959,445 938,571 1191,583 1220,457',
    phase: 'phase6',
    alignment: 'mixed',
    position: 'Aphra',
    data: data.phase6.mixed.aphra
  },
  { 
    name: 'Platoons', 
    points: '788,635 779,775 1065,768 1051,639',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Hoth"
    image-src="/images/map_view/hoth.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/hoth platoons.png"
    :missions="missions"
  />
</template>
