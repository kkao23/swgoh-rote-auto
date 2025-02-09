<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase2;

defineProps({
    data: Array<dataType>,
});
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Left`" :data="data.ls.left"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Zeffo Unlock`" :data="data.ls.zeffo"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Jedi`" :data="data.ls.jedi"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.ls.ships"></MissionTableFragment>
    </tr>
</template>