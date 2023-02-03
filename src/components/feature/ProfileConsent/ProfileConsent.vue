<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const savedConsent = ref(false)
const initalState = ref(false)


const getInitialConsent = async () => {
  try {
    const { enabled } = await useApiAbstraction().getConsent()
    savedConsent.value = enabled
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  getInitialConsent()
})

const consentConfirm = computed(() => {
  return savedConsent.value ? translator('consentSuccess') : translator('consentRevoke')
})

const disabledCheckbox = ref(false)
const statusState = ref(false)

const statusSwtich = () => {
  statusState.value = true
  setTimeout(() => {
    statusState.value = false
  }, 3000)
}

const saveConsent = async () => {
  try {
    disabledCheckbox.value = true
    await useApiAbstraction().setConsent(savedConsent.value)
    statusSwtich()
  } catch (e) {
    console.error(e)
  } finally {
    disabledCheckbox.value = false
  }
}

watch(() => savedConsent.value, () => {
  if (!initalState.value) {
    initalState.value = true
    return
  }
  saveConsent()
})
</script>

<template>
  <ProfileDetailBox
    class="profileConsent"
  >
    <div class="profileDetail--hover m-2 rounded px-4 py-5 cursor-pointer smoothGridBox">
      <StatusMessage
        v-if="statusState"
        type="success"
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
