<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Top Left', 
    points: '27,371 19,505 255,507 265,368',
    phase: 'phase5',
    alignment: 'ls',
    position: 'Top Left',
    data: data.phase5.ls.topLeft
  },
  { 
    name: 'Top Mid', 
    points: '127,233 119,353 361,357 366,237',
    phase: 'phase5',
    alignment: 'ls',
    position: 'Top Mid',
    data: data.phase5.ls.topMid
  },
  { 
    name: 'Bottom', 
    points: '616,602 639,715 886,731 865,602',
    phase: 'phase5',
    alignment: 'ls',
    position: 'Bottom',
    data: data.phase5.ls.bottom
  },
  { 
    name: 'Ships', 
    points: '802,318 783,444 1030,450 1059,319',
    phase: 'phase5',
    alignment: 'ls',
    position: 'Ships',
    data: data.phase5.ls.ships
  },
  { 
    name: 'Platoons', 
    points: '280,622 278,763 570,764 554,624',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Kafrene"
    image-src="/images/map_view/kafrene.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/kafrene platoons.png"
    :missions="missions"
  />
</template>
