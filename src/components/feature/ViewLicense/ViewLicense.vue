<script lang="ts" setup>
import { ILicenses } from '@/types/general.interfaces'

const plans = [
  {
    id: 'pro',
    name: 'Pro',
    description: 'Starting from $19.99/once'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Starting from $55.00/once'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Starting from $99.00/once'
  }
]
const licenseData = ref<ILicenses|null>(null)

const getLicenseData = async() => {
  try {
    const response = await useApiAbstraction().getLicenses()
    licenseData.value = response
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="viewLicense">
    <PaymentMethod
      class="mb-4"
      provider="visa"
      details="visa xxxxxxxxx3232 11/27"
    >
      hello
    </PaymentMethod>
    <PlanSelector
      :plans="plans"
      current="pro"
    />
    <SubscriptionOverview />
  </div>
</template>
