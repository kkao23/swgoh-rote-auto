<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase1;

defineProps({
    data: Array<dataType>,
});

const phase = 'P1';
const alignment = 'LS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Combat`" :data="data.ls.generic" :phase="phase" :alignment="alignment" :helpUrl="`https://swgoh-rote.s3.us-east-2.amazonaws.com/swgoh_help/coruscant_generic.jpg`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Mace/Kit`" :data="data.ls.maceKitP1" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Jedi`" :data="data.ls.jediP1" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.ls.ships" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>