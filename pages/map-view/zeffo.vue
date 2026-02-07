<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Platoons', 
    points: '554,283 549,442 788,449 804,287',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
  { 
    name: 'UFU', 
    points: '806,317 796,466 1082,482 1095,323',
    phase: 'phase3',
    alignment: 'zeffo',
    position: 'UFU',
    data: data.phase3.zeffo.ufu
  },
  { 
    name: 'Combat', 
    points: '614,490 652,636 871,640 959,495',
    phase: 'phase3',
    alignment: 'zeffo',
    position: 'Combat',
    data: data.phase3.zeffo.combat
  },
  { 
    name: 'Fleets', 
    points: '861,628 844,772 1141,772 1151,624',
    phase: 'phase3',
    alignment: 'zeffo',
    position: 'Fleets',
    data: data.phase3.zeffo.fleets
  },
  { 
    name: 'Jedi', 
    points: '336,630 322,776 618,780 629,625',
    phase: 'phase3',
    alignment: 'zeffo',
    position: 'Jedi',
    data: data.phase3.zeffo.jedi
  },
  { 
    name: 'Clones', 
    points: '92,497 79,653 320,655 363,502',
    phase: 'phase3',
    alignment: 'zeffo',
    position: 'Clones',
    data: data.phase3.zeffo.clones
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Zeffo"
    image-src="/images/map_view/zeffo.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/zeffo platoons.png"
    :missions="missions"
  />
</template>
