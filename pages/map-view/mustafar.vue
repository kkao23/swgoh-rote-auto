<script setup lang="ts">
import { data } from '~/data/data'
import type { MissionRegion } from '~/models/data'

const missions: MissionRegion[] = [
  { 
    name: 'Ships', 
    points: '1047,186 1242,185 1241,284 1053,283',
    phase: 'phase1',
    alignment: 'ds',
    position: 'Ships',
    data: data.phase1.ds.ships
  },
  { 
    name: 'Top', 
    points: '697,229 874,228 879,338 718,335',
    phase: 'phase1',
    alignment: 'ds',
    position: 'Top (Geos)',
    data: data.phase1.ds.top
  },
  { 
    name: 'Bottom', 
    points: '903,427 1108,423 1114,540 934,536',
    phase: 'phase1',
    alignment: 'ds',
    position: 'Bottom (Wat)',
    data: data.phase1.ds.bottom
  },
  { 
    name: 'Platoons', 
    points: '686,508 946,501 943,636 697,641',
    phase: '',
    alignment: '',
    position: 'platoons',
    data: []
  },
  { 
    name: 'Left', 
    points: '65,441 311,437 311,578 79,578',
    phase: 'phase1',
    alignment: 'ds',
    position: 'Left (Nute)',
    data: data.phase1.ds.left
  },
  { 
    name: 'LV', 
    points: '265,202 457,200 462,303 291,304',
    phase: 'phase1',
    alignment: 'ds',
    position: 'LV',
    data: data.phase1.ds.lv
  },
]
</script>

<template>
  <PlanetMap
    planet-name="Mustafar"
    image-src="/images/map_view/mustafar.png"
    :image-width="1362"
    :image-height="802"
    platoons-src="/images/map_view/mustafar platoons.png"
    :missions="missions"
  />
</template>

