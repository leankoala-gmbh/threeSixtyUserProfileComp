<script lang="ts" setup>
import { useApiAbstraction } from '@/composables/apiAbstraction/apiAbstraction'
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  },
  overrideBaseApiUrl: {
    type: String,
    default: ''
  }
})

const passwordForm = reactive<{[key: string]: string}>({
  currentPassword: '',
  newPassword: '',
  newPasswordRepeat: ''
})

const error = reactive<{current: string, new: string}>({
  current: '',
  new: ''
})

const canBeSaved = reactive<{current:boolean, new:boolean}>({
  current: false,
  new: false
})

const checkCurrentPassword = () => {
  const isValid = passwordForm.currentPassword.length >=8
  error.current = isValid
    ? ''
    : translator('passwordMinLength8')
  canBeSaved.current = isValid
}

const checkNewPasswordMatch = () => {
  const isValid = passwordForm.newPassword.length >= 8 && passwordForm.newPassword === passwordForm.newPasswordRepeat
  error.new = isValid
    ? ''
    : translator('passwordsNotMatch')
  canBeSaved.new = isValid
}

const checkCanBeSaved = computed(() => {
  return canBeSaved.current && canBeSaved.new
})

const successForm = ref(false)

const submitPassword = async () => {
  if (!canBeSaved) return

  await useApiAbstraction(props.overrideBaseApiUrl)
    .changePassword(passwordForm.currentPassword, passwordForm.newPassword, props.userData?.sessionToken||'')
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
          :is-disabled="!checkCanBeSaved"
        >
          {{ translator('save') }}
        </GeneralButton>
      </div>
    </form>
  </div>
</template>
