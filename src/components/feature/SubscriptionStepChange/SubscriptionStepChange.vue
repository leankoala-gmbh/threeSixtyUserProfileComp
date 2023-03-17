subscriptionStepChange

<script lang="ts" setup>
import { ILicensesDetails, IPlanSelector, IPlans } from '@/types/general.interfaces'

const emit = defineEmits(['trigger', 'selectedPlan'])

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

const subscriptionPlans = ref<null|IPlanSelector[]>(null)
const subscriptionPlansOrder = ref<null|string[]>(null)

const getSubscriptionPlans = async() => {
  try {

    const { plans, planOrder } = await useApiAbstraction().getPlans()
    subscriptionPlans.value = plans
    subscriptionPlansOrder.value = planOrder
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getSubscriptionPlans()
})


const paymentLink = ref<string>(props.plan.changePaymentSubscriptionUrl)
const selectedPlan = ref<null|IPlanSelector>(null)
const statusHeadline = ref<string>('')
const statusText = ref<string>('')

const generateStatusText = () => {
  if (!selectedPlan.value) return

  const price = useLocalHelper().displayPrice(selectedPlan.value.price.gross, selectedPlan.value.price.currency)
  const vat = useLocalHelper().displayPrice(selectedPlan.value.price.vat, selectedPlan.value.price.currency)

  statusHeadline.value = t('chargedHeadline', {
    price,
    ie: t('incl'),
    vat
  })
  statusText.value = t('chargedText', {
    price,
    date: useLocalHelper().displayDate(String(new Date())),
    ie: t('incl'),
    interval: t('mo'),
    vat
  })
}

watchEffect(() => {
  emit('selectedPlan', selectedPlan.value)
  generateStatusText()
})


</script>

<template>
  <div class="subscriptionStepChange">
    <div class="flex gap-2 items-center mb-4">
      <h3 class="font-medium text-xl" :class="[ status === 'active' ? 'text-active' : '' ]">
        {{ plan.type }}
      </h3>
    </div>
    <p class="font-medium mb-2">
      {{ t('chooseNewPlan') }}
    </p>
    <template v-if="subscriptionPlans?.length">
      <PlanSelector
        class="mb-4"
        :plans="subscriptionPlans"
        current="pro"
        @update-plan="selectedPlan = $event"
      />
      <template v-if="selectedPlan">
        <AnnotationBox type="info" class="mb-4">
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
        <div class="flex gap-4 items-center">
          <GeneralButton
            class="mb-8"
            @click="emit('trigger', 'confirm')"
          >
            {{ t('confirmSubscription') }}
          </GeneralButton>
          <GeneralButton
            variant="transparent"
            class="mb-8"
            @click="emit('trigger', 'info')"
          >
            {{ t('back') }}
          </GeneralButton>
        </div>
        <p class="font-medium mb-2'">
          {{ t('payment') }}
        </p>
        <p class="mb-4">
          {{ t('paymentInfo') }}
        </p>
        <PaymentMethod
          class="mb-8"
          :plan-details="plan"
        />
        <CleverBridgeInfo />
      </template>
    </template>
  </div>
</template>
