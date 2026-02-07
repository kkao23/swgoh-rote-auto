<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Left', 
    points: '42,533 27,688 274,692 282,543',
    phase: 'phase5',
    alignment: 'ds',
    position: 'Left',
    data: data.phase5.ds.left
  },
  { 
    name: 'Top Mid', 
    points: '173,330 180,465 409,473 430,330',
    phase: 'phase5',
    alignment: 'ds',
    position: 'Top Mid',
    data: data.phase5.ds.topMid
  },
  { 
    name: 'Bottom Right', 
    points: '923,428 896,568 1180,569 1174,445',
    phase: 'phase5',
    alignment: 'ds',
    position: 'Bottom Right',
    data: data.phase5.ds.bottomRight
  },
  { 
    name: 'Platoons', 
    points: '547,273 539,444 846,447 869,280',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Malachor"
    image-src="/images/map_view/malachor.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/malachor platoons.png"
    :missions="missions"
  />
</template>
