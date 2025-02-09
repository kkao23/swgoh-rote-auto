<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType} from '../../models/data'
const data = rawData.phase4;

defineProps({
    data: Array<dataType>,
});

const phase = 'P4';
const alignment = 'DS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Inquisitors`" :data="data.ds.inqs" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Right`" :data="data.ds.right" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>