<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Reek', 
    points: '58,476 54,630 347,623 353,475',
    phase: 'phase2',
    alignment: 'ds',
    position: 'Reek',
    data: data.phase2.ds.reek
  },
  { 
    name: 'Acklay', 
    points: '334,609 347,763 643,761 650,606',
    phase: 'phase2',
    alignment: 'ds',
    position: 'Acklay',
    data: data.phase2.ds.acklay
  },
  { 
    name: 'Nexu', 
    points: '808,283 802,432 1095,442 1109,295',
    phase: 'phase2',
    alignment: 'ds',
    position: 'Nexu',
    data: data.phase2.ds.nexu
  },
  { 
    name: 'Platoons', 
    points: '503,243 499,401 792,396 802,250',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
  { 
    name: 'Ships', 
    points: '785,627 781,776 1124,776 1103,626',
    phase: 'phase2',
    alignment: 'ds',
    position: 'Ships',
    data: data.phase2.ds.ships
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Geonosis"
    image-src="/images/map_view/geonosis.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/geonosis platoons.png"
    :missions="missions"
  />
</template>
