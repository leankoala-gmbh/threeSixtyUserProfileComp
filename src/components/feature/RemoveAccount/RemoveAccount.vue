<script lang="ts" setup>
import { translator } from '@/composables/translator'
import GeneralButton from '@/components/base/GeneralButton/GeneralButton.vue'
</script>

<template>
  <div class="mt-8 pt-8 border-neutral-200 border-t">
    <h2 class="font-medium text-3xl mb-2">
      {{ translator('RemoveAccount') }}
    </h2>
    <p class="mb-4">
      {{ translator('RemoveAccountInfo') }}
    </p>
    <GeneralButton>
      {{ translator('RemoveAccount') }}
    </GeneralButton>
  </div>
</template>
