<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'
const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const consentConfirm = ref()
const savedConsent = ref(false)
const initConsent = ref(0)

const successInfo = () => {
  savedConsent.value = true
  setTimeout(() => {
    savedConsent.value = false
  }, 3000)
}

const saveCurrentConsent = () => {
  if (initConsent.value > 1) {
    successInfo()
  }
  initConsent.value += 1
}

const initialConsent = async () => {
  // await useApiAbstraction().getConsent().then((res) => {
  //   consentConfirm.value = res.data
  // })
  consentConfirm.value = Math.random() > 0.5
  saveCurrentConsent()
}

onMounted(() => {
  initialConsent()
})

watch(() => consentConfirm.value, (o, n) => {
  if (n !== o) {
    saveCurrentConsent()
  }
})
</script>

<template>
  <ProfileDetailBox
    class="profileConsent"
  >
    <div class="profileDetail--hover m-2 rounded px-4 py-5 cursor-pointer smoothGridBox">
      <StatusMessage
        v-if="savedConsent"
        :type="consentConfirm ? 'success' : 'error'"
        :timeout="3000"
        class="mb-4"
      >
        {{ consentConfirm ?
          translator('consentSuccess') :
          translator('consentRevoke')
        }}
      </StatusMessage>
      <label class="flex gap-4">
        <div class="pt-1">
          <input
            v-model="consentConfirm"
            :disabled="savedConsent"
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
