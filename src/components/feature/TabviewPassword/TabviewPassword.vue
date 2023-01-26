<script lang="ts" setup>
import { z } from 'zod'

const props = defineProps({
  currentPassword: {
    type: String,
    default: ''
  }
})

const passwordForm = reactive<{[key: string]: string}>({
  currentPassword: '',
  newPassword: '',
  newPasswordRepeat: ''
})

const PasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  newPasswordRepeat: z.string().min(8)
}).superRefine(({ newPassword, newPasswordRepeat }, ctx) => {
  if (newPassword !== newPasswordRepeat) {
    ctx.addIssue({
      code: 'custom',
      message: 'The passwords did not match'
    })
  }
})

onMounted(() => {
  passwordForm.currentPassword = props.currentPassword
})

const currentPasswordError = ref('')
const newPasswordError = ref('')
const passwordCanSaved = ref(false)

const checkAllPasswords = () => {
  const oldPassCheck = validateMinLength(passwordForm.currentPassword, 8)
  const newPassQualityCheck = (passwordForm.newPassword === passwordForm.newPasswordRepeat)
    && validatePasswordQuality(passwordForm.newPassword)

  currentPasswordError.value = !oldPassCheck
    ? translator('Password must be at least 8 characters long')
    : ''

  newPasswordError.value = !newPassQualityCheck
    ? translator('Passwords do not match')
    : ''

  passwordCanSaved.value = oldPassCheck && newPassQualityCheck
}

watch(() => passwordForm, () => {
  console.log(PasswordSchema.safeParse(passwordForm).success)
  checkAllPasswords()
}, { deep: true })


const submitPassword = () => {
  // console.log('submitPassword')
}

</script>

<template>
  <div class="tabviewPassword">
    <TabviewHeader>
      {{ translator('Sentence for passowrd') }}
    </TabviewHeader>
    <form @submit.stop="submitPassword">
      <div class="tsxUp-grid-formRow mb-6">
        <label
          class="@[660px]/tsxupmain:h-[38px] flex items-center"
        >{{ translator('Current Password') }}</label>
        <FormInput
          id="currentPassword"
          v-model="passwordForm.currentPassword"
          name="currentPassword"
          type="password"
          :error-string="currentPasswordError"
        />
      </div>
      <div class="tsxUp-grid-formRow mb-6">
        <label
          class="@[660px]/tsxupmain:h-[38px] flex items-center"
        >{{ translator('New Password') }}</label>
        <FormInput
          id="newPassword"
          v-model="passwordForm.newPassword"
          name="newPassword"
          type="password"
          :error-string="newPasswordError"
        />
      </div>
      <div class="tsxUp-grid-formRow mb-6">
        <label class="@[660px]/tsxupmain:h-[38px]  flex items-center">
          {{ translator('New Password') }}</label>
        <FormInput
          id="newPasswordRepeat"
          v-model="passwordForm.newPasswordRepeat"
          name="newPasswordRepeat"
          type="password"
          error-string=""
        />
      </div>
      <div class="tsxUp-grid-formRow">
        <div />
        <div>
          <GeneralButton
            :is-disabled="!passwordCanSaved"
            @click="submitPassword"
          >
            {{ translator('Save') }}
          </GeneralButton>
        </div>
      </div>
    </form>
  </div>
</template>
