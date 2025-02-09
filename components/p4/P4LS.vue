<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase4;

defineProps({
    data: Array<dataType>,
});

const phase = 'P4';
const alignment = 'LS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Generic`" :data="data.ls.generic" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.ls.ships" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>