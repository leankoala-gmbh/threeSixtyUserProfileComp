<script lang="ts" setup>
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
</script>

<template>
  <div class="viewLicense">
    <div class="bg-white rounded p-10 mb-4">
      <SubscriptionHeader
        :closed-header="true"
        :subscription-detail="{ planName: 'Pro', type: 'canceled', date: '2022-06-20', price: 22.23, currency: 'EUR'}"
      />
    </div>
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
  </div>
</template>
