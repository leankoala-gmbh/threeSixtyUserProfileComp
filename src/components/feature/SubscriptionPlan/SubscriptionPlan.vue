<script lang="ts" setup>
import { ILicensesDetails } from '@/types/general.interfaces'

const props = defineProps({
  status: {
    type: String,
    default: 'active'
  },
  plan: {
    type: Object as () => ILicensesDetails,
    default: () => ({})
  }
})

const isOpen = ref(false)
const currentStep = ref<string>('info')

const subscriptionDetails = computed(() => {
  return {
    planName: props.plan.type,
    status: props.status,
    date: props.plan.nextBillingDate,
    price: props.plan.renewalCostGross,
    currency: props.plan.renewalCurrency
  }
})
</script>

<template>
  <ProfileDetailBox
    :is-open="isOpen"
    class="subscriptionPlan"
  >
    <SubscriptionHeader
      :closed-header="!isOpen"
      :subscription-detail="subscriptionDetails"
      @header-event="isOpen = $event"
    />
    <template #body>
      <div v-if="isOpen" class="">
        <SubscriptionStepInfo
          v-if="currentStep === 'info'"
          :status="status"
          :plan="plan"
          @trigger="currentStep = $event"
        />
        <SubscriptionStepChange
          v-if="status === 'active' && currentStep === 'change'"
        />
        <SubscriptionStepConfirm
          v-if="status === 'active' && currentStep === 'confirm'"
        />
        <SubscriptionStepCancel
          v-if="status === 'active' && currentStep === 'cancel'"
        />
      </div>
    </template>
  </ProfileDetailBox>
</template>
