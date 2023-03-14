<script lang="ts" setup>
import { ILicenses } from '@/types/general.interfaces'

const props = defineProps({
  inactiveFields: {
    type: Array as () => string[],
    default: () => []
  }
})

const licenseData = ref<ILicenses|null>(null)

const getLicenseData = async() => {
  try {
    licenseData.value = await useApiAbstraction().getLicenses()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getLicenseData()
})
</script>

<template>
  <div class="viewLicense">
    <template v-if="licenseData">
      <div v-for="([key, group]) in Object.entries(licenseData)" :key="key">
        <h3 class="text-lg font-semibold mb-2">
          {{ key }}
        </h3>
        <SubscriptionPlan
          v-for="(plan, index) in group"
          :key="index"
          class="mb-4"
          :status="key"
          :plan="plan"
        />
      </div>
      <MonitorAddition />
    </template>
  </div>
</template>
