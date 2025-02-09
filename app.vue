<script setup lang="ts">

import P1DS from './components/p1/P1DS.vue';
import P1LS from './components/p1/P1LS.vue';
import P1Mixed from './components/p1/P1Mixed.vue';
import P2DS from './components/p2/P2DS.vue';
import P2LS from './components/p2/P2LS.vue';
import P2Mixed from './components/p2/P2Mixed.vue';
import P3DS from './components/p3/P3DS.vue';
import P3LS from './components/p3/P3LS.vue';
import P3Mixed from './components/p3/P3Mixed.vue';
import P4DS from './components/p4/P4DS.vue';
import P4LS from './components/p4/P4LS.vue';
import P4Mixed from './components/p4/P4Mixed.vue';
import P5Mixed from './components/p5/P5Mixed.vue';
import Zeffo from './components/zeffo/Zeffo.vue';
import Mandalore from './components/mandalore/Mandalore.vue';

</script>

<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1>Welcome to SWGOH RoTE Auto Guide</h1>
          <ColorScheme>
            <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
          </ColorScheme>
        </div>
      </template>
      <!-- <UButton icon="i-heroicons-book-open" to="https://ui.nuxt.com" target="_blank">Open Nuxt UI Documentation
      </UButton>
      <SampleButton /> -->
    </UCard>
    <div class="w-full overflow-x-auto">
      <table class="w-full border-collapse border border-gray-300">
        <tbody>
          <tr class="border-b border-gray-300">
            <th>Phase</th>
          </tr>
          <tr class="border-b border-gray-300">
            <PhaseWrapper phase-number="1" :ds-component="P1DS" :ls-component="P1LS" :mixed-component="P1Mixed">
            </PhaseWrapper>
          </tr>
          <tr class="border-b border-gray-300">
            <PhaseWrapper phase-number="2" :ds-component="P2DS" :ls-component="P2LS" :mixed-component="P2Mixed">
            </PhaseWrapper>
          </tr>
          <tr class="border-b border-gray-300">
            <PhaseWrapper phase-number="3" :ds-component="P3DS" :ls-component="P3LS" :mixed-component="P3Mixed">
            </PhaseWrapper>
          </tr>
          <tr class="border-b border-gray-300">
            <PhaseWrapper phase-number="4" :ds-component="P4DS" :ls-component="P4LS" :mixed-component="P4Mixed">
            </PhaseWrapper>
          </tr>
          <tr class="border-b border-gray-300">
            <PhaseWrapper phase-number="5" :mixed-component="P5Mixed"></PhaseWrapper>
          </tr>
          <tr class="border-b border-gray-300">
            <PhaseWrapper phase-number="Zeffo" :ls-component="Zeffo"></PhaseWrapper>
          </tr>
          <tr class="border-b border-gray-300">
            <PhaseWrapper phase-number="Mandalore" :mixed-component="Mandalore"></PhaseWrapper>
          </tr>
        </tbody>
      </table>
    </div>
  </UContainer>
</template>
