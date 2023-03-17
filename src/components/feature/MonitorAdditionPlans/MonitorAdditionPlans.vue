<script lang="ts" setup>
import { ILicensesDetails } from '@/types/general.interfaces'

const props = defineProps({
  plan: {
    type: Object as () => ILicensesDetails,
    default: () => ({})
  }
})
</script>

<template>
  <div class="monitorAdditionPlans">
    <MonitorAddition
      :plan="plan"
      type="servers"
      class="mb-1"
    />
    <MonitorAddition
      :plan="plan"
      type="websites"
      class="mb-1"
    />
  </div>
</template>
