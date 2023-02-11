<script lang="ts" setup>
const props = defineProps({
  date: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    default: ''
  },
  interval: {
    type: String,
    default: 'mo'
  }
})

const planPrice = computed(() => {
  if (!props.price) return ''
  return useLocalHelper().displayPrice(props.price, props.currency)
})

const planDate = computed(() => {
  return useLocalHelper().displayDate(props.date)
})
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <span class="mr-1 text-gray-500">
        {{ translator(`${status}DateText`) }}
      </span>
      <span>{{ planDate }}</span>
    </div>
    <div
      v-if="status ==='active'"
      class="font-medium"
    >
      {{ planPrice }}/{{ translator('mo') }}
    </div>
  </div>
</template>
