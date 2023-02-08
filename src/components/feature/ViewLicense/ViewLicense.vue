<script lang="ts" setup>
const plans = [
  {
    id: '0',
    name: 'Free',
    price: 0,
    currency: 'EUR'
  },
  {
    id: '1',
    name: 'Pro',
    price: 22.23,
    currency: 'EUR'
  },
  {
    id: '2',
    name: 'Enterprise',
    price: 222.23,
    currency: 'EUR'
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
    <PlanSelector :plans="plans" current="1" />
  </div>
</template>
