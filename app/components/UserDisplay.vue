<script setup lang="ts">
/**
 * User Display Component
 *
 * Shows the current logged-in user information
 * and provides logout functionality
 */

const { user, loggedIn, clear } = useUserSession();
const toast = useToast();
const loading = ref(false);

/**
 * Logout the current user
 */
async function handleLogout() {
  loading.value = true;
  try {
    await clear();

    toast.add({
      title: "Logged out",
      description: "You have been logged out successfully.",
      color: "success",
    });
  } catch {
    toast.add({
      title: "Error",
      description: "Failed to logout",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div v-if="loggedIn && user" class="w-full max-w-md">
    <UCard>
      <template #header>
        <div class="flex items-center space-x-3">
          <UAvatar :alt="user?.name" size="lg">
            <template #fallback>
              <UIcon name="i-lucide-user" class="size-6" />
            </template>
          </UAvatar>
          <div class="flex-1">
            <h3 class="font-semibold">
              {{ user.email }}
            </h3>
            <p class="text-sm text-muted" />
          </div>
        </div>
      </template>

      <div class="space-y-3">
        <div class="flex items-center space-x-2 text-sm">
          <UIcon name="i-lucide-fingerprint" class="size-4 text-primary" />
          <span class="text-muted">Secured with passkey</span>
        </div>

        <div class="flex items-center space-x-2 text-sm">
          <UIcon name="i-lucide-check-circle" class="size-4 text-success" />
          <span class="text-muted">Authentication successful</span>
        </div>
      </div>

      <template #footer>
        <UButton
          block
          color="neutral"
          variant="outline"
          icon="i-lucide-log-out"
          :loading="loading"
          @click="handleLogout"
        >
          Logout
        </UButton>
      </template>
    </UCard>
  </div>
</template>
