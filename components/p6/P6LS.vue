<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase6;

defineProps({
    data: Array<dataType>,
});

const phase = 'P6';
const alignment = 'LS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Generic`" :data="data.ls.generic" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Baze`" :data="data.ls.baze" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Cassian`" :data="data.ls.cassian" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Ships`" :data="data.ls.ships" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>