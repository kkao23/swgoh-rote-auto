<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase5;

defineProps({
    data: Array<dataType>,
});

const phase = 'P5';
const alignment = 'DS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Bottom Right`" :data="data.ds.bottomRight" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>