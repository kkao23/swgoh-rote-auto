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
        <MissionTableFragment :position="`Top Left`" :data="data.ls.topLeft" :phase="phase" :alignment="alignment"
            :helpUrl="`https://swgoh-rote.s3.us-east-2.amazonaws.com/swgoh_help/kafrene_left.png`">
        </MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Top Mid`" :data="data.ls.topMid" :phase="phase" :alignment="alignment"
            :helpUrl="`https://swgoh-rote.s3.us-east-2.amazonaws.com/swgoh_help/kafrene_top.png`">
        </MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Bottom`" :data="data.ls.bottom" :phase="phase" :alignment="alignment"
            :helpUrl="`https://swgoh-rote.s3.us-east-2.amazonaws.com/swgoh_help/kafrene_bottom.png`">
        </MissionTableFragment>
    </tr>
</template>