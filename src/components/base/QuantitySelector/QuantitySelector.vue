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

const emit= defineEmits(['changeQuantity'])

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
  <div class="quantitySelector w-40 flex flex-wrap mt-1 justify-center">
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
    <div class="errorMessage w-full text-center">
      <p v-if="!isWithinRange" class="text-red-500 text-xs">
        Must be between {{ props.min }} and {{ props.max }}
      </p>
    </div>
  </div>
</template>

<style>
  .quantitySelector {}
</style>

