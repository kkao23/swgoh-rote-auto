<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType} from '../../models/data'
const data = rawData.phase3;

defineProps({
    data: Array<dataType>,
});
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Empire`" :data="data.ds.empire"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Dr Aphra`" :data="data.ds.aphra"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Merrin`" :data="data.ds.merrin"></MissionTableFragment>
    </tr>
</template>