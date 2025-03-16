<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase5;

defineProps({
    data: Array<dataType>,
});

const phase = 'P5';
const alignment = 'Mixed';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Combat`" :data="data.mixed.generic" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Jabba`" :data="data.mixed.jabba" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.mixed.fleet" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>