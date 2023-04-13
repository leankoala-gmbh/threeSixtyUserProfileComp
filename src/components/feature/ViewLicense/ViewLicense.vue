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
  apiError.value = null
  try {
    const { plans } = await useApiAbstraction().getPlans()
    subscriptionPlans.value = plans
  } catch (error) {
    apiError.value = error
    console.error(error)
  }
}

const setLicenseCache = (plan: ILicenses) => {
  if (!plan.active?.length) return
  licenseCache.value = plan.active.reduce((acc: any, curr) => {
    if (!acc[curr.keyId]) {acc[curr.keyId] = {
      websites: curr.websites.count,
      servers: curr.servers.count,
      websitesNextCycle: curr.websites.next_cycle_count,
      serversNextCycle: curr.servers.next_cycle_count,
      websitesDiff: curr.websites.count - curr.websites.next_cycle_count,
      serversDiff: curr.servers.count - curr.servers.next_cycle_count
    }}
    return acc
  }, licenseCache.value)
}

const additionalMonitorPricesCollected = ref(false)
const additionalMonitorBasePrices = ref({
  websites: 0,
  servers: 0
})

const apiError = ref<unknown|null>(null)

const getAdditionalBasePrices = async(keyId: number | string) => {
  apiError.value = null
  if (!keyId) return
  try {
    const { data } = await useApiAbstraction().getUnitPrices(keyId.toString())

    additionalMonitorBasePrices.value = {
      websites: data.websites.nextBillingGrossPrice,
      servers: data.servers.nextBillingGrossPrice
    }
    additionalMonitorPricesCollected.value = true
  } catch (error) {
    apiError.value = error
    console.error(error)
  }
}

const mapAdditionPriceToLicense = () => {
  if (!licenseData.value) return
  const { active, canceled } = licenseData.value
  if (!active || !canceled) return

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
  apiError.value = null
  try {
    licenseData.value = await useApiAbstraction().getLicenses()
    const firstKeyId = licenseData.value?.active?.[0]?.keyId || false
    if (firstKeyId && !additionalMonitorPricesCollected.value) await getAdditionalBasePrices(firstKeyId)
    mapAdditionPriceToLicense()
    setLicenseCache(licenseData.value)
  } catch (error) {
    apiError.value = error
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
    <ApiStatus v-if="!licenseData && !readOnly && apiError">
      {{ apiError }}
    </ApiStatus>
  </div>
</template>
