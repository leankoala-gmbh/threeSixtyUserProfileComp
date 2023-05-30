<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  },
  inactiveFields: {
    type: Array as () => string[],
    default: () => []
  }
})

const boxToOpen = ref<string|null>(null)

const checkRoute = () => {
  const query = window.location.hash?.length ? window.location.hash.slice(1) : null
  const routeTargets = ['naming', 'password', 'remove', 'license']
  if (query && routeTargets.includes(query)) {
    boxToOpen.value = query
  }
}

onMounted(() => {
  checkRoute()
})

const userDataObj = ref<IProfileUser>({})
userDataObj.value = { ...props.userData }

const updateName = (payload: {firstName: string, familyName: string}) => {
  userDataObj.value.firstName = payload.firstName
  userDataObj.value.familyName = payload.familyName
}
const updateTimezone = (payload: {timezone: string}) => {
  userDataObj.value.timezone = payload.timezone
}
</script>

<template>
  <template v-if="Object.keys(userDataObj).length">
    <ProfileNaming
      v-if="!inactiveFields.includes('naming')"
      :user-data="userDataObj"
      :open="boxToOpen === 'naming'"
      @update="updateName"
    />
    <ProfileIds
      v-if="!inactiveFields.includes('ids')"
      :user-data="userDataObj"
    />
    <ProfilePassword
      v-if="!inactiveFields.includes('password')"
      id="password"
      :user-data="userDataObj"
      :open="boxToOpen === 'password'"
    />
    <ProfileTimezone
      v-if="!inactiveFields.includes('timezone')"
      id="timezone"
      :user-data="userDataObj"
      @update="updateTimezone"
    />
    <ProfileConsent
      v-if="!inactiveFields.includes('consent')"
      id="consent"
      :user-data="userDataObj"
    />
    <ProfileRemove
      v-if="!inactiveFields.includes('removeAccount')"
      id="remove"
      :user-data="userDataObj"
      :open="boxToOpen === 'remove'"
    />
  </template>
</template>

<style>
  .viewProfile {}
</style>
