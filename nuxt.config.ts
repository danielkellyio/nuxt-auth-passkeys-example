// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils"],
  auth: {
    webAuthn: true,
  },

  // Runtime configuration
  runtimeConfig: {
    // WebAuthn configuration
    webauthn: {
      // Your app name that will be shown in passkey prompts
      name: "Nuxt Passkeys Demo",
      // The origin for WebAuthn (auto-detected in production)
      origin: process.env.NUXT_WEBAUTHN_ORIGIN || "http://localhost:3000",
    },
  },
});
