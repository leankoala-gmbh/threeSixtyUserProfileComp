<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const savedConsent = ref(false)

// const getInitialConsent = async () => {
//   try {
//     const res = await useApiAbstraction().getConsent()
//     savedConsent.value = true
//   } catch (e) {
//     console.error(e)
//   }
// }

// TODO: Remove this mocked function when API is ready
const getInitialConsent = () => {
  savedConsent.value = true
}

onMounted(() => {
  getInitialConsent()
})

const consentConfirm = computed(() => {
  return savedConsent.value ? translator('consentSuccess') : translator('consentRevoke')
})

const disabledCheckbox = ref(false)

const saveConsent = async () => {
  try {
    disabledCheckbox.value = true
    await useApiAbstraction().setConsent(savedConsent.value)
  } catch (e) {
    console.error(e)
  } finally {
    disabledCheckbox.value = false
  }
}

watch(() => savedConsent.value, () => {
  saveConsent()
})
</script>

<template>
  <ProfileDetailBox
    class="profileConsent"
  >
    <div class="profileDetail--hover m-2 rounded px-4 py-5 cursor-pointer smoothGridBox">
      <StatusMessage
        v-if="savedConsent"
        type="success"
        :timeout="3000"
        class="mb-4"
      >
        {{ consentConfirm }}
      </StatusMessage>
      <label class="flex gap-4">
        <div class="pt-1">
          <input
            v-model="savedConsent"
            type="checkbox"
            :disabled="disabledCheckbox"
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
