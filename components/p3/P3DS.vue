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
        <MissionTableFragment :position="`Combat`" :data="data.ds.generic" :phase="phase" :alignment="alignment" :helpUrl="`https://swgoh-rote.s3.us-east-2.amazonaws.com/swgoh_help/dathomir_generic.jpg`"></MissionTableFragment>
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