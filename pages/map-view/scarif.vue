<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Ships', 
    points: '773,266 754,384 967,390 990,271',
    phase: 'phase6',
    alignment: 'ls',
    position: 'Ships',
    data: data.phase6.ls.ships
  },
  { 
    name: 'Platoons', 
    points: '800,602 794,719 1040,716 1051,600',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
  { 
    name: 'Generic', 
    points: '633,513 641,623 792,625 840,516',
    phase: 'phase6',
    alignment: 'ls',
    position: 'Generic',
    data: data.phase6.ls.generic
  },
  { 
    name: 'Generic', 
    points: '19,643 23,761 259,765 228,642',
    phase: 'phase6',
    alignment: 'ls',
    position: 'Generic',
    data: data.phase6.ls.generic
  },
  { 
    name: 'Baze', 
    points: '27,347 19,485 276,487 267,348',
    phase: 'phase6',
    alignment: 'ls',
    position: 'Baze',
    data: data.phase6.ls.baze
  },
  { 
    name: 'Cassian', 
    points: '361,287 361,407 604,411 631,293',
    phase: 'phase6',
    alignment: 'ls',
    position: 'Cassian',
    data: data.phase6.ls.cassian
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Scarif"
    image-src="/images/map_view/scarif.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/scarif platoons.png"
    :missions="missions"
  />
</template>
