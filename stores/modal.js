import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isModalOpen: false,  // Example state for modal visibility
  }),
  actions: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  },
});