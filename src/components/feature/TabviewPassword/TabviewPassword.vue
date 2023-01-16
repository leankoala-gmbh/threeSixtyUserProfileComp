<script lang="ts" setup>
import { translator } from '@/composables/translator'
import TabviewHeader from '@/components/pure/TabviewHeader/TabviewHeader.vue'
import GeneralButton from '@/components/base/GeneralButton/GeneralButton.vue'
import { reactive } from 'vue'
import FormInput from '@/components/base/FormInput/FormInput.vue'

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

const submitPassword = () => {
  console.log('submitPassword')
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
          class="@tsxupmain[660px]:h-[38px] flex items-center"
        >{{ translator('Current Password') }}</label>
        <FormInput
          v-model="passwordForm.currentPassword"
          name="currentPassword"
          type="password"
          error-string=""
        />
      </div>
      <div class="tsxUp-grid-formRow mb-6">
        <label
          class="@tsxupmain[660px]:h-[38px]  flex items-center"
        >{{ translator('New Password') }}</label>
        <FormInput
          v-model="passwordForm.newPassword"
          name="currentPassword"
          type="password"
          error-string=""
        />
      </div>
      <div class="tsxUp-grid-formRow mb-6">
        <label class="@tsxupmain[660px]:h-[38px]  flex items-center">
          {{ translator('New Password') }}</label>
        <FormInput
          v-model="passwordForm.newPasswordRepeat"
          name="currentPasswordRepeat"
          type="password"
          error-string=""
        />
      </div>
    </form>
  </div>
</template>
