<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Fleets', 
    points: '825,594 825,739 1105,743 1097,585',
    phase: 'phase4',
    alignment: 'mandalore',
    position: 'Fleets',
    data: data.phase4.mandalore.fleets
  },
  { 
    name: 'DTMG', 
    points: '572,452 566,609 833,613 856,451',
    phase: 'phase4',
    alignment: 'mandalore',
    position: 'DTMG',
    data: data.phase4.mandalore.dtmg
  },
  { 
    name: 'Generic', 
    points: '788,263 752,419 980,421 1013,274',
    phase: 'phase4',
    alignment: 'mandalore',
    position: 'Generic',
    data: data.phase4.mandalore.generic
  },
  { 
    name: 'Platoons', 
    points: '489,230 462,375 746,375 760,232',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Mandalore"
    image-src="/images/map_view/mandalore.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/mandalore platoons.png"
    :missions="missions"
  />
</template>
