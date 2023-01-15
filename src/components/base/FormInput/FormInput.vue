<script lang="ts" setup>
import ErrorMessage from '@/components/pure/ErrorMessage/ErrorMessage.vue'

type TInputType = 'text' | 'email' | 'password' | 'number' | 'url'

defineEmits(['update:modelValue'])

defineProps({
  name: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String as () => TInputType,
    default: 'text'
  },
  inputClasses: {
    type: String,
    default: 'border p-2 w-full'
  },
  errorString: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="formInput">
    <div>
      <input
        :name="name"
        :value="modelValue"
        :type="type"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
    <ErrorMessage v-if="errorString.length" class="mt-2">
      {{ errorString }}
    </ErrorMessage>
  </div>
</template>
