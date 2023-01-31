<script lang="ts" setup>
import { PropType } from 'vue'

type TButtonTags = 'a' | 'button' | 'div'
type TVariant = 'regular' | 'ghost'

const emit = defineEmits(['click'])

const props = defineProps({
  tag: {
    type: String as () => TButtonTags,
    default: 'button'
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String as () => TVariant,
    default: 'regular'
  },
  buttonLayout: {
    type: String,
    default: 'rounded h-10 flex items-center justify-center px-4 duration-300 transition'
  }
})

const sendClick = () => {
  if (props.isDisabled) return
  emit('click')
}
</script>

<template>
  <component
    :is="tag"
    :disabled="isDisabled"
    class="rounded h-10 flex items-center justify-center px-4 duration-300 transition border-current border font-medium"

    :class="[
      isDisabled
        ? 'isDisabled italic'
        : '',
      `generalButton--${variant}`
    ]"
    @click.stop="sendClick"
  >
    <slot />
  </component>
</template>

