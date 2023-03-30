<script lang="ts" setup>
import { ILicenseCache, ILicensesDetails } from '@/types/general.interfaces'

const emit = defineEmits(['update'])

const props = defineProps({
  plan: {
    type: Object as () => ILicensesDetails,
    default: () => ({})
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  basePrices: {
    type: Object as () => Record<string, number>,
    default: () => ({})
  },
  licenseCache: {
    type: Object as () => ILicenseCache,
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
      :read-only="readOnly"
      :base-prices="basePrices"
      :license-cache="licenseCache"
      @update="(e) => emit('update', e)"
    />
    <MonitorAddition
      :plan="plan"
      type="websites"
      class="mb-1"
      :read-only="readOnly"
      :base-prices="basePrices"
      :license-cache="licenseCache"
      @update="(e) => emit('update', e)"
    />
  </div>
</template>
