<script lang="ts" setup>
import { IPlanSelector } from '@/types/general.interfaces'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

const props = defineProps({
  plans: {
    type: Array as () => IPlanSelector[],
    default: () => []
  },
  current: {
    type: String,
    default: ''
  }
})

const selected = ref<IPlanSelector>()

onMounted(() => {
  selected.value = props.plans.find((plan) => plan.id === props.current)
})
</script>

<template>
  <div class="planSelector">
    <RadioGroup v-model="selected">
      <RadioGroupLabel class="sr-only">
        Pricing plans
      </RadioGroupLabel>
      <div class="relative -space-y-px rounded-md bg-white">
        <RadioGroupOption
          v-for="(plan, planIdx) in plans"
          :key="plan.id"
          v-slot="{ checked, active }"
          as="template"
          :value="plan"
        >
          <div
            :class="[
              planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
              planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
              checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200',
              'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'
            ]"
          >
            <span class="flex items-center text-sm">
              <span
                :class="[
                  checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300',
                  active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                  'h-4 w-4 rounded-full border flex items-center justify-center'
                ]"
                aria-hidden="true"
              >
                <span class="rounded-full bg-white w-1.5 h-1.5" />
              </span>
              <RadioGroupLabel
                as="span"
                :class="[
                  checked ? 'text-indigo-900' : 'text-gray-900',
                  'ml-3 font-medium'
                ]"
              >
                {{ plan.name }}
              </RadioGroupLabel>
            </span>
            <RadioGroupDescription
              as="span"
              class="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
            >
              <span
                :class="[
                  checked ? 'text-indigo-900' : 'text-gray-900',
                  'font-medium'
                ]"
              >
                {{ plan.price }} / mo
              </span>
              {{ ' ' }}
            </RadioGroupDescription>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>

<style>
  .planSelector {}
</style>
