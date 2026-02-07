<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Qira', 
    points: '671,597 657,765 870,770 882,591',
    phase: 'phase1',
    alignment: 'mixed',
    position: 'Qira',
    data: data.phase1.mixed.qira
  },
  { 
    name: 'Ships', 
    points: '1063,645 1053,771 1230,775 1247,645',
    phase: 'phase1',
    alignment: 'mixed',
    position: 'Ships',
    data: data.phase1.mixed.ships
  },
  { 
    name: 'Mixed', 
    points: '892,392 886,552 1061,557 1067,392',
    phase: 'phase1',
    alignment: 'mixed',
    position: 'Mixed',
    data: data.phase1.mixed.mixed
  },
  { 
    name: 'Platoons', 
    points: '453,479 441,657 683,658 681,483',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
  { 
    name: 'Aphra', 
    points: '1032,214 1007,339 1168,358 1178,225',
    phase: 'phase1',
    alignment: 'mixed',
    position: 'Aphra',
    data: data.phase1.mixed.aphra
  },
  { 
    name: 'Jabba', 
    points: '1090,400 1095,552 1310,549 1289,390',
    phase: 'phase1',
    alignment: 'mixed',
    position: 'Jabba',
    data: data.phase1.mixed.jabba
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Corellia"
    image-src="/images/map_view/corellia.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/corellia platoons.png"
    :missions="missions"
  />
</template>
