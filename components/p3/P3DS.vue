<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType} from '../../models/data'
const data = rawData.phase3;

defineProps({
    data: Array<dataType>,
});

const phase = 'P3';
const alignment = 'DS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Mid`" :data="data.ds.mid" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Right`" :data="data.ds.right" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Empire`" :data="data.ds.empire" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Dr Aphra`" :data="data.ds.aphra" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Merrin`" :data="data.ds.merrin" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>