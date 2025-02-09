<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType} from '../../models/data'
const data = rawData.phase1;

defineProps({
    data: Array<dataType>,
});
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Left`" :data="data.ds.left"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Bottom`" :data="data.ds.bottom"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Top`" :data="data.ds.top"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`LV`" :data="data.ds.lv"></MissionTableFragment>
    </tr>
</template>