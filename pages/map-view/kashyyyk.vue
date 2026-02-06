<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Wookies', 
    points: '81,244 81,375 338,378 372,246',
    phase: 'phase3',
    alignment: 'ls',
    position: 'Wookies',
    data: data.phase3.ls.wookies
  },
  { 
    name: 'Saw', 
    points: '119,418 107,567 378,569 395,428',
    phase: 'phase3',
    alignment: 'ls',
    position: 'Saw',
    data: data.phase3.ls.saw
  },
  { 
    name: 'Left', 
    points: '13,579 13,725 234,734 249,586',
    phase: 'phase3',
    alignment: 'ls',
    position: 'Left',
    data: data.phase3.ls.left
  },
  { 
    name: 'Right', 
    points: '746,415 744,265 1015,265 1022,421',
    phase: 'phase3',
    alignment: 'ls',
    position: 'Right',
    data: data.phase3.ls.right
  },
  { 
    name: 'Platoons', 
    points: '255,627 232,767 539,780 568,633',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
  { 
    name: 'Ships', 
    points: '925,615 896,765 1228,773 1249,619',
    phase: 'phase3',
    alignment: 'ls',
    position: 'Ships',
    data: data.phase3.ls.ships
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Kashyyyk"
    image-src="/images/map_view/kashyyyk.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/kashyyyk platoons.png"
    :missions="missions"
  />
</template>
