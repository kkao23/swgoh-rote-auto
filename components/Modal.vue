<template>
    <div v-if="isOpen" class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 p-4">
      <div 
        class="bg-white p-6 rounded shadow-lg w-[90%] max-w-lg max-h-[90vh] overflow-auto"
      >
        <slot></slot> <!-- Content of the modal -->
        <button 
          @click="closeModal" 
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full sm:w-auto"
        >
          Close
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
    import { useModalStore } from '~/stores/modal';

    const modalStore = useModalStore();
    const globalToggleModal = () => modalStore.toggleModal();

  defineProps({
    isOpen: Boolean
  });
  
  const emit = defineEmits(['update:isOpen']); // To control the modal from the parent
  
  const closeModal = () => {
    // Emit event to close modal
    emit('update:isOpen', false);
    globalToggleModal();
  };
  </script>
  
  <style scoped>
  /* Basic modal styling */
  </style>