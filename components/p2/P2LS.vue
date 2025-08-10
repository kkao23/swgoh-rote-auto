<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase2;

defineProps({
    data: Array<dataType>,
});

const phase = 'P2';
const alignment = 'LS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Left (CH)`" :data="data.ls.left" :phase="phase" :alignment="alignment" :helpUrl="`https://swgoh-rote.s3.us-east-2.amazonaws.com/swgoh_help/bracca_left.jpg`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Right (2S)`" :data="data.ls.right" :phase="phase" :alignment="alignment" :helpUrl="`https://swgoh-rote.s3.us-east-2.amazonaws.com/swgoh_help/bracca_right.jpg`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Zeffo`" :data="data.ls.zeffo" :phase="phase" :alignment="alignment" :special="true" :unlock="true"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Jedi`" :data="data.ls.jedi" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.ls.ships" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>