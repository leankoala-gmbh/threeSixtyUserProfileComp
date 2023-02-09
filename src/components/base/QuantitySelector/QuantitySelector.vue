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

type TOperations = 'minus'| 'plus'
const operations = {
  minus: ()=>{
    if (isLowerLimit.value) return
    quantity.value--
  },
  plus: ()=>{
    if (isUpperLimit.value) return
    quantity.value++
  }
}

const errorString = `Must be between ${props.min } and ${props.max }`

const handleQuantity = (operation: TOperations) => {
  if (!isWithinRange.value) return
  operations[operation]()
  emit('changeQuantity', quantity)
}
const isWithinRange = computed(()=>{
  return quantity.value >= props.min && quantity.value <= props.max
})

const isLowerLimit = computed(()=>{
  return quantity.value === props.min
})
const isUpperLimit = computed(()=>{
  return quantity.value === props.max
})
watch(() => quantity.value, () => {
  if (isWithinRange || !isLowerLimit || !isUpperLimit) return
}, { immediate: true })
</script>

<template>
  <div class="quantitySelector w-40 flex flex-wrap my-1 py-2 justify-center">
    <GeneralButton
      :is-disabled="isLowerLimit"
      variant="ghost"
      @click="handleQuantity('minus')"
    >
      -
    </GeneralButton>
    <input
      v-model="quantity"
      aria-label="InputQuantity"
      class="mx-2 rounded text-center w-10"
    >
    <GeneralButton
      :is-disabled="isUpperLimit"
      variant="ghost"
      @click="handleQuantity('plus')"
    >
      +
    </GeneralButton>
    <ErrorMessage v-if="!isWithinRange">
      {{ errorString }}
    </ErrorMessage>
  </div>
</template>

<style>
  .quantitySelector {}
</style>

