<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase4;

defineProps({
    data: Array<dataType>,
});

const phase = 'Mandalore';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Generic`" :data="data.mandalore.generic" :phase="phase"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.mandalore.fleets" :phase="phase"></MissionTableFragment>
    </tr>
</template>