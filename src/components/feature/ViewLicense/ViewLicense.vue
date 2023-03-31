<script lang="ts" setup>
import { ILicenses, IPlanSelector, ILicenseCache, IPlanUpsellsFull } from '@/types/general.interfaces'

const props = defineProps({
  inactiveFields: {
    type: Array as () => string[],
    default: () => []
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})

const licenseData = ref<ILicenses|null>(null)
const licenseCache = ref<ILicenseCache>({})
const subscriptionPlans = ref<IPlanUpsellsFull[]>()

const getSubscriptionPlans = async() => {
  try {
    const { plans } = await useApiAbstraction().getPlans()
    subscriptionPlans.value = plans
  } catch (error) {
    console.error(error)
  }
}

const setLicenseCache = (plan: ILicenses) => {
  licenseCache.value = plan.active.reduce((acc: any, curr) => {
    if (!acc[curr.keyId]) {acc[curr.keyId] = { websites: curr.websites.count, servers: curr.servers.count }}
    return acc
  }, licenseCache.value)
}

const additionalMonitorBasePrices = ref({
  websites: 0,
  servers: 0
})

const getAdditionalBasePrices = async(keyId: number | string) => {
  if (!keyId) return
  try {
    const { data: websitePrice } = await useApiAbstraction().modifyPropertiesPreview({
      keyId: keyId.toString(),
      websites: 1,
      servers: 0
    })

    const { data: serverPrice } = await useApiAbstraction().modifyPropertiesPreview({
      keyId: keyId.toString(),
      websites: 0,
      servers: 1
    })

    additionalMonitorBasePrices.value = {
      websites: websitePrice.nextBillingGrossPrice,
      servers: serverPrice.nextBillingGrossPrice
    }
  } catch (error) {
    console.error(error)
  }
}

const mapAdditionPriceToLicense = () => {
  if (!licenseData.value) return
  const { active, canceled } = licenseData.value

  const activeWithPrice = active.map((plan) => {
    const { keyId, websites, servers } = plan
    const { websites: websiteBasePrice, servers: serverBasePrice } = additionalMonitorBasePrices.value
    return {
      ...plan,
      websites: {
        ...websites,
        price: websiteBasePrice
      },
      servers: {
        ...servers,
        price: serverBasePrice
      }
    }
  })

  licenseData.value = {
    active: activeWithPrice,
    canceled
  }
}

const getLicenseData = async() => {
  try {
    licenseData.value = await useApiAbstraction().getLicenses()
    const firstKeyId = licenseData.value?.active[0]?.keyId || false
    if (firstKeyId) await getAdditionalBasePrices(firstKeyId)
    mapAdditionPriceToLicense()
    setLicenseCache(licenseData.value)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getLicenseData()
  getSubscriptionPlans()
})

interface IUpdateLicenseData {
  keyId: number | string
  type: 'websites' | 'servers'
  count: number
}

const updateLicenseCache = (keyId: number | string, type: 'websites' | 'servers', count: number) => {
  if (!licenseCache.value) return
  if (!licenseCache.value[keyId]) return
  licenseCache.value[keyId][type] = count
}

const updateLicenseData = async(e: IUpdateLicenseData) => {
  if (e && Object.keys(e).length) {
    const { keyId, type, count } = e
    updateLicenseCache(keyId, type, count)
  }
  await getLicenseData()
}

const buyFreshLicense = () => {
  window.mitt.emit('tsxUserProfile', {
    action: 'buyNewLicense'
  })
}
</script>

<template>
  <div class="viewLicense">
    <template v-if="licenseData">
      <div v-for="([key, group]) in Object.entries(licenseData)" :key="key">
        <div v-if="group?.length">
          <h3 class="text-lg font-semibold mb-2">
            {{ t(key) }}
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
              :read-only="readOnly"
              @update="updateLicenseData"
            />
            <div v-if="key == 'active'" class="mb-6">
              <MonitorAdditionPlans
                :plan="plan"
                :read-only="readOnly"
                :base-prices="additionalMonitorBasePrices"
                :license-cache="licenseCache"
                @update="updateLicenseData"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="licenseData && Object.keys(licenseData).length === 0 && !readOnly">
      <p class="mb-4">
        {{ t('currentlyNoLicense') }}
      </p>
      <GeneralButton @click="buyFreshLicense">
        {{ t('buyLicense') }}
      </GeneralButton>
    </template>
  </div>
</template>
