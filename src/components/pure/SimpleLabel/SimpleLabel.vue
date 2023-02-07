<script lang="ts" setup>
import { TPlanType } from '@/types/general.interfaces'

const props = defineProps({
  type: {
    type: String as () => TPlanType,
    default: 'active' as TPlanType
  }
})
</script>

<template>
  <div
    class="simpleLabel px-2 py-[1px] text-sm rounded inline-block"
    :class="[`simpleLabel--${type}`]"
  >
    <slot />
  </div>
</template>
