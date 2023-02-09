<script lang="ts" setup>
const props = defineProps({})

const isOpen = ref(false)
</script>

<template>
  <ProfileDetailBox
    :is-open="isOpen"
    class="subscriptionPlan p-2"
  >
    <SubscriptionHeader
      :closed-header="!isOpen"
      :subscription-detail="{ planName: 'Pro', type: 'canceled', date: '2022-06-20', price: 22.23, currency: 'EUR'}"
      @header-event="isOpen = $event"
    />
  </ProfileDetailBox>
</template>
