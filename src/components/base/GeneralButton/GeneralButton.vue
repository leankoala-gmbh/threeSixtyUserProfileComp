<script lang="ts" setup>
export type TButtonTags = 'a' | 'button' | 'div' | 'input'

defineEmits(['click'])

const props = defineProps({
  tag: {
    type: String as () => TButtonTags,
    default: 'button'
  }
})
</script>

<template>
  <component
    :is="tag"
    class="tsx-up-button rounded h-10 flex items-center justify-center px-4 duration-300 transition"
    @click.stop="$emit('click')"
  >
    <slot />
  </component>
</template>
