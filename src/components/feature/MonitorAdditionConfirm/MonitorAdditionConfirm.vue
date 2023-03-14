<script lang="ts" setup>
import { TMonitorTypes, ILicensesServers } from '@/types/general.interfaces'
const props = defineProps({
  type:{
    type: String as ()=> TMonitorTypes,
    default: 'servers'
  },
  size:{
    type: Object as ()=> ILicensesServers,
    default: ()=>({})
  },
  quantity: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['handleStatus', 'handleBuy'])
</script>

<template>
  <div class="monitorAdditionConfirm">
    Current {{ type }} monitors amount: {{ size.count }}
    <DisplayChangeBox
      class="my-4"
      :title="t('additionalTypeChangeBox', {type: useTextHelper().capitalize(props.type)})"
      :start="size.count.toString()"
      :target="(size.count + quantity).toString()"
    />
    <p
      class="mb-4"
    >
      Cleverbridge info
    </p>
    <div class="flex gap-4">
      <GeneralButton @click="emit('handleBuy')">
        {{ t('additionalBuy') }}
      </GeneralButton>
      <GeneralButton
        variant="transparent"
        @click="emit('handleStatus','info')"
      >
        {{ t('back') }}
      </GeneralButton>
    </div>
  </div>
</template>
