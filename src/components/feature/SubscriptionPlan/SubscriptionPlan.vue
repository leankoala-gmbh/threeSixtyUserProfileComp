<script lang="ts" setup>
import { ILicensesDetails, IPlanSelector } from '@/types/general.interfaces'
import { planMatrix } from '@/data/planMatrix'

const props = defineProps({
  status: {
    type: String,
    default: 'active'
  },
  plan: {
    type: Object as () => ILicensesDetails,
    default: () => ({})
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

const selectPlanIds = computed(() => {
  const planIds = planMatrix.find((plan) => plan.name === props.plan.type)
  return planIds
})

const buyPlan = async () => {
  if (selectedPlan.value === null || !selectPlanIds.value) return
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

  } catch (error) {
    console.error(error)
  }
}

watchEffect(() => {
  if (currentStep.value === 'buynow') {
    buyPlan()
    boxOpenHeader.value = ''
    currentStep.value = 'info'
    return
  }
  if (currentStep.value === 'cancelSubscription') {
    cancelPlan()
    isOpen.value = false
    boxOpenHeader.value = ''
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
      @header-event="isOpen = $event"
    />
    <template #body>
      <div v-if="isOpen" class="">
        <SubscriptionStepInfo
          v-if="currentStep === 'info'"
          :status="status"
          :plan="plan"
          @trigger="currentStep = $event"
        />
        <SubscriptionStepChange
          v-if="status === 'active' && currentStep === 'change'"
          :status="status"
          :plan="plan"
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
