<script lang="ts" setup>
type TInputType = 'text' | 'email' | 'password' | 'number' | 'url'

defineEmits(['update:modelValue'])

defineProps({
  name: {
    type: String,
    required: true
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
    default: 'border p-2 w-full rounded'
  },
  errorString: {
    type: String,
    default: ''
  }
})

const showPassword = ref(false)
</script>

<template>
  <div class="formInput">
    <div class="relative">
      <input
        :name="name"
        :value="modelValue"
        :type="type === 'password' ? (showPassword ? 'text' : 'password') : type"
        :class="[
          inputClasses,
          type === 'password' ? 'pr-8' : ''
        ]"
        @input="$emit('update:modelValue', $event.target?.value)"
      >
      <div
        v-if="type === 'password'"
        class="absolute right-[8px] h-[40px] flex items-center top-0 text-gray-500 cursor-pointer z-10"
        @click="showPassword = !showPassword"
      >
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        ><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z" /></svg>
      </div>
    </div>
    <ErrorMessage v-if="errorString.length" class="p-1">
      {{ errorString }}
    </ErrorMessage>
  </div>
</template>
