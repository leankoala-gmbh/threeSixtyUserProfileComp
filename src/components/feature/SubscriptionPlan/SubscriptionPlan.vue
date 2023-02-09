<script lang="ts" setup>
import { TPlanStatus } from '@/types/general.interfaces'

const props = defineProps({
  status: {
    type: String as () => TPlanStatus,
    default: 'active'
  }
})
const data = {
  name: 'Business',
  nextBillingDate: '2022-06-20',
  price: 24.99,
  currency: 'EUR',
  payment: {
    type: 'visa',
    details: '',
    link: ''
  },
  billingDetails: {
    subscriptionId: '123456789'
  },
  lizenseDetails: {
    licenseId: '123456789',
    creationDate: '2021-06-20',
    activationCode: '123456789'
  }
}
const isOpen = ref(false)
const currentStep = ref<string>('info')
</script>

<template>
  <ProfileDetailBox
    :is-open="isOpen"
    class="subscriptionPlan"
  >
    <SubscriptionHeader
      :closed-header="!isOpen"
      :subscription-detail="{ planName: 'Pro', status, date: '2022-06-20', price: 22.23, currency: 'EUR'}"
      @header-event="isOpen = $event"
    />
    <template #body>
      <div v-if="isOpen" class="">
        <SubscriptionStepInfo
          v-if="currentStep === 'info'"
          :status="status"
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
