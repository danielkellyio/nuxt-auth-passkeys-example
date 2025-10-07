<template>
  <!-- Info Section -->
  <div class="mt-12 max-w-2xl">
    <UCard variant="subtle">
      <div class="space-y-4">
        <h3 class="font-semibold text-lg">What are Passkeys?</h3>
        <p class="text-sm text-muted">
          Passkeys are a more secure and convenient alternative to passwords.
          They use public-key cryptography to authenticate you without
          transmitting any secrets over the network. Your private key never
          leaves your device, making phishing attacks nearly impossible.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div class="flex items-start space-x-2">
            <UIcon
              name="i-lucide-shield-check"
              class="size-5 text-success mt-0.5"
            />
            <div>
              <h4 class="font-medium text-sm">More Secure</h4>
              <p class="text-xs text-muted">
                Resistant to phishing and credential theft
              </p>
            </div>
          </div>
          <div class="flex items-start space-x-2">
            <UIcon name="i-lucide-zap" class="size-5 text-warning mt-0.5" />
            <div>
              <h4 class="font-medium text-sm">Faster Login</h4>
              <p class="text-xs text-muted">
                Sign in with just a fingerprint or face
              </p>
            </div>
          </div>
          <div class="flex items-start space-x-2">
            <UIcon name="i-lucide-smartphone" class="size-5 text-info mt-0.5" />
            <div>
              <h4 class="font-medium text-sm">Cross-Device</h4>
              <p class="text-xs text-muted">
                Sync across your devices seamlessly
              </p>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
