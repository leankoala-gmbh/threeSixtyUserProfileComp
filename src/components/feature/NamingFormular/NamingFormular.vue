<script lang="ts" setup>
import { z } from 'zod'
import { useApiAbstraction } from '@/composables/apiAbstraction/apiAbstraction'
import { IProfileUser } from '@/types/general.interfaces'

const emit = defineEmits(['update'])

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
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

const error = reactive<{firstname: string, lastname: string}>({
  firstname: '',
  lastname: ''
})

onMounted(() => {
  namingForm.firstname = props.userData?.firstname || ''
  namingForm.lastname = props.userData?.lastname || ''
})

const firstNameIsValid = () => {
  const isValid = !NamingSchema.shape.firstname.safeParse(namingForm.firstname).success
  error.firstname= isValid
    ? translator('firstNameError')
    : ''
}

const lastNameIsValid = () => {
  const isValid = !NamingSchema.shape.lastname.safeParse(namingForm.lastname).success
  error.lastname = isValid
    ? translator('lastNameError')
    : ''
}


const formIsValid = computed(()=> {
  return NamingSchema.safeParse(namingForm).success
})

const submitName = async () => {
  if (!formIsValid.value) return
  const payload = {
    firstName: namingForm.firstname,
    familyName: namingForm.lastname,
    nickname: '',
    timezone: ''
  }
  try {
    await useApiAbstraction().setProfile(payload)
    emit('update')
  } catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <form class="namingFormular" @submit.prevent="submitName">
    <div class="mb-6">
      <label class="mb-1 block text-sm">{{ translator('firstName') }}</label>
      <FormInput
        v-model="namingForm.firstname"
        name="firstname"
        type="text"
        :error-string="error.firstname"
        @input="firstNameIsValid"
      />
    </div>
    <div class="mb-6">
      <label class="mb-1 block">{{ translator('lastName') }}</label>
      <FormInput
        v-model="namingForm.lastname"
        name="lastname"
        type="text"
        :error-string="error.lastname"
        @input="lastNameIsValid"
      />
    </div>
    <div class="mt-4">
      <GeneralButton
        variant="regular"
        type="submit"
        :is-disabled="!formIsValid"
      >
        {{ translator('save') }}
      </GeneralButton>
    </div>
  </form>
</template>
