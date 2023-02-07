<script lang="ts" setup>
import { z } from 'zod'
import { useApiAbstraction } from '@/composables/apiAbstraction/apiAbstraction'
import { IProfileUser, IKeyValue, IApiError } from '@/types/general.interfaces'

const emit = defineEmits(['update'])

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const namingForm = reactive<IKeyValue>({
  firstName: '',
  familyName: ''
})

const error = reactive<IKeyValue>({
  firstName: '',
  familyName: ''
})

onMounted(() => {
  namingForm.firstName = props.userData?.firstName || ''
  namingForm.familyName = props.userData?.familyName || ''
})

const validateField = (field: string, errorMsg: string, minLength = 3) => {
  const isValid = field.length >= minLength
  return isValid ? '' : translator(errorMsg)
}

const firstNameIsValid = () => {
  error.firstName = validateField(namingForm.firstName, 'firstNameError')
}

const lastNameIsValid = () => {
  error.familyName = validateField(namingForm.familyName, 'lastNameError')
}

const formIsValid = computed(()=> {
  return namingForm.firstName.length >= 3 && namingForm.familyName.length >= 3
})

const errorMsgFromApi = ref<IApiError>()

const submitName = async () => {
  errorMsgFromApi.value = undefined
  const payload = {
    firstName: namingForm.firstName,
    familyName: namingForm.familyName,
    nickname: props.userData.nickname || '',
    timezone: props.userData.timezone || ''
  }
  try {
    await useApiAbstraction().setProfile(payload)
    emit('update', {
      firstName: namingForm.firstName,
      familyName: namingForm.familyName
    })
  } catch (e: any) {
    errorMsgFromApi.value = e.response.data
  }
}

</script>

<template>
  <form class="namingFormular" @submit.prevent="submitName">
    <div class="mb-6">
      <label class="mb-1 block text-sm">{{ translator('firstName') }}</label>
      <FormInput
        v-model="namingForm.firstName"
        name="firstname"
        type="text"
        :error-string="error.firstName"
        @input="firstNameIsValid"
      />
    </div>
    <div class="mb-6">
      <label class="mb-1 block">{{ translator('lastName') }}</label>
      <FormInput
        v-model="namingForm.familyName"
        name="familyName"
        type="text"
        :error-string="error.familyName"
        @input="lastNameIsValid"
      />
    </div>
    <ApiError class="mb-4" :error-obj="errorMsgFromApi" />
    <div class="mt-4">
      <GeneralButton
        variant="regular"
        type="submit"
        :is-disabled="!formIsValid"
      >
        {{ translator('save') }}
      </GeneralButton>
    </div>
  </form>
</template>
