<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase3;

defineProps({
    data: Array<dataType>,
});

const phase = 'P3';
const alignment = 'LS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Saw`" :data="data.ls.saw" :phase="phase" :alignment="alignment" :special="true"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Left`" :data="data.ls.left" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Right (Mara)`" :data="data.ls.right" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Wookies`" :data="data.ls.wookies" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>