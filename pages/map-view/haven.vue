<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Sortie', 
    points: '29,374 25,519 303,520 288,369',
    phase: 'phase4',
    alignment: 'ds',
    position: 'Sortie',
    data: data.phase4.ds.sortie
  },
  { 
    name: 'Mid Right', 
    points: '322,333 315,484 606,491 593,326',
    phase: 'phase4',
    alignment: 'ds',
    position: 'Mid Right',
    data: data.phase4.ds.midRight
  },
  { 
    name: 'Mid Right', 
    points: '840,288 836,424 1038,419 1063,287',
    phase: 'phase4',
    alignment: 'ds',
    position: 'Mid Right',
    data: data.phase4.ds.midRight
  },
  { 
    name: 'Mid Right', 
    points: '739,529 731,663 976,662 988,524',
    phase: 'phase4',
    alignment: 'ds',
    position: 'Mid Right',
    data: data.phase4.ds.midRight
  },
  { 
    name: 'Inquisitors', 
    points: '234,563 211,709 466,722 510,571',
    phase: 'phase4',
    alignment: 'ds',
    position: 'Inquisitors',
    data: data.phase4.ds.inqs
  },
  { 
    name: 'Platoons', 
    points: '1044,374 1017,531 1266,538 1283,384',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Haven"
    image-src="/images/map_view/haven.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/haven platoons.png"
    :missions="missions"
  />
</template>
