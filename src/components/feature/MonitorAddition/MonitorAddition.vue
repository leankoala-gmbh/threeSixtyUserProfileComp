<script lang="ts" setup>
import { Ref } from 'vue'
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  currency:{
    type: String,
    default: 'USD'
  }
})

const isOpen = ref(false)
const price = ref(1.19)
const priceDisplay = computed(()=>{
  return useLocalHelper().displayPrice(price.value, props.currency)
})

const qty = ref(1)
const total = ref(qty.value * price.value)
const totalDisplay = computed(()=>{
  return useLocalHelper().displayPrice(total.value, props.currency)
})

watch(() => props.open, () => {
  if (props.open) isOpen.value = true
}, { immediate: true })

const handleChange = (e: Ref<number>) =>{
  qty.value = e.value
  total.value = +(qty.value * price.value).toFixed(2)
}
</script>

<template>
  <MonitorDetailBox
    :is-open="isOpen"
    class="monitorAddition"
  >
    <div v-if="!isOpen" class="profileDetail--hover justify-center align-middle text-sm rounded py-2 mx-4 cursor-pointer">
      <div class="flex justify-between items-center" @click="isOpen = true">
        <div class="flex gap-4 items-center font-bold">
          {{ t('additionalServer') }}
        </div>
        <div class="flex text-xs">
          {{ qty }} x {{ priceDisplay }}
        </div>
        <div class="flex text-xs">
          {{ priceDisplay }} / mo
        </div>
        <div
          class="w-10 h-10 flex items-center justify-center"
        >
          <svg
            class="w-4 h-4"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.25 12.875C1.00391 12.875 0.785156 12.793 0.621094 12.6289C0.265625 12.3008 0.265625 11.7266 0.621094 11.3984L5.24219 6.75L0.621094 2.12891C0.265625 1.80078 0.265625 1.22656 0.621094 0.898438C0.949219 0.542969 1.52344 0.542969 1.85156 0.898438L7.10156 6.14844C7.45703 6.47656 7.45703 7.05078 7.10156 7.37891L1.85156 12.6289C1.6875 12.793 1.46875 12.875 1.25 12.875Z" fill="#677489" />
          </svg>
        </div>
      </div>
    </div>
    <MonitorBoxHeader
      v-else
      class="m-1"
      @close="isOpen = false"
    >
      {{ t('additionalServer') }}
    </MonitorBoxHeader>
    <template #body>
      <div class="flex items-center justify-between">
        <div class="title">
          {{ t('additionalServer') }}
        </div>
        <QuantitySelector
          :min="1"
          :max="20"
          :value="1"
          @change-quantity="handleChange"
        />
        <div class="font-light text-xs">
          x
          {{ priceDisplay }}
        </div>
        <div class="text-xs">
          {{ totalDisplay }}/{{ t('mo') }}
        </div>
      </div>
    </template>
  </MonitorDetailBox>
</template>

<style>
  .monitorAddition {}
</style>
