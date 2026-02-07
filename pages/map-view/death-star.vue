<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Iden', 
    points: '13,545 15,671 205,678 224,546',
    phase: 'phase6',
    alignment: 'ds',
    position: 'Iden',
    data: data.phase6.ds.iden
  },
  { 
    name: 'Generic', 
    points: '244,648 240,781 441,778 449,646',
    phase: 'phase6',
    alignment: 'ds',
    position: 'Generic',
    data: data.phase6.ds.generic
  },
  { 
    name: 'Generic', 
    points: '836,586 825,718 1076,714 1078,578',
    phase: 'phase6',
    alignment: 'ds',
    position: 'Generic',
    data: data.phase6.ds.generic
  },
  { 
    name: 'Platoons', 
    points: '75,334 96,491 338,475 295,329',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
  { 
    name: 'Darth Vader', 
    points: '754,269 742,406 967,396 965,285',
    phase: 'phase6',
    alignment: 'ds',
    position: 'Darth Vader',
    data: data.phase6.ds.darthVader
  },
  { 
    name: 'Fleets', 
    points: '984,267 971,408 1170,408 1184,277',
    phase: 'phase6',
    alignment: 'ds',
    position: 'Fleets',
    data: data.phase6.ds.fleets
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Death Star"
    image-src="/images/map_view/death star.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/death star platoons.png"
    :missions="missions"
  />
</template>
