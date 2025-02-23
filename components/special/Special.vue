<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType } from '../../models/data'
const data = rawData.special.all;

defineProps({
    data: Array<dataType>,
});

const phase = 'Special Mission';
</script>

<template>
    <tr>
        <MissionTableFragment :data="data.qiraP1" :position="`Qira Young Han (P1 Mixed)`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :data="data.zeffo" :position="`Zeffo Unlock (P2 LS)`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :data="data.clones" :position="`Clones (Zeffo)`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :data="data.boKatan" :position="`Bo Katan (Krayt) (P3 Mixed)`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :data="data.merrin" :position="`Merrin (P3 DS)`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :data="data.saw" :position="`Saw (P3 LS)`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :data="data.inqs" :position="`Inquisitors (P4 DS)`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :data="data.qiraP4" :position="`Qira L3 (P4 Mixed)`"></MissionTableFragment>
    </tr>
</template>