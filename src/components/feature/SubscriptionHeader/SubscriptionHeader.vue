<script lang="ts" setup>
import { ISubscriptionHeaderDetails } from '@/types/general.interfaces'


const props = defineProps({
  closedHeader: {
    type: Boolean,
    required: true
  },
  subscriptionDetail: {
    type: Object as () => ISubscriptionHeaderDetails,
    required: true
  }
})

const planDate = computed(() => {
  return useLocalHelper().displayDate(props.subscriptionDetail.date)
})

const planPrice = computed(() => {
  if (!props.subscriptionDetail.price) return ''
  const { price, currency } = props.subscriptionDetail
  return useLocalHelper().displayPrice(price, currency)
})
</script>

<template>
  <div
    v-if="Object.keys(subscriptionDetail).length"
    class="subscriptionHeader"
  >
    <template v-if="closedHeader">
      <div class="flex gap-2 items-center mb-2">
        <h3
          class="font-medium text-base"
          :class="[
            subscriptionDetail.type === 'active' ? 'text-active' : ''
          ]"
        >
          {{ subscriptionDetail.planName }}
        </h3>
        <SimpleLabel :type="subscriptionDetail.type">
          {{ translator(subscriptionDetail.type) }}
        </SimpleLabel>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <span class="mr-1 text-gray-500">
            {{ translator(`${subscriptionDetail.type}DateText`) }}
          </span>
          <span>{{ planDate }}</span>
        </div>
        <div
          v-if="subscriptionDetail.type ==='active'"
          class="font-medium"
        >
          {{ planPrice }}/{{ translator('mo') }}
        </div>
      </div>
    </template>
    <h3 v-else class="font-medium text-base">
      {{ subscriptionDetail.planName }} {{ translator('subscriptionDetails') }}
    </h3>
  </div>
</template>
