<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase5;

defineProps({
    data: Array<dataType>,
});

const phase = 'P5';
const alignment = 'LS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Combat`" :data="data.ls.generic" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>