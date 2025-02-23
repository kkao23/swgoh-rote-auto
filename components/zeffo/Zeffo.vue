<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase3;

defineProps({
    data: Array<dataType>,
});

const phase = 'Zeffo';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Jedi`" :data="data.zeffo.jedi" :phase="phase"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Clones`" :data="data.zeffo.clones" :phase="phase" :special="true"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`UFU`" :data="data.zeffo.ufu" :phase="phase"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.zeffo.fleets" :phase="phase"></MissionTableFragment>
    </tr>
</template>