<script lang="ts" setup>
import { ILicensesDetails, ILicensesServers, TMonitorTypes, TMonitorStatus, IMonitorStatusTitle, IPrices } from '@/types/general.interfaces'
import { planMatrix } from '@/data/planMatrix.js'

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
  size: {
    type: Object as () => ILicensesServers,
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
const priceObject = ref<IPrices|null>(null)
const priceDisplay = computed(() => displayPrice(priceObject.value?.nextBillingNetPrice || 0, props.plan.renewalCurrency))

const quantity = ref(1)
const total = computed(()=>priceObject.value?.nextBillingNetPrice || 0)
const vat = computed(() => displayPrice(priceObject.value?.nextBillingVatPrice || 0, props.plan.renewalCurrency))
const totalDisplay = computed(() => displayPrice(total.value, props.plan.renewalCurrency))


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

watch(() => props.open, () => {
  if (props.open) isOpen.value = true
}, { immediate: true })

const getPricePreview = async () => {
  const reqObject = props.type === 'websites'? { keyId:props.plan.keyId, websites: quantity.value, servers: 0 } : { keyId:props.plan.keyId, websites: 0, servers: quantity.value }
  try {
    const { data } = await useApiAbstraction().modifyPropertiesPreview(reqObject)
    priceObject.value = data
  } catch (error) {
    console.log(error)

  }
}

const handleChange = async (e: number) => {
  quantity.value = e
  await getPricePreview()
  generateStatusText()
}

const handleClose = () => {
  status.value = 'info'
  isOpen.value = false
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
    status.value = 'info'
    isOpen.value = false
  } catch (e) {
    console.error(e)
  }

}


onMounted(async () => {
  await getPricePreview()
  generateStatusText()
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
      :price-display="priceDisplay"
      :is-open="isOpen"
      :quantity="quantity"
      @header-event="(e)=> isOpen = e"
    />
    <MonitorBoxHeader
      v-else
      class="font-bold"
      @close="handleClose"
    >
      {{ subTitle[type][status] }}
    </MonitorBoxHeader>
    <template #body>
      <MonitorAdditionInfo
        v-if="status === 'info'"
        :plan-details="plan"
        :status="status"
        :sub-title="subTitle"
        :type="type"
        :size="selectMonitorDetails"
        :current="quantity"
        :quantity="quantity"
        :link="plan.changePaymentSubscriptionUrl"
        :price-display="priceDisplay"
        :total-display="totalDisplay"
        :status-headline="statusHeadline"
        :status-text="statusText"
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
