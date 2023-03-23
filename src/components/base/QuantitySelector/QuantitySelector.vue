<script lang="ts" setup>
const props = defineProps({
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 10
  },
  value: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['changeQuantity'])

const quantity = ref(props.value)

const errorString = `Must be between ${props.min } and ${props.max }`


const isWithinRange = computed(() => {
  return quantity.value >= props.min && quantity.value <= props.max
})

const isLowerLimit = computed(() => {
  return quantity.value === props.min
})
const isUpperLimit = computed(() => {
  return quantity.value === props.max
})

const operations = (operation: string) => {
  if (operation === 'minus'){
    if (isLowerLimit.value) return
    quantity.value--
  }
  else if (operation === 'plus'){
    if (isUpperLimit.value) return
    quantity.value++
  } else {
    return
  }
}
const handleQuantity = (operation: string) => {
  operations(operation)
  emit('changeQuantity', quantity.value)
}

watch( () => quantity.value, () => {
  if (isWithinRange || !isLowerLimit || !isUpperLimit) return
}, { immediate: true })

</script>

<template>
  <div class="quantitySelector w-40 flex flex-wrap my-1 py-2 justify-center">
    <button
      aria-label="handleMinusQuantity"
      class="rounded-l-md border w-8 h-8 disabled:bg-gray-200"
      :disabled="!isWithinRange || isLowerLimit"
      @click="handleQuantity('minus')"
    >
      -
    </button>
    <input
      v-model="quantity"
      aria-label="handleInputQuantity"
      class="border-y text-center w-8 h-8"
      @input="handleQuantity('')"
    >
    <button
      aria-label="handlePlusQuantity"
      class="rounded-r-md border w-8 h-8 disabled:bg-gray-200"
      :disabled="!isWithinRange || isUpperLimit"
      @click="handleQuantity('plus')"
    >
      +
    </button>
    <ErrorMessage v-if="!isWithinRange">
      {{ errorString }}
    </ErrorMessage>
  </div>
</template>
