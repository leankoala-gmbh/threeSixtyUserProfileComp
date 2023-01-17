<script lang="ts" setup>
const props = defineProps({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  }
})

const namingForm = reactive<{[key: string]: string}>({
  firstname: '',
  lastname: ''
})

onMounted(() => {
  namingForm.firstname = props.firstName
  namingForm.lastname = props.lastName
})

const firstNameIsValid = computed(() => {
  const isValid = validateMinLength(namingForm.firstname, 3)
  return !isValid
    ? translator('Firstname must be at least 3 characters long')
    : ''
})

const lastNameIsValid = computed(() => {
  const isValid = validateMinLength(namingForm.lastname, 3)
  return !isValid
    ? translator('Lastname must be at least 3 characters long')
    : ''
})

const submitName = () => {
  console.log('submitName')
}
</script>

<template>
  <div>
    <TabviewHeader>
      {{ translator('Sentence for user data') }}
      <template #subline>
        hello world
      </template>
    </TabviewHeader>
    <form @submit.stop="submitName">
      <div class="tsxUp-grid-formRow mb-6">
        <label
          class="@[660px]/tsxupmain:h-[38px]  flex items-center"
        >{{ translator('Firstname') }}</label>
        <FormInput
          v-model="namingForm.firstname"
          name="firstname"
          type="text"
          :error-string="firstNameIsValid"
        />
      </div>
      <div class="tsxUp-grid-formRow">
        <label
          class="@tsxupmain[660px]:h-[38px]  flex items-center"
        >{{ translator('Lastname') }}</label>
        <FormInput
          v-model="namingForm.lastname"
          name="lastname"
          type="text"
          :error-string="lastNameIsValid"
        />
      </div>
      <div class="tsxUp-grid-formRow mt-4">
        <div />
        <div>
          <GeneralButton
            type="submit"
            :is-disabled="!!firstNameIsValid.length || !!lastNameIsValid.length"
          >
            {{ translator('Save') }}
          </GeneralButton>
        </div>
      </div>
    </form>
  </div>
</template>
