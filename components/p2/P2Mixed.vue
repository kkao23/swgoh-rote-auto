<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase2;

defineProps({
    data: Array<dataType>,
});

const phase = 'P2';
const alignment = 'Mixed';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Hondo`" :data="data.mixed.hondo" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Y Lando`" :data="data.mixed.youngLando" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Jabba`" :data="data.mixed.jabba" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Combat`" :data="data.mixed.combat" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.mixed.ships" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>