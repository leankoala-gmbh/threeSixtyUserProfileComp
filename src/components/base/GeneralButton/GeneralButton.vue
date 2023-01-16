<script lang="ts" setup>
import { is } from '@babel/types'

export type TButtonTags = 'a' | 'button' | 'div'

defineEmits(['click'])

const props = defineProps({
  tag: {
    type: String as () => TButtonTags,
    default: 'button'
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <component
    :is="tag"
    :disabled="isDisabled"
    class="tsx-up-button rounded h-10 flex items-center justify-center px-4 duration-300 transition"
    :class="[
      isDisabled
        ? 'isDisabled italic'
        : ''
    ]"
    @click.stop="$emit('click')"
  >
    <slot />
  </component>
</template>
