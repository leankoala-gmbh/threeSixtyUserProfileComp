<script lang="ts" setup>
import { ILicensesDetails, IPlanSelector, IPlanUpsellsFull } from '@/types/general.interfaces'

const props = defineProps({
  status: {
    type: String,
    default: 'active'
  },
  plan: {
    type: Object as () => ILicensesDetails,
    default: () => ({})
  },
  subscriptionPlans: {
    type: Object as () => IPlanUpsellsFull[],
    default: () => ({})
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)
const currentStep = ref<string>('info')

const subscriptionDetails = computed(() => {
  return {
    planName: props.plan.type,
    status: props.status,
    date: props.plan.nextBillingDate,
    price: props.plan.renewalCostGross,
    currency: props.plan.renewalCurrency
  }
})

const selectedPlan = ref<null|IPlanSelector>(null)
const boxOpenHeader = ref<string>('')

watchEffect(() => {
  if (!isOpen.value) {
    currentStep.value = 'info'
    boxOpenHeader.value = ''
  }
})

const { terminateLicense, upgradePlan } = useApiAbstraction()

const emit = defineEmits(['update'])

const planIsBuyed = ref(false)
const subscriptionIsCanceled = ref(false)

const buyPlan = async () => {
  if (selectedPlan.value === null) return
  try {
    await upgradePlan(props.plan.keyId, selectedPlan.value.id)
  } catch (error) {
    console.error(error)
  }
}

const cancelPlan = async () => {
  if (props.plan.keyId === undefined) return
  try {
    await terminateLicense(props.plan.keyId)
    emit('update')
  } catch (error) {
    console.error(error)
  }
}

const planBuyHandler = () => {
  if (planIsBuyed.value) return
  planIsBuyed.value = true
  setTimeout(() => {
    planIsBuyed.value = false
    isOpen.value = false
    window.mitt.emit('tsxUserProfile:updateLicense')
  }, 5000)
}


const triggerProcessingModifyLicense = () => {
  currentStep.value = 'processingLicense'
  setTimeout(() => {
    emit('update')
    boxOpenHeader.value = ''
    currentStep.value = 'info'
    planBuyHandler()
  }, 5000)
}

const cancelSubscriptionHandler = () => {
  if (subscriptionIsCanceled.value) return
  subscriptionIsCanceled.value = true
  setTimeout(() => {
    subscriptionIsCanceled.value = false
    isOpen.value = false
    window.mitt.emit('tsxUserProfile:updateLicense')
  }, 5000)
}
const triggerCancelSubscription = () => {
  currentStep.value = 'processingCanceling'
  setTimeout(() => {
    emit('update')
    boxOpenHeader.value = ''
    currentStep.value = ''
    cancelSubscriptionHandler()
  }, 5000)
}

watchEffect(() => {
  if (currentStep.value === 'buynow') {
    buyPlan()
    triggerProcessingModifyLicense()
    return
  }
  if (currentStep.value === 'cancelSubscription') {
    cancelPlan()
    triggerCancelSubscription()
    return
  }
  if (['confirm', 'cancel'].includes(currentStep.value)) {
    boxOpenHeader.value = currentStep.value
  } else {
    boxOpenHeader.value = ''
  }
})
</script>

<template>
  <ProfileDetailBox
    :is-open="isOpen"
    class="subscriptionPlan"
  >
    <SubscriptionHeader
      :closed-header="!isOpen"
      :subscription-detail="subscriptionDetails"
      :override-header-step="boxOpenHeader"
      :read-only="readOnly"
      :inactive-license="plan.cbItemStatusId === 'DEA'"
      @header-event="isOpen = $event"
    />
    <template #body>
      <div v-if="isOpen" class="">
        <StatusMessage
          v-if="planIsBuyed || subscriptionIsCanceled"
          class="mb-4"
        >
          <template v-if="planIsBuyed">
            {{ t('subscriptionChanged') }}
          </template>
          <template v-if="subscriptionIsCanceled">
            {{ t('subscriptionCanceled') }}
          </template>
        </StatusMessage>
        <SubscriptionStepInfo
          v-if="currentStep === 'info'"
          :status="status"
          :subscription-plans="subscriptionPlans"
          :plan="plan"
          :read-only="readOnly"
          @trigger="currentStep = $event"
        />
        <SubscriptionStepChange
          v-if="status === 'active' && currentStep === 'change'"
          :status="status"
          :plan="plan"
          :read-only="readOnly"
          :subscription-plans="subscriptionPlans"
          @trigger="currentStep = $event"
          @selected-plan="selectedPlan = $event"
        />
        <SubscriptionStepConfirm
          v-if="status === 'active' && currentStep === 'confirm'"
          :status="status"
          :plan="plan"
          :selected-plan="selectedPlan?.name || ''"
          @trigger="currentStep = $event"
        />
        <div
          v-if="currentStep === 'processingLicense' || currentStep === 'processingCanceling'"
          class="flex gap-4 text-sm justify-center items-center text-gray-500"
        >
          <Spinner />...{{ t('processingModification') }}
        </div>
        <SubscriptionStepCancel
          v-if="status === 'active' && currentStep === 'cancel'"
          :status="status"
          :plan="plan"
          @trigger="currentStep = $event"
        />
      </div>
    </template>
  </ProfileDetailBox>
</template>
