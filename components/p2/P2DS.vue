<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType} from '../../models/data'
const data = rawData.phase2;

defineProps({
    data: Array<dataType>,
});

const phase = 'P2';
const alignment = 'DS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Right`" :data="data.ds.nexu" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Bottom`" :data="data.ds.acklay" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Left`" :data="data.ds.reek" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>