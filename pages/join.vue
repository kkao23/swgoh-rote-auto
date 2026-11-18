<script setup lang="ts">
import { validateApplication } from '~/util/maintainerApply';

const API_ENDPOINT = 'https://47rezenqn0.execute-api.us-east-2.amazonaws.com/prod/maintainer-apply';

const isSubmitting = ref(false);
const submitSuccess = ref(false);
const errorMessage = ref('');

const formData = ref({
  name: '',
  discord: '',
  allyCode: '',
  why: '',
  userEmail: '',
  website: ''
});

const submitApplication = async () => {
  const errors = validateApplication(formData.value);
  if (errors.length) {
    errorMessage.value = errors[0];
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
      body: JSON.stringify({ ...formData.value }),
    });

    const result = await response.json();

    if (response.ok) {
      submitSuccess.value = true;
    } else {
      errorMessage.value = result.error || 'Failed to submit application';
    }
  } catch (error) {
    console.error('Application error:', error);
    errorMessage.value = 'Network error. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="px-4">
    <UCard class="max-w-2xl mx-auto shadow-lg rounded-xl">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-user-plus" class="w-6 h-6 text-violet-400" />
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Take Over This Site
          </h2>
        </div>
      </template>

      <div v-if="submitSuccess" class="text-center py-8">
        <UIcon name="i-heroicons-check-circle" class="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Application received!
        </h4>
        <p class="text-gray-600 dark:text-gray-400">
          Thanks for volunteering — you'll hear back soon.
        </p>
      </div>

      <template v-else>
        <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <p>
            I am retiring from the game and looking for someone to take over.
            The site is a Nuxt 3 app with an AWS Amplify backend — team data curation,
            occasional deploys (push to main = auto-deploy), and a bit of AWS housekeeping.
          </p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Typical upkeep is light: review suggestion emails, curate team data, merge PRs</li>
            <li>Everything is documented (<code class="text-xs">SUCCESSION.md</code>, <code class="text-xs">AGENTS.md</code> in <a href="https://github.com/kkao23/swgoh-rote-auto" target="_blank" rel="noopener" class="underline hover:text-white">the repo</a>)</li>
            <li>You will run the backend on your own AWS account (free tier friendly)</li>
          </ul>
          <p class="text-xs text-gray-500 dark:text-gray-500">
            Applications go straight to my inbox.
          </p>
        </div>

        <form @submit.prevent="submitApplication" class="space-y-4">
          <div class="grid sm:grid-cols-2 gap-4">
            <UFormGroup label="Your Name" required>
              <UInput v-model="formData.name" placeholder="Who are you?" />
            </UFormGroup>

            <UFormGroup label="Best Way to Reach You (Discord, reddit, email etc)" required>
              <UInput v-model="formData.discord" placeholder="e.g. @username on Discord" />
            </UFormGroup>
          </div>

          <UFormGroup label="Why Are You Interested? / Relevant Experience" required>
            <UTextarea
              v-model="formData.why"
              placeholder="Tell us about yourself — have you worked with Vue/TypeScript/AWS?"
              :rows="5"
            />
          </UFormGroup>

          <div class="grid sm:grid-cols-2 gap-4">
            <UFormGroup label="SWGOH Ally Code">
              <UInput v-model="formData.allyCode" placeholder="123456789 (optional)" />
            </UFormGroup>

            <UFormGroup label="Your Email (optional)">
              <UInput v-model="formData.userEmail" type="email" placeholder="so we can reply to you" />
            </UFormGroup>
          </div>

          <!-- Honeypot field — hidden from humans, catches bots -->
          <div class="sr-only" aria-hidden="true">
            <UFormGroup label="Website">
              <UInput v-model="formData.website" tabindex="-1" autocomplete="off" />
            </UFormGroup>
          </div>

          <UAlert
            v-if="errorMessage"
            color="red"
            variant="soft"
            :title="errorMessage"
            icon="i-heroicons-exclamation-triangle"
          />

          <div class="flex justify-end gap-3 pt-2">
            <UButton
              type="submit"
              color="violet"
              :loading="isSubmitting"
              :disabled="isSubmitting"
              icon="i-heroicons-paper-airplane"
            >
              Submit Application
            </UButton>
          </div>
        </form>
      </template>
    </UCard>
  </div>
</template>
