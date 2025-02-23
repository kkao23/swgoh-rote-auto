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
        <MissionTableFragment :position="`Qira`" :data="data.mixed.qira" :phase="phase" :alignment="alignment" :special="true">
        </MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Combat`" :data="data.mixed.mixed" :phase="phase" :alignment="alignment">
        </MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Jabba`" :data="data.mixed.jabba" :phase="phase" :alignment="alignment">
        </MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Aphra`" :data="data.mixed.aphra" :phase="phase" :alignment="alignment">
        </MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.mixed.ships" :phase="phase" :alignment="alignment">
        </MissionTableFragment>
    </tr>
</template>