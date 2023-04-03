<script lang="ts" setup>
import { ILicenseCache, ILicensesDetails, TMonitorTypes } from '@/types/general.interfaces'

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

const types = ['servers', 'websites']

</script>

<template>
  <div class="monitorAdditionPlans">
    <MonitorAddition
      v-for="(type, i) in types"
      :key="i"
      :plan="plan"
      :type="type as TMonitorTypes"
      class="mb-1"
      :read-only="readOnly"
      :base-prices="basePrices"
      :license-cache="licenseCache"
      @update="(e) => emit('update', e)"
    />
  </div>
</template>
