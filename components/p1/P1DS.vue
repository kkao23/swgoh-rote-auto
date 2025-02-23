<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType} from '../../models/data'
const data = rawData.phase1;

defineProps({
    data: Array<dataType>,
});

const phase = 'P1';
const alignment = 'DS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Left (Nute)`" :data="data.ds.left" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Bot (Wat)`" :data="data.ds.bottom" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Top (Geo)`" :data="data.ds.top" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`LV`" :data="data.ds.lv" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>