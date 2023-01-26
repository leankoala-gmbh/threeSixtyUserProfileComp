<script lang="ts" setup>
import { z } from 'zod'

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

const NamingSchema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3)
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
  return !NamingSchema.shape.firstname.safeParse(namingForm.firstname).success
    ? translator('Firstname must be at least 3 characters long')
    : ''
})

const lastNameIsValid = computed(() => {
  return !NamingSchema.shape.lastname.safeParse(namingForm.lastname).success
    ? translator('Lastname must be at least 3 characters long')
    : ''
})

const formIsValid = computed(()=> {
  return NamingSchema.safeParse(namingForm).success
})

const submitName = () => {
  if (!formIsValid.value) return
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
          class="@[660px]/tsxupmain:h-[38px] flex items-center"
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
            :is-disabled="!formIsValid"
          >
            {{ translator('Save') }}
          </GeneralButton>
        </div>
      </div>
    </form>
  </div>
</template>
