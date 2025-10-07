<script setup lang="ts">
import { z } from "zod";

const { register } = useWebAuthn();
const { fetch: fetchUserSession } = useUserSession();
const error = ref("");
const loading = ref(false);

const schema = z.object({
  email: z.pipe(z.string(), z.email("Invalid email")),
});

const state = reactive({
  email: "",
});

/**
 * Register a new passkey
 * Creates a user and stores their passkey credential
 */
async function onSubmit() {
  loading.value = true;
  error.value = "";

  try {
    // Call the WebAuthn register endpoint with user info
    await register({
      userName: state.email,
    });

    await fetchUserSession();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error.value = err.data?.message || "Failed to register passkey";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" class="w-full" />
    </UFormField>

    <UButton block type="submit">Create Passkey</UButton>
  </UForm>
</template>
