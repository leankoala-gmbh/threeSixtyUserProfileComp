<template>
  <div class="font-bold mb-4">Just a Webcomponent with a inner component</div>
  <ExampleWrapperInner />
</template>

<script lang="ts" setup>
import ExampleWrapperInner from './ExampleWrapperInner.vue'
</script>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
