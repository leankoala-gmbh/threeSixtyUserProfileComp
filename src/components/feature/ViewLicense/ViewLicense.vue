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
          <Subscri
            ption-plan
            class="mb-1"
            :status="key"
            :plan="plan"
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
