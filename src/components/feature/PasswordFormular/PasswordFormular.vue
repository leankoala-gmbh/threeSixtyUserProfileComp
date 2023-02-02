<script lang="ts" setup>
import { useApiAbstraction } from '@/composables/apiAbstraction/apiAbstraction'

const passwordForm = reactive<{[key: string]: string}>({
  currentPassword: '',
  newPassword: '',
  newPasswordRepeat: ''
})

const error = reactive<{current: string, new: string}>({
  current: '',
  new: ''
})

const checkCurrentPassword = () => {
  const isValid = passwordForm.currentPassword.length >=8
  error.current = isValid
    ? ''
    : translator('passwordMinLength8')
}
const checkNewPasswordMatch = () => {
  const isValid = passwordForm.newPassword.length >= 8 && passwordForm.newPassword === passwordForm.newPasswordRepeat
  error.new = isValid
    ? ''
    : translator('passwordsNotMatch')
}
const passwordCanSaved = computed(() => {
  return error.current === '' && error.new === ''
})

const successForm = ref(false)

const submitPassword = async () => {
  console.log('hello')
  if (!passwordCanSaved.value) return

  const data = await useApiAbstraction().changePassword(passwordForm.currentPassword, passwordForm.newPassword)
  successForm.value = true
  setTimeout(() => {
    successForm.value = false
  }, 3000)
}
</script>

<template>
  <div class="passwordFormular">
    <StatusMessage v-if="successForm" class="mb-4">
      {{ translator('successChangePassword') }}
    </StatusMessage>
    <form @submit.prevent="submitPassword">
      <div class="mb-6">
        <label class="capitalize">{{ translator('currentPassword') }}</label>
        <FormInput
          id="currentPassword"
          v-model="passwordForm.currentPassword"
          name="currentPassword"
          type="password"
          :error-string="error.current"
          @input="checkCurrentPassword"
        />
      </div>
      <div class="mb-6">
        <label class="capitalize">{{ translator('newPassword') }}</label>
        <FormInput
          id="newPassword"
          v-model="passwordForm.newPassword"
          name="newPassword"
          type="password"
          @input="checkNewPasswordMatch"
        />
      </div>
      <div class="mb-6">
        <label class="capitalize"> {{ translator('newPasswordConfirm') }}</label>
        <FormInput
          id="newPasswordRepeat"
          v-model="passwordForm.newPasswordRepeat"
          name="newPasswordRepeat"
          type="password"
          :error-string="error.new"
          @input="checkNewPasswordMatch"
        />
      </div>
      <div>
        <GeneralButton
          type="submit"
          :is-disabled="!passwordCanSaved"
        >
          {{ translator('save') }}
        </GeneralButton>
      </div>
    </form>
  </div>
</template>
