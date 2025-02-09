<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase2;

defineProps({
    data: Array<dataType>,
});
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Hondo`" :data="data.mixed.hondo"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Young Lando`" :data="data.mixed.youngLando"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Jabba`" :data="data.mixed.jabba"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Combat`" :data="data.mixed.combat"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.mixed.ships"></MissionTableFragment>
    </tr>
</template>