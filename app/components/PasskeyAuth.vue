<script setup lang="ts">
const mode = ref<"signin" | "signup">("signin");

function toggleMode() {
  mode.value = mode.value === "signin" ? "signup" : "signin";
}
</script>

<template>
  <UCard class="w-full max-w-md">
    <template #header>
      <div class="flex flex-col items-center space-y-2">
        <UIcon name="i-lucide-fingerprint" class="size-12 text-primary" />
        <h2 class="text-2xl font-bold">
          {{ mode === "signin" ? "Sign In" : "Sign Up" }}
        </h2>
        <p class="text-sm text-muted">
          {{
            mode === "signin"
              ? "Use your passkey to sign in"
              : "Create a new passkey account"
          }}
        </p>
      </div>
    </template>

    <!-- Registration Form -->
    <PassKeyRegister v-if="mode === 'signup'" />
    <PassKeyLogin v-else />
    <template #footer>
      <div class="text-center text-sm text-muted">
        {{
          mode === "signin"
            ? "Don't have an account?"
            : "Already have an account?"
        }}
        <UButton variant="link" @click="toggleMode">
          {{ mode === "signin" ? "Sign up" : "Sign in" }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>
