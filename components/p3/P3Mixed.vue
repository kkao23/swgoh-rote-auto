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
        <MissionTableFragment :position="`Bo Katan (Krayt)`" :data="data.mixed.boKatan" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Reva Unlock`" :data="data.mixed.reva" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>