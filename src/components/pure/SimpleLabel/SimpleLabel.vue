<script lang="ts" setup>
type TLabel = 'active' | 'canceled'

const props = defineProps({
  type: {
    type: String as () => TLabel,
    default: 'active' as TLabel
  }
})
</script>

<template>
  <div
    class="simpleLabel px-2 py-1 text-sm rounded inline-block"
    :class="[`simpleLabel--${type}`]"
  >
    <slot />
  </div>
</template>
