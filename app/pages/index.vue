<script setup lang="ts">
const { loggedIn } = useUserSession();
</script>

<template>
  <UMain>
    <UContainer
      class="flex flex-col items-center justify-center min-h-screen py-12"
    >
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Nuxt Passkeys Demo</h1>
        <p class="text-lg text-muted max-w-2xl">
          Experience passwordless authentication with WebAuthn and passkeys.
          Secure, simple, and powered by Nuxt Auth Utils.
        </p>
      </div>

      <!-- Main Content -->
      <div class="w-full flex justify-center">
        <!-- Show auth form for guests -->
        <PasskeyAuth v-if="!loggedIn" />

        <!-- Show user info for authenticated users -->
        <UserDisplay v-else />
      </div>

      <PassKeyInfo />
    </UContainer>
  </UMain>
</template>
