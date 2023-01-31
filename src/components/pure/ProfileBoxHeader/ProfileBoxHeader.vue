<script lang="ts" setup>
const emit = defineEmits(['close'])
</script>

<template>
  <div class="profileBoxHeader flex justify-between items-center">
    <span class="font-medium"><slot /></span>
    <GeneralButton
      variant="ghost"
      @click="emit('close')"
    >
      {{ translator('Close') }}
    </GeneralButton>
  </div>
</template>

<style>
  .profileBoxHeader {}
</style>
