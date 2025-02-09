<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType} from '../../models/data'
const data = rawData.phase2;

defineProps({
    data: Array<dataType>,
});
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Right`" :data="data.ds.nexu"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Bottom`" :data="data.ds.acklay"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Left`" :data="data.ds.reek"></MissionTableFragment>
    </tr>
</template>