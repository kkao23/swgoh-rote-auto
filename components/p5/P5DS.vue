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
        <MissionTableFragment :position="`Top Mid`" :data="data.ds.bottomRight" :phase="phase" :alignment="alignment"
        :helpUrl="`https://swgoh-rote.s3.us-east-2.amazonaws.com/swgoh_help/malachor_top.png`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Right`" :data="data.ds.bottomRight" :phase="phase" :alignment="alignment"
        :helpUrl="`https://swgoh-rote.s3.us-east-2.amazonaws.com/swgoh_help/malachor_right.png`"></MissionTableFragment>
    </tr>
</template>