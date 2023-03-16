<script lang="ts" setup>
import { ILicensesDetails } from '@/types/general.interfaces'

const emit = defineEmits(['trigger'])

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
</script>

<template>
  <div class="subscriptionStepInfo">
    <div class="flex gap-2 items-center mb-2">
      <h3
        class="font-medium text-xl"
        :class="[ status === 'active' ? 'text-active' : '' ]"
      >
        {{ plan.type }}
      </h3>
      <SimpleLabel :type="status">
        {{ t(status) }}
      </SimpleLabel>
    </div>
    <BillingLine
      class="mb-4"
      :date="plan.nextBillingDate"
      :status="plan.status"
      :price="plan.renewalCostGross"
      :currency="plan.renewalCurrency"
    />
    <div v-if="props.status === 'active'">
      <div class="flex gap-2 items-center mb-6">
        <GeneralButton @click="emit('trigger', 'change')">
          {{ t('changePlan') }}
        </GeneralButton>
        <GeneralButton
          variant="transparent"
          @click="emit('trigger', 'cancel')"
        >
          {{ t('cancelSubscription') }}
        </GeneralButton>
      </div>
      <PaymentMethod
        class="mb-8"
        :plan-details="plan"
      />
    </div>
  </div>
</template>
