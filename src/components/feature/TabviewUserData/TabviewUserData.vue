<script lang="ts" setup>
import { z } from 'zod'
import { useApiAbstraction } from '@/composables/apiAbstraction/apiAbstraction'

const props = defineProps({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  nickName: {
    type: String,
    default: ''
  }
})

const NamingSchema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  nickname: z.string().optional()
})

const namingForm = reactive<{[key: string]: string}>({
  firstname: '',
  lastname: '',
  nickname: ''
})

onMounted(() => {
  namingForm.firstname = props.firstName
  namingForm.lastname = props.lastName
  namingForm.nickname = props.lastName
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

const nickNameIsValid = computed(() => {
  return !NamingSchema.shape.nickname.safeParse(namingForm.nickname).success
    ? translator('Nickname must be at least 3 characters long')
    : ''
})

const formIsValid = computed(()=> {
  return NamingSchema.safeParse(namingForm).success
})

const submitName = async () => {
  if (!formIsValid.value) return
  const response = await useApiAbstraction().post('/user/name', namingForm)
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
      <div class="tsxUp-grid-formRow mb-6">
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
      <div class="tsxUp-grid-formRow">
        <label
          class="@tsxupmain[660px]:h-[38px]  flex items-center"
        >{{ translator('Nickname') }}</label>
        <FormInput
          v-model="namingForm.nickname"
          name="nickname"
          type="text"
          :error-string="nickNameIsValid"
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
