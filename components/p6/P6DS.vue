<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase6;

defineProps({
    data: Array<dataType>,
});

const phase = 'P6';
const alignment = 'DS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Generic`" :data="data.ds.generic" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Iden`" :data="data.ds.iden" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Darth Vader`" :data="data.ds.darthVader" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleets`" :data="data.ds.fleets" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>