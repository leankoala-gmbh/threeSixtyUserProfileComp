<script lang="ts" setup>
import FormInput from '@/components/base/FormInput/FormInput.vue'
import { translator } from '@/composables/translator'
import { reactive } from 'vue'

const submitName = () => {
  window.mitt.emit('tsxUserProfile', {
    firstname: 'John',
    lastname: 'Doe'
  })
}

const namingForm = reactive({
  firstname: '',
  lastname: ''
})

</script>

<template>
  <div>
    <h3 class="font-medium mb-4 text-lg">
      {{ translator('Sentence for user data') }}
    </h3>
    {{ namingForm }}
    <form @submit="submitName">
      <div class="tsxUp-grid-formRow mb-6">
        <label
          for=""
          class="block h-[38px] flex items-center"
        >{{ translator('Firstname') }}</label>
        <FormInput
          v-model="namingForm.firstname"
          name="firstname"
          type="text"
          error-string=""
        />
      </div>
      <div class="tsxUp-grid-formRow">
        <label
          for=""
          class="block h-[38px] flex items-center"
        >{{ translator('Lastname') }}</label>
        <FormInput
          v-model="namingForm.lastname"
          name="lastname"
          type="text"
        />
      </div>
    </form>
  </div>
</template>
