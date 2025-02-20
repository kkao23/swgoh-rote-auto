<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase3;

defineProps({
    data: Array<dataType>,
});

const phase = 'P3';
const alignment = 'Mixed';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`BK (Krayt)`" :data="data.mixed.boKatan" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Reva 🔓`" :data="data.mixed.reva" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Top Left`" :data="data.mixed.topLeft" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fennec`" :data="data.mixed.fennec" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Jabba`" :data="data.mixed.jabba" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Ships`" :data="data.mixed.fleet" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>