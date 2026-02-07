<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Ships', 
    points: '4,298 10,441 276,435 251,296',
    phase: 'phase4',
    alignment: 'ls',
    position: 'Ships',
    data: data.phase4.ls.ships
  },
  { 
    name: 'Generic', 
    points: '767,276 773,418 1063,422 1063,278',
    phase: 'phase4',
    alignment: 'ls',
    position: 'Generic',
    data: data.phase4.ls.generic
  },
  { 
    name: 'Jedi', 
    points: '403,661 395,794 658,789 637,679',
    phase: 'phase4',
    alignment: 'ls',
    position: 'Jedi',
    data: data.phase4.ls.jedi
  },
  { 
    name: 'Platoons', 
    points: '196,437 217,595 501,597 485,443',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Lothal"
    image-src="/images/map_view/lothal.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/lothal platoons.png"
    :missions="missions"
  />
</template>
