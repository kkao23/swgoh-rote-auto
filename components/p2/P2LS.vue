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
        <MissionTableFragment :position="`Left`" :data="data.ls.left" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Right`" :data="data.ls.right" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Zeffo 🔓`" :data="data.ls.zeffo" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Jedi`" :data="data.ls.jedi" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.ls.ships" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>