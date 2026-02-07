<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Zeffo', 
    points: '414,561 393,727 597,738 620,573',
    phase: 'phase2',
    alignment: 'ls',
    position: 'Zeffo',
    data: data.phase2.ls.zeffo
  },
  { 
    name: 'Left', 
    points: '395,317 380,480 614,480 633,314',
    phase: 'phase2',
    alignment: 'ls',
    position: 'Left',
    data: data.phase2.ls.left
  },
  { 
    name: 'Right', 
    points: '940,373 896,538 1101,558 1149,381',
    phase: 'phase2',
    alignment: 'ls',
    position: 'Right',
    data: data.phase2.ls.right
  },
  { 
    name: 'Platoons', 
    points: '815,592 788,755 1009,764 1044,604',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
  { 
    name: 'Ships', 
    points: '1132,403 1138,575 1335,583 1335,410',
    phase: 'phase2',
    alignment: 'ls',
    position: 'Ships',
    data: data.phase2.ls.ships
  },
  { 
    name: 'Jedi', 
    points: '758,288 767,445 923,452 971,292',
    phase: 'phase2',
    alignment: 'ls',
    position: 'Jedi',
    data: data.phase2.ls.jedi
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Bracca"
    image-src="/images/map_view/bracca.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/bracca platoons.png"
    :missions="missions"
  />
</template>
