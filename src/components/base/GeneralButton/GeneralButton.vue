<script lang="ts" setup>
export type TButtonTags = 'a' | 'button' | 'div'

const emit = defineEmits(['click'])

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

const sendClick = () => {
  if (props.isDisabled) return
  emit('click')
}
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
    @click.stop="sendClick"
  >
    <slot />
  </component>
</template>
