<script lang="ts" setup>
import { ILicensesDetails } from '@/types/general.interfaces'
const props = defineProps({
  plan: {
    type: Object as () => ILicensesDetails,
    default: ()=>({})
  }
})
</script>

<template>
  <div class="monitorAdditionPlans">
    <MonitorAddition
      :currency="plan.renewalCurrency"
      :size="props.plan.servers"
      type="servers"
      class="mb-1"
    />
    <MonitorAddition
      :currency="plan.renewalCurrency"
      :size="props.plan.websites"
      type="websites"
      class="mb-1"
    />
  </div>
</template>

<style>
  .monitorAdditionPlans {}
</style>
