<script lang="ts" setup>
import { IApiError } from '@/types/general.interfaces'

const emit = defineEmits(['close'])

const password = ref('')
const error = ref('')

const canBeRemoved = ref(true)

const checkPassword = () => {
  const isValid = password.value.length === 0
  error.value = isValid ? t('emptyError') : ''
  canBeRemoved.value = isValid
}

const errorMsgFromApi = ref<IApiError>()

const handleRemove = async () => {
  errorMsgFromApi.value = undefined
  try {
    await useApiAbstraction().removeAccount(password.value)
    window.mitt.emit('tsxUserProfile:removeAccount')
  } catch (e: any) {
    errorMsgFromApi.value = e.response.data
  }
}
</script>

<template>
  <div class="removeAccountFormular">
    <div class="my-6">
      <div class="mt-6 mb-2">
        {{ t('enterPasswordConfirmRemove') }}
      </div>
      <FormInput
        v-model="password"
        name="passwordConfirm"
        type="password"
        :error-string="error"
        @input="checkPassword"
      />
    </div>
    <ApiError class="mb-4" :error-obj="errorMsgFromApi" />
    <GeneralButton
      :is-disabled="canBeRemoved"
      @click="handleRemove"
    >
      {{ t('removeAccountButton') }}
    </GeneralButton>
  </div>
</template>
