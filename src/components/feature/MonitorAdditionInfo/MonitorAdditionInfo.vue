<script lang="ts" setup>
import { ILicensesServers, TMonitorTypes, IMonitorStatusTitle } from '@/types/general.interfaces'

const props = defineProps({
  subTitle: {
    type: Object as ()=> IMonitorStatusTitle,
    default: ()=> ({})
  },
  status: {
    type: String,
    required: true
  },
  type:{
    type: String as ()=> TMonitorTypes,
    default: 'servers'
  },
  size:{
    type: Object as ()=> ILicensesServers,
    default: ()=>({})
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
  current: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['handleChange', 'handleStatus'])

</script>

<template>
  <div v-if="status === 'info'" class="monitorAdditionInfo">
    <div class="flex items-center justify-between">
      <div class="font-bold">
        {{ subTitle[type][status] }}
      </div>
      <QuantitySelector
        :min="1"
        :max="size.max - size.count"
        :value="current"
        @change-quantity="(e) => emit('handleChange',e)"
      />
      <div class="font-light text-xs">
        x
        {{ priceDisplay }}
      </div>
      <div class="text-sm">
        {{ totalDisplay }}/{{ t('mo') }}
      </div>
    </div>
    <Transition name="fade">
      <div v-if="quantity >= 1">
        <AnnotationBox
          type="info"
          class="mb-4"
        >
          <div class="flex">
            <div class="self-center mx-2 text-center text-current">
              <svg
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
        <div class="paymentSubscription">
          <div class="font-bold mt-6 mb-2">
            Payment
          </div>
          <p class="font-normal text-gray-600 text-base">
            The 360 Monitoring Store operated by cleverbridge AG will process this order using the payment method attached to the selected subscription.
          </p>
          <PaymentMethod
            class="mb-8 mt-2"
          />
        </div>
        <div class="confirmSubscription">
          <GeneralButton
            @click="() => emit('handleStatus','confirm')"
          >
            {{ t('confirmSubscription') }}
          </GeneralButton>
          <div class="font-bold mt-6 mb-2">
            Confirm subscription
          </div>
          <p class="info">
            Cleverbridge info
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
  .monitorAdditionInfo {}
</style>
