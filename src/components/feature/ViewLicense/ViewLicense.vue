<script lang="ts" setup>
import { ILicenses, IPlanSelector } from '@/types/general.interfaces'

const props = defineProps({
  inactiveFields: {
    type: Array as () => string[],
    default: () => []
  }
})

const licenseData = ref<ILicenses|null>(null)

const subscriptionPlans = ref<null|IPlanSelector[]>(null)

const getSubscriptionPlans = async() => {
  try {
    const { plans } = await useApiAbstraction().getPlans()
    subscriptionPlans.value = plans
  } catch (error) {
    console.error(error)
  }
}

const getLicenseData = async() => {
  try {
    licenseData.value = await useApiAbstraction().getLicenses()
    console.log(licenseData.value)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getLicenseData()
  getSubscriptionPlans()
})

const updateLicenseData = async() => {
  await getLicenseData()
}
</script>

<template>
  <div class="viewLicense">
    <template v-if="licenseData">
      <div v-for="([key, group]) in Object.entries(licenseData)" :key="key">
        <h3 class="text-lg font-semibold mb-2">
          {{ key }}
        </h3>
        <div
          v-for="(plan, index) in group"
          :key="index"
          class="mb-4"
        >
          <SubscriptionPlan
            class="mb-1"
            :status="key"
            :plan="plan"
            :subscription-plans="subscriptionPlans"
            @update="updateLicenseData"
          />
          <div v-if="key == 'active'" class="mb-6">
            <MonitorAdditionPlans
              :plan="plan"
              @update="updateLicenseData"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
