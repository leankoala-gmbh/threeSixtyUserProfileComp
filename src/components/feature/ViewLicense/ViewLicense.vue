<script lang="ts" setup>

</script>

<template>
  <div class="viewLicense">
    <div class="bg-white rounded p-10">
      <SubscriptionHeader
        :closed-header="true"
        :subscription-detail="{ planName: 'Pro', type: 'canceled', date: '2022-06-20', price: 22.23, currency: 'EUR'}"
      />
    </div>
  </div>
</template>
