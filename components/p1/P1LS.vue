<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase1;

defineProps({
    data: Array<dataType>,
});
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Left`" :data="data.ls.left"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Middle`" :data="data.ls.middle"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Mace/Kit`" :data="data.ls.maceKitP1"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Jedi`" :data="data.ls.jediP1"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.ls.ships"></MissionTableFragment>
    </tr>
</template>