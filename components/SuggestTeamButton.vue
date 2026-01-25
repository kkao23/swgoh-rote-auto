<script setup lang="ts">
const isOpen = ref(false);
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const errorMessage = ref('');
const isHidden = ref(false);

const formData = ref({
  lead: '',
  others: '',
  notes: '',
  phase: '',
  alignment: '',
  position: '',
  userEmail: '',
  userName: ''
});

const API_ENDPOINT = 'https://47rezenqn0.execute-api.us-east-2.amazonaws.com/prod/suggest-team';

const phases = ['P1', 'P2', 'P3', 'P4', 'P5', 'Mandalore', 'Zeffo'];
const alignments = ['LS', 'DS', 'Mixed'];

const resetForm = () => {
  formData.value = {
    lead: '',
    others: '',
    notes: '',
    phase: '',
    alignment: '',
    position: '',
    userEmail: '',
    userName: ''
  };
  errorMessage.value = '';
  submitSuccess.value = false;
};

const closeModal = () => {
  isOpen.value = false;
  setTimeout(() => {
    resetForm();
  }, 300);
};

const hideButton = () => {
  isHidden.value = true;
};

const submitSuggestion = async () => {
  // Validation
  if (!formData.value.lead || !formData.value.others || !formData.value.notes || 
      !formData.value.phase || !formData.value.alignment || !formData.value.position) {
    errorMessage.value = 'Please fill in all required fields';
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value)
    });

    const data = await response.json();

    if (response.ok) {
      submitSuccess.value = true;
      setTimeout(() => {
        closeModal();
      }, 2000);
    } else {
      errorMessage.value = data.error || 'Failed to submit suggestion';
    }
  } catch (error) {
    console.error('Submission error:', error);
    errorMessage.value = 'Network error. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div>
    <!-- Floating Button with Close X -->
    <div v-if="!isHidden" class="fixed bottom-9 right-6 z-50 flex items-start gap-2">
      <button
        @click="isOpen = true"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 text-sm"
      >
        <UIcon name="i-heroicons-light-bulb" class="w-4 h-4" />
        Suggest a Team!
      </button>
      
      <!-- Small X button to hide -->
      <button
        @click="hideButton"
        class="bg-gray-700 hover:bg-gray-800 text-gray-300 hover:text-white w-8 h-8 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
        title="Hide this button"
      >
        <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
      </button>
    </div>

    <!-- Modal -->
    <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-2xl' }">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Suggest a Team
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              @click="closeModal"
            />
          </div>
        </template>

        <!-- Success Message -->
        <div v-if="submitSuccess" class="text-center py-8">
          <UIcon name="i-heroicons-check-circle" class="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Thank you!
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            Your team suggestion has been submitted successfully.
          </p>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="submitSuggestion" class="space-y-4">
          <!-- Mission Details -->
          <div class="grid grid-cols-3 gap-4">
            <UFormGroup label="Phase" required>
              <USelect
                v-model="formData.phase"
                :options="phases"
                placeholder="Select phase"
              />
            </UFormGroup>

            <UFormGroup label="Alignment" required>
              <USelect
                v-model="formData.alignment"
                :options="alignments"
                placeholder="Select"
              />
            </UFormGroup>

            <UFormGroup label="Position" required>
              <UInput
                v-model="formData.position"
                placeholder="e.g., Top Left"
              />
            </UFormGroup>
          </div>

          <!-- Team Composition -->
          <UFormGroup label="Lead Character" required>
            <UInput
              v-model="formData.lead"
              placeholder="e.g., Lord Vader"
            />
          </UFormGroup>

          <UFormGroup label="Other Characters" required>
            <UTextarea
              v-model="formData.others"
              placeholder="e.g., Maul, RG, 9S, Darth Vader"
              :rows="2"
            />
          </UFormGroup>

          <UFormGroup label="Notes / Strategy" required>
            <UTextarea
              v-model="formData.notes"
              placeholder="e.g., Auto, target X at start, pause at wave 2..."
              :rows="3"
            />
          </UFormGroup>

          <!-- Optional Contact Info -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Optional: Leave your contact info if you'd like credit or follow-up
            </p>
            
            <div class="grid grid-cols-2 gap-4">
              <UFormGroup label="Your Name">
                <UInput
                  v-model="formData.userName"
                  placeholder="Anonymous"
                />
              </UFormGroup>

              <UFormGroup label="Your Email">
                <UInput
                  v-model="formData.userEmail"
                  type="email"
                  placeholder="optional@example.com"
                />
              </UFormGroup>
            </div>
          </div>

          <!-- Error Message -->
          <UAlert
            v-if="errorMessage"
            color="red"
            variant="soft"
            :title="errorMessage"
            icon="i-heroicons-exclamation-triangle"
          />

          <!-- Submit Button -->
          <div class="flex justify-end gap-3 pt-4">
            <UButton
              color="gray"
              variant="ghost"
              @click="closeModal"
              :disabled="isSubmitting"
            >
              Cancel
            </UButton>
            <UButton
              type="submit"
              color="primary"
              :loading="isSubmitting"
              :disabled="isSubmitting"
            >
              Submit Suggestion
            </UButton>
          </div>
        </form>
      </UCard>
    </UModal>
  </div>
</template>
