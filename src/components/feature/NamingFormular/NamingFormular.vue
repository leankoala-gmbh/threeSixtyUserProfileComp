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

onMounted(() => {
  namingForm.firstname = props.userData?.firstname || ''
  namingForm.lastname = props.userData?.lastname || ''
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
  emit('update')
}

</script>

<template>
  <form class="namingFormular" @submit.prevent="submitName">
    <div class="mb-6">
      <label class="mb-1 block text-sm">{{ translator('Firstname') }}</label>
      <FormInput
        v-model="namingForm.firstname"
        name="firstname"
        type="text"
        :error-string="firstNameIsValid"
      />
    </div>
    <div class="mb-6">
      <label class="mb-1 block">{{ translator('Lastname') }}</label>
      <FormInput
        v-model="namingForm.lastname"
        name="lastname"
        type="text"
        :error-string="lastNameIsValid"
      />
    </div>
    <div class="mt-4">
      <GeneralButton
        variant="regular"
        type="submit"
        :is-disabled="!formIsValid"
      >
        {{ translator('Save') }}
      </GeneralButton>
    </div>
  </form>
</template>
