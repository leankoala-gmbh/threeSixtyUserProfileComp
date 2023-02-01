<script lang="ts" setup>
import { useApiAbstraction } from '@/composables/apiAbstraction/apiAbstraction'

const passwordForm = reactive<{[key: string]: string}>({
  currentPassword: '',
  newPassword: '',
  newPasswordRepeat: ''
})

const checkCurrentPassword = computed(() => {
  return passwordForm.currentPassword.length >= 8
    ? ''
    : translator('Password must be at least 8 characters long')
})

const checkNewPassword = computed(() => {
  return passwordForm.newPassword.length >= 8 && passwordForm.newPassword === passwordForm.newPasswordRepeat
    ? ''
    : translator('passwordsNotMatch')
})

const passwordCanSaved = computed(() => {
  return checkCurrentPassword.value === '' && checkNewPassword.value === ''
})

const successForm = ref(false)

const submitPassword = async () => {
  if (!passwordCanSaved.value) return

  const { error } = await useApiAbstraction()
    .changePassword(passwordForm.currentPassword, passwordForm.newPassword)

  if (error) {
    console.error(error)
    return
  }
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
        <label>{{ translator('Current Password') }}</label>
        <FormInput
          id="currentPassword"
          v-model="passwordForm.currentPassword"
          name="currentPassword"
          type="password"
          :error-string="checkCurrentPassword"
        />
      </div>
      <div class="mb-6">
        <label>{{ translator('New Password') }}</label>
        <FormInput
          id="newPassword"
          v-model="passwordForm.newPassword"
          name="newPassword"
          type="password"
        />
      </div>
      <div class="mb-6">
        <label> {{ translator('New Password') }}</label>
        <FormInput
          id="newPasswordRepeat"
          v-model="passwordForm.newPasswordRepeat"
          name="newPasswordRepeat"
          type="password"
          :error-string="checkNewPassword"
        />
      </div>
      <div>
        <GeneralButton
          type="submit"
          :is-disabled="!passwordCanSaved"
          @click="submitPassword"
        >
          {{ translator('save') }}
        </GeneralButton>
      </div>
    </form>
  </div>
</template>
