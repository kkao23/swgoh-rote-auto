<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
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
import P5LS from '../components/p5/P5LS.vue';
import P5Mixed from '../components/p5/P5Mixed.vue';
import Zeffo from '../components/zeffo/Zeffo.vue';
import Mandalore from '../components/mandalore/Mandalore.vue';
import SpecialMissions from '../components/special/Special.vue';

const isMobile = useMediaQuery('(max-width: 768px)')
const modalStore = useModalStore();

const phases = [
    {
        label: 'Phase 1 (R5)',
        slot: 'phase-1-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
    {
        label: 'Phase 2 (R6)',
        slot: 'phase-2-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
    {
        label: 'Phase 3 (R7)',
        slot: 'phase-3-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
    {
        label: 'Phase 4 (R8)',
        slot: 'phase-4-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
    {
        label: 'Phase 5 (R9)',
        slot: 'phase-5-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    }, {
        label: 'Zeffo (R7)',
        slot: 'zeffo-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
    {
        label: 'Mandalore (R8)',
        slot: 'mandalore-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
    {
        label: 'Special Missions',
        slot: 'sm-slot', // Define a slot name
        disabled: modalStore.isModalOpen,
    },
];
</script>

<template>
    <UAccordion class="acc" :items="phases" :size="isMobile ? 'sm' : 'xl'">
        <template #phase-1-slot>
            <PhaseWrapper phase-number="1" :ds-component="P1DS" :ls-component="P1LS" :mixed-component="P1Mixed" 
                :ls-planet-name="'Coruscant'" :ds-planet-name="'Mustafar'" :mixed-planet-name="'Corellia'">
            </PhaseWrapper>
        </template>
        <template #phase-2-slot>
            <PhaseWrapper phase-number="2" :ds-component="P2DS" :ls-component="P2LS" :mixed-component="P2Mixed"
                :ls-planet-name="'Bracca'" :ds-planet-name="'Geonosis'" :mixed-planet-name="'Felucia'">
            </PhaseWrapper>
        </template>
        <template #phase-3-slot>
            <PhaseWrapper phase-number="3" :ds-component="P3DS" :ls-component="P3LS" :mixed-component="P3Mixed"
                :ls-planet-name="'Kashyyyk'" :ds-planet-name="'Dathomir'" :mixed-planet-name="'Tatooine'">
            </PhaseWrapper>
        </template>
        <template #phase-4-slot>
            <PhaseWrapper phase-number="4" :ds-component="P4DS" :ls-component="P4LS" :mixed-component="P4Mixed"
                :ls-planet-name="'Lothal'" :ds-planet-name="'Haven'" :mixed-planet-name="'Kessel'">
            </PhaseWrapper>
        </template>
        <template #phase-5-slot>
            <PhaseWrapper phase-number="5" :ls-component="P5LS" :mixed-component="P5Mixed"
                :ls-planet-name="'Kafrene'" :ds-planet-name="'Malachor'" :mixed-planet-name="'Vandor'">
            </PhaseWrapper>
        </template>
        <template #phase-6-slot>
            <PhaseWrapper phase-number="6"
                :ls-planet-name="'Scarif'" :ds-planet-name="'Death Star'" :mixed-planet-name="'Hoth'">
            </PhaseWrapper>
        </template>
        <template #zeffo-slot>
            <PhaseWrapper phase-number="Zeffo" :ls-component="Zeffo"></PhaseWrapper>
        </template>
        <template #mandalore-slot>
            <PhaseWrapper phase-number="Mandalore" :mixed-component="Mandalore"></PhaseWrapper>
        </template>
        <template #sm-slot>
            <PhaseWrapper phase-number="Special Missions" :special-component="SpecialMissions"></PhaseWrapper>
        </template>
    </UAccordion>
</template>

<style scoped>
/* :deep(button) {
    background-color: #24244D !important;
    color: #EAF4FC !important;
} */
</style>