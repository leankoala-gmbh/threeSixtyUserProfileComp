<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const consentConfirm = ref(false)
const success = ref(false)

watchEffect(() => {
  if (consentConfirm.value) {
    success.value = true
    console.log('consentConfirm', consentConfirm.value)
  } else {
    success.value = false
  }
})

</script>

<template>
  <ProfileDetailBox
    class="profileConsent"
  >
    <div class="profileDetail--hover m-2 rounded px-4 py-5 cursor-pointer smoothGridBox">
      <StatusMessage
        v-if="success"
        :timeout="3000"
        class="mb-4"
      >
        {{ translator('consentSuccess') }}
      </StatusMessage>
      <label class="flex gap-4">
        <div class="pt-1">
          <input
            v-model="consentConfirm"
            type="checkbox"
            aria-label="input"
          >
        </div>
        <div>
          <h3 class="font-medium mb-2 text-base">{{ translator('consentHeadline') }}</h3>
          <p class="text-gray-600 text-sm">{{ translator('consentBody') }}</p>
        </div>
      </label>
    </div>
  </ProfileDetailBox>
</template>
