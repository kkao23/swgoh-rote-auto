<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase3;

defineProps({
    data: Array<dataType>,
});
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Jedi`" :data="data.zeffo.jedi"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Clones`" :data="data.zeffo.clones"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.zeffo.fleets"></MissionTableFragment>
    </tr>
</template>