<script lang="ts" setup>
import { IApiError } from '@/types/general.interfaces'

const emit = defineEmits(['close'])

const password = ref('')
const error = ref('')

const canBeRemoved = ref(true)

const checkPassword = () => {
  const isValid = password.value.length === 0
  error.value = isValid ? translator('emptyError') : ''
  canBeRemoved.value = isValid
}

const errorMsgFromApi = ref<IApiError>()

const handleRemove = async () => {
  errorMsgFromApi.value = undefined
  try {
    await useApiAbstraction().deleteUser()
  } catch (e: any) {
    console.log('error', e)
    errorMsgFromApi.value = e.response.data
  }
}
</script>

<template>
  <div class="removeAccountFormular">
    <div class="my-6">
      <div class="mt-6 mb-2">
        {{ translator('enterPasswordConfirmRemove') }}
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
      {{ translator('removeAccountButton') }}
    </GeneralButton>
  </div>
</template>
