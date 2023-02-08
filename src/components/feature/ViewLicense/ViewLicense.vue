<script lang="ts" setup>

</script>

<template>
  <div class="viewLicense">
    <div class="bg-white rounded p-10 mb-4">
      <SubscriptionHeader
        :closed-header="true"
        :subscription-detail="{ planName: 'Pro', type: 'canceled', date: '2022-06-20', price: 22.23, currency: 'EUR'}"
      />
    </div>
    <PaymentMethod provider="visa" details="visa xxxxxxxxx3232 11/27">
      hello
    </PaymentMethod>
  </div>
</template>
