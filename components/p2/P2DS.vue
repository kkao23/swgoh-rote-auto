<script setup lang="ts">
import { data as rawData } from '../../data/data';
import { type data as dataType} from '../../models/data'
const data = rawData.phase2;

defineProps({
    data: Array<dataType>,
});

const phase = 'P2';
const alignment = 'DS';
</script>

<template>
    <tr>
        <MissionTableFragment :position="`→ (Nexu)`" :data="data.ds.nexu" :phase="phase" :alignment="alignment" :helpUrl="`https://swgoh-rote.s3.us-east-2.amazonaws.com/swgoh_help/geonosis_right.jpg`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`↓ (Acklay)`" :data="data.ds.acklay" :phase="phase" :alignment="alignment" :helpUrl="`https://swgoh-rote.s3.us-east-2.amazonaws.com/swgoh_help/geonosis_bot.jpg`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`← (Reek)`" :data="data.ds.reek" :phase="phase" :alignment="alignment" :helpUrl="`https://swgoh-rote.s3.us-east-2.amazonaws.com/swgoh_help/geonosis_left.jpg`"></MissionTableFragment>
    </tr>
    <tr>
        <MissionTableFragment :position="`Fleet`" :data="data.ds.ships" :phase="phase" :alignment="alignment"></MissionTableFragment>
    </tr>
</template>