<template>
  <div class="inline-block" @click="trigger">
    <slot />
  </div>
</template>

<script lang="ts" setup>
/**
 * Example Trigger Component
 * use mitt for event handling
 */
import mitt from 'mitt'

declare global {
  interface Window {
    mitt?: any;
  }
}

interface Props {
  testProp: string
}

const props = withDefaults(defineProps<Props>(), {
  testProp: ''
})

window.mitt = window.mitt || mitt()

const trigger = () => {
  window.mitt.emit('testEvent', {
    testProp: props.testProp
  })
}
</script>
