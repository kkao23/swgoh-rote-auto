<script setup lang="ts">

import P1DS from '../components/p1/P1DS.vue';
import P1LS from '../components/p1/P1LS.vue';
import P1Mixed from '../components/p1/P1Mixed.vue';
import P2DS from '../components/p2/P2DS.vue';
import P2LS from '../components/p2/P2LS.vue';
import P2Mixed from '../components/p2/P2Mixed.vue';
import P3DS from '../components/p3/P3DS.vue';
import P3LS from '../components/p3/P3LS.vue';
import P3Mixed from '../components/p3/P3Mixed.vue';
import P4DS from '../components/p4/P4DS.vue';
import P4LS from '../components/p4/P4LS.vue';
import P4Mixed from '../components/p4/P4Mixed.vue';
import P5Mixed from '../components/p5/P5Mixed.vue';
import Zeffo from '../components/zeffo/Zeffo.vue';
import Mandalore from '../components/mandalore/Mandalore.vue';

const modalStore = useModalStore();
const phases = [
    {
        label: 'Phase 1',
        slot: 'phase-1-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
    {
        label: 'Phase 2',
        slot: 'phase-2-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
    {
        label: 'Phase 3',
        slot: 'phase-3-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
    {
        label: 'Phase 4',
        slot: 'phase-4-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
    {
        label: 'Phase 5',
        slot: 'phase-5-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    }, {
        label: 'Zeffo',
        slot: 'zeffo-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
    {
        label: 'Mandalore',
        slot: 'mandalore-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
];
</script>

<template>
    <div class="flex-1 bg-color">
        <UContainer>
                <UAccordion :items="phases" color="primary">
                    <template #phase-1-slot>
                        <PhaseWrapper phase-number="1" :ds-component="P1DS" :ls-component="P1LS"
                            :mixed-component="P1Mixed">
                        </PhaseWrapper>
                    </template>
                    <template #phase-2-slot>
                        <PhaseWrapper phase-number="2" :ds-component="P2DS" :ls-component="P2LS"
                            :mixed-component="P2Mixed">
                        </PhaseWrapper>
                    </template>
                    <template #phase-3-slot>
                        <PhaseWrapper phase-number="3" :ds-component="P3DS" :ls-component="P3LS"
                            :mixed-component="P3Mixed">
                        </PhaseWrapper>
                    </template>
                    <template #phase-4-slot>
                        <PhaseWrapper phase-number="4" :ds-component="P4DS" :ls-component="P4LS"
                            :mixed-component="P4Mixed">
                        </PhaseWrapper>
                    </template>
                    <template #phase-5-slot>
                        <PhaseWrapper phase-number="5" :mixed-component="P5Mixed"></PhaseWrapper>
                    </template>
                    <template #zeffo-slot>
                        <PhaseWrapper phase-number="Zeffo" :ls-component="Zeffo"></PhaseWrapper>
                    </template>
                    <template #mandalore-slot>
                        <PhaseWrapper phase-number="Mandalore" :mixed-component="Mandalore"></PhaseWrapper>
                    </template>
                </UAccordion>
        </UContainer>
    </div>
</template>

<style>
.bg-color {
    background-color: #0D0D2B;
}
</style>