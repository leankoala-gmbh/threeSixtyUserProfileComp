<script lang="ts" setup>
import { ILicensesServers, TMonitorTypes, IMonitorStatusTitle, ILicensesDetails, ILicenseCache } from '@/types/general.interfaces'
import { loadConfigFromFile } from 'vite'

const props = defineProps({
  subTitle: {
    type: Object as () => IMonitorStatusTitle,
    default: ()=> ({})
  },
  type:{
    type: String as () => TMonitorTypes,
    default: 'servers'
  },
  size:{
    type: Object as () => ILicensesServers,
    default: ()=>({})
  },
  planDetails:{
    type: Object as () => ILicensesDetails,
    default: ()=>({})
  },
  status: {
    type: String,
    required: true
  },
  link:{
    type: String,
    required:true
  },
  priceDisplay: {
    type: String,
    required: true
  },
  totalDisplay: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  statusHeadline : {
    type: String,
    required: true
  },
  statusText : {
    type: String,
    required: true
  },
  currentCount: {
    type: Number,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['handleChange', 'handleStatus'])

const newQuantity = ref(props.size.count)

const onChangeQuantity = (e: number) => {
  newQuantity.value = e
  emit('handleChange', e)
}

const isSameQuantity = computed(() => {
  return props.size.count === newQuantity.value
})

</script>

<template>
  <div v-if="status === 'info'" class="monitorAdditionInfo">
    <div class="flex flex-wrap items-center justify-between">
      <div class="font-bold @[550px]/tsxupmain:w-auto">
        {{ subTitle[type][status] }}
      </div>
      <div class="flex gap-2 @[400px]/tsxupmain:gap-4 justify-between items-center">
        <QuantitySelector
          :min="size.min"
          :max="size.max - currentCount"
          :quantity-value="currentCount"
          @change-quantity="onChangeQuantity"
        />
        <div class="font-light text-xs">
          x {{ priceDisplay }}
        </div>
        <div class="text-sm">
          {{ totalDisplay }}/{{ t('mo') }}
        </div>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="!isSameQuantity">
        <AnnotationBox
          type="info"
          class="mb-4"
        >
          <div class="flex">
            <div class="self-center mx-2 text-center text-current">
              <Spinner v-if="loading" />
              <svg
                v-else
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
            </div>
            <div class="text-justify px-4">
              <div class="font-bold mb-2">
                {{ statusHeadline }}
              </div>
              {{ statusText }}
            </div>
          </div>
        </AnnotationBox>
        <p class="font-medium mb-2'">
          {{ t('payment') }}
        </p>
        <p class="mb-4">
          {{ t('paymentInfo') }}
        </p>
        <PaymentMethod
          :plan-details="props.planDetails"
          class="mb-8 mt-2"
        />
        <GeneralButton
          class="mb-6"
          :is-disabled="loading"
          @click="emit('handleStatus','confirm')"
        >
          {{ t('confirmSubscription') }}
        </GeneralButton>
        <CleverBridgeInfo />
      </div>
    </Transition>
  </div>
</template>
