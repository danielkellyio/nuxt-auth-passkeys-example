<script setup lang="ts">
const { authenticate } = useWebAuthn();
const { fetch: fetchUserSession } = useUserSession();
const loading = ref(false);
const error = ref("");

/**
 * Authenticate with existing passkey
 * Prompts user to select a passkey credential
 */
async function handleAuthenticate() {
  loading.value = true;
  error.value = "";

  try {
    // Call the WebAuthn authenticate endpoint
    await authenticate();

    await fetchUserSession();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error.value = err.data?.message || "Failed to authenticate";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <!-- Authentication (no form needed, just use the passkey) -->
  <div class="space-y-4">
    <UAlert
      v-if="error"
      color="error"
      icon="i-lucide-alert-circle"
      :title="error"
    />

    <UButton
      block
      size="lg"
      icon="i-lucide-fingerprint"
      :loading="loading"
      @click="handleAuthenticate"
    >
      Sign In with Passkey
    </UButton>
  </div>
</template>
