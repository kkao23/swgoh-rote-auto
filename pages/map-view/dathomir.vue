<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Merrin', 
    points: '6,597 6,730 282,736 280,587',
    phase: 'phase3',
    alignment: 'ds',
    position: 'Merrin',
    data: data.phase3.ds.merrin
  },
  { 
    name: 'Empire', 
    points: '324,592 318,766 681,762 683,594',
    phase: 'phase3',
    alignment: 'ds',
    position: 'Empire',
    data: data.phase3.ds.empire
  },
  { 
    name: 'Generic', 
    points: '610,375 595,523 879,533 890,385',
    phase: 'phase3',
    alignment: 'ds',
    position: 'Generic',
    data: data.phase3.ds.generic
  },
  { 
    name: 'Generic', 
    points: '946,467 902,629 1232,640 1251,469',
    phase: 'phase3',
    alignment: 'ds',
    position: 'Generic',
    data: data.phase3.ds.generic
  },
  { 
    name: 'Aphra', 
    points: '869,263 877,415 1182,416 1184,265',
    phase: 'phase3',
    alignment: 'ds',
    position: 'Aphra',
    data: data.phase3.ds.aphra
  },
  { 
    name: 'Platoons', 
    points: '370,251 374,416 606,412 623,260',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Dathomir"
    image-src="/images/map_view/dathomir.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/dathomir platoons.png"
    :missions="missions"
  />
</template>
