<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase6;

defineProps({
    data: Array<dataType>,
});

const phase = 'P6';
const alignment = 'Mixed';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Top Mid (Wampa)`" :data="data.mixed.wampa" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Bottom Left`" :data="data.mixed.bottomLeft" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Jabba`" :data="data.mixed.jabba" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Aphra`" :data="data.mixed.aphra" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.mixed.ships" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>