<script lang="ts" setup>
import { ILicensesDetails, ILicensesServers, TMonitorTypes, TMonitorStatus, IMonitorStatusTitle, IPrices, ILicenseCache } from '@/types/general.interfaces'
import { planMatrix } from '@/data/planMatrix.js'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  plan: {
    type: Object as () => ILicensesDetails,
    default: () => ({})
  },
  type: {
    type: String as () => TMonitorTypes,
    default: 'servers'
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

const status = ref<TMonitorStatus>('info')
const isAlert = ref(false)
const statusHeadline = ref<string>('')
const statusText = ref<string>('')
const title = reactive({
  servers: t('additionalServer'),
  websites: t('additionalWebsite')
})

const subTitle = reactive<IMonitorStatusTitle>({
  servers: {
    info: t('additionalServers'),
    confirm: t('additionalTypeConfirm', { type: props.type })
  },
  websites: {
    info: t('additionalWebsites'),
    confirm: t('additionalTypeConfirm', { type: props.type })
  }
})

const isOpen = ref(false)

const { displayPrice } = useLocalHelper()
const priceObject = ref<IPrices>()

const quantity = ref(0)
const total = computed(() => priceObject.value?.nextBillingGrossPrice || 0)
const totalDisplay = computed(() => displayPrice(total.value, props.plan.renewalCurrency))
const vat = computed(() => displayPrice(priceObject.value?.nextBillingVatPrice || 0, props.plan.renewalCurrency))


const generateStatusText = () => {
  if (quantity.value <= 0) return

  statusHeadline.value = t('chargedHeadline', {
    price: totalDisplay.value,
    ie: t('incl'),
    vat: vat.value
  })

  statusText.value = t('chargedText', {
    price: totalDisplay.value,
    date: useLocalHelper().displayDate(String(new Date())),
    ie: t('incl'),
    interval: t('mo'),
    vat: vat.value
  })
}

// watch(() => props.open, () => {
//   if (props.open) isOpen.value = true
// }, { immediate: true })


const getPricePreview = async () => {
  const reqObject = props.type === 'websites'
    ? { keyId:props.plan.keyId, websites: quantity.value, servers: 0 }
    : { keyId:props.plan.keyId, websites: 0, servers: quantity.value }
  try {
    const { data } = await useApiAbstraction().modifyPropertiesPreview(reqObject)
    priceObject.value = data
  } catch (error) {
    console.log(error)
  }
}

const debouncedStatus = useDebounceFn(async() => {
  await getPricePreview()
  generateStatusText()
}, 500)

const handleChange = async (e: number) => {
  quantity.value = e
  await debouncedStatus()
}

const handleClose = () => {
  status.value = 'info'
  isOpen.value = false
  quantity.value = 0
}

const handleStatus = (screen: TMonitorStatus) =>{
  status.value = screen
}

const selectMonitorDetails = computed(() => {
  if (props.type === 'servers') return props.plan.servers
  return props.plan.websites
})

const { modifyProperties } = useApiAbstraction()

const selectPlanIds = computed(() => {
  const planIds = planMatrix.find((plan) => plan.name === props.plan.type)
  return planIds
})

const emit = defineEmits(['update'])

const handleBuy = async () => {
  if (quantity.value <= 0 || !selectPlanIds.value) return
  try {
    await modifyProperties(
      props.plan.keyId,
      props.type === 'websites' ? quantity.value : props.plan.websites.count,
      props.type === 'servers' ? quantity.value : props.plan.servers.count
    )
    status.value = 'info'
    isOpen.value = false
    isAlert.value = true
    setTimeout(() => {
      isAlert.value = false
    }, 3000)
    emit('update', { keyId: props.plan.keyId, type: props.type, count: quantity.value })
  } catch (e) {
    console.error(e)
  }
}

const currentLicenseData = computed(() => {
  return props.licenseCache[props.plan.keyId]?.[props.type]
})

const initialPriceDisplay = computed(() => {

  if (!currentLicenseData.value) return {
    base: props.plan.renewalCurrency ? displayPrice(props.basePrices[props.type], props.plan.renewalCurrency): '0'
    , total: '0' }
  const licenseCount = currentLicenseData.value
  return {
    base: displayPrice(props.basePrices[props.type] || 0, props.plan.renewalCurrency),
    total: displayPrice(props.basePrices[props.type] * licenseCount || 0, props.plan.renewalCurrency)
  }
})

const detailTotalPrice = computed(() => {
  if (priceObject.value) {
    return displayPrice(priceObject.value.nextBillingGrossPrice || 0, props.plan.renewalCurrency)
  }
  return initialPriceDisplay.value ? initialPriceDisplay.value.total : displayPrice(0, props.plan.renewalCurrency)
})
</script>

<template>
  <MonitorDetailBox
    :is-open="isOpen"
    class="monitorAddition"
  >
    <MonitorAdditionHeader
      v-if="!isOpen"
      :title="title"
      :is-alert="isAlert"
      :type="type"
      :initial-price-display="initialPriceDisplay.base"
      :total-price-display="initialPriceDisplay.total"
      :is-open="isOpen"
      :quantity="currentLicenseData"
      :read-only="readOnly"
      :status="plan.cbItemStatusId"
      @header-event="(e) => isOpen = e"
    />
    <MonitorBoxHeader
      v-else
      class="font-bold"
      :status="plan.cbItemStatusId"
      @close="handleClose"
    >
      {{ subTitle[type][status] }}
    </MonitorBoxHeader>
    <template #body>
      <MonitorAdditionInfo
        v-if="status === 'info' && initialPriceDisplay"
        :plan-details="plan"
        :status="status"
        :sub-title="subTitle"
        :type="type"
        :size="selectMonitorDetails"
        :license-cache="licenseCache"
        :quantity="quantity"
        :link="plan.changePaymentSubscriptionUrl"
        :price-display="initialPriceDisplay.base"
        :total-display="detailTotalPrice"
        :status-headline="statusHeadline"
        :status-text="statusText"
        :current-count="currentLicenseData"
        @handle-change="handleChange"
        @handle-status="(e) => handleStatus(e)"
      />
      <MonitorAdditionConfirm
        v-if="status === 'confirm'"
        :type="type"
        :size="selectMonitorDetails"
        :quantity="quantity"
        @handle-buy="handleBuy"
        @handle-status="(e) => handleStatus(e)"
      />
    </template>
  </MonitorDetailBox>
</template>
