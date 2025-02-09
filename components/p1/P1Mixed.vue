<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.phase1;

defineProps({
    data: Array<dataType>,
});

const phase = 'P1';
const alignment = 'Mixed';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`Qira`" :data="data.mixed.qira" :phase="phase" :alignment="alignment">
        </MissionTableFragment>
    </tr>
</template>