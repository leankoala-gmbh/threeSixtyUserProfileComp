<script lang="ts" setup>
import { ILicensesServers, TMonitorTypes, TMonitorStatus, IMonitorStatusTitle } from '@/types/general.interfaces'
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  currency:{
    type: String,
    default: 'USD'
  },
  type:{
    type: String as ()=> TMonitorTypes,
    default: 'servers'
  },
  size:{
    type: Object as ()=> ILicensesServers,
    default: ()=>({})
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


const price = ref(1.19)

const priceDisplay = computed( () =>
  useLocalHelper().displayPrice(price.value, props.currency)
)

const vat = computed( () =>
  useLocalHelper().displayPrice(total.value / 100 * 19, props.currency)
)

const quantity = ref(1)
const total = ref(quantity.value * price.value)
const totalDisplay = computed(()=>{
  return useLocalHelper().displayPrice(total.value, props.currency)
})
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

const handleChange = (e: number) => {
  quantity.value = e as number
  total.value = +(quantity.value * price.value).toFixed(2)
  generateStatusText()
}
const handleClose = () => {
  status.value = 'info'
  isOpen.value = false
}
const handleStatus = (screen: TMonitorStatus) =>{
  status.value = screen
}
const handleBuy = () => {
  //TODO
  //useApiAbstraction().buyAdditionalMonitors()
  isAlert.value = true
  setTimeout(() => {
    isAlert.value = false
  }, 3000)
  status.value = 'info'
  isOpen.value = false
}
onMounted(() => {
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
      class="m-1 font-bold"
      @close="handleClose"
    >
      {{ subTitle[type][status] }}
    </MonitorBoxHeader>
    <template #body>
      <MonitorAdditionInfo
        v-if="status==='info'"
        :status="status"
        :sub-title="subTitle"
        :type="type"
        :size="size"
        :current="quantity"
        :quantity="quantity"
        :price-display="priceDisplay"
        :total-display="totalDisplay"
        :status-headline="statusHeadline"
        :status-text="statusText"
        @handle-change="handleChange"
        @handle-status="(e)=>handleStatus(e)"
      />
      <MonitorAdditionConfirm
        v-if="status==='confirm'"
        :type="type"
        :size="size"
        :quantity="quantity"
        @handle-buy="handleBuy"
        @handle-status="(e)=>handleStatus(e)"
      />
    </template>
  </MonitorDetailBox>
</template>
