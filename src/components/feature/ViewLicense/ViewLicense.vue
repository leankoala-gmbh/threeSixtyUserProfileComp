<script lang="ts" setup>
import { ILicenses } from '@/types/general.interfaces'

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
    <PlanSelector
      :plans="plans"
      current="pro"
    />

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
    </template>
  </div>
</template>
