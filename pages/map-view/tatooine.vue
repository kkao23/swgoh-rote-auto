<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Fennec', 
    points: '351,532 347,695 556,699 568,534',
    phase: 'phase3',
    alignment: 'mixed',
    position: 'Fennec',
    data: data.phase3.mixed.fennec
  },
  { 
    name: 'Bo-Katan', 
    points: '560,609 545,757 748,759 756,614',
    phase: 'phase3',
    alignment: 'mixed',
    position: 'Bo-Katan',
    data: data.phase3.mixed.boKatan
  },
  { 
    name: 'Reva', 
    points: '792,589 785,734 986,739 996,580',
    phase: 'phase3',
    alignment: 'mixed',
    position: 'Reva',
    data: data.phase3.mixed.reva
  },
  { 
    name: 'Platoons', 
    points: '884,395 888,540 1080,547 1095,404',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
  { 
    name: 'Fleet', 
    points: '1036,590 1026,745 1232,745 1230,599',
    phase: 'phase3',
    alignment: 'mixed',
    position: 'Fleet',
    data: data.phase3.mixed.fleet
  },
  { 
    name: 'Jabba', 
    points: '712,277 696,409 894,439 930,283',
    phase: 'phase3',
    alignment: 'mixed',
    position: 'Jabba',
    data: data.phase3.mixed.jabba
  },
  { 
    name: 'Top Left', 
    points: '422,258 420,420 637,420 654,270',
    phase: 'phase3',
    alignment: 'mixed',
    position: 'Top Left',
    data: data.phase3.mixed.topLeft
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Tatooine"
    image-src="/images/map_view/tatooine.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/tatooine platoons.png"
    :missions="missions"
  />
</template>
