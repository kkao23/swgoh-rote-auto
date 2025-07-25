<script setup lang="ts">
const toast = useToast();

const showTestToast = () => {
    console.log('Test toast button clicked');
    try {
  toast.add({ title: 'This is a test toast from the home page!' });
    } catch (error) {
        console.error('Error showing toast:', error);
    }
};
</script>

<template>
    <div class="flex-1 bg-color">
        <UContainer>
            <PhasesAccordion></PhasesAccordion>
        </UContainer>
    </div>
</template>

<style>
.bg-color {
    background-color: #0D0D2B;
}
</style>
