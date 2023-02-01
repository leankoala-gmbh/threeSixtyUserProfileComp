<script lang="ts" setup>
import type { IProfileUser } from '@/types/general.interfaces'
import { useCookies } from '@vueuse/integrations/useCookies'
import 'container-query-polyfill'
import mitt from 'mitt'
import { onMounted } from 'vue'

type TBoxRouteTypes = 'naming' | 'password' | 'remove' | 'license'

window.mitt = window.mitt || mitt()

const props = defineProps({
  baseApiUrl: {
    type: String,
    required: true
  },
  currentLanguage: {
    type: String,
    default: 'en'
  },
  userData: {
    type: String,
    required: true
  },
  inactiveFields: {
    type: String,
    default: '["removeAccount"]'
  },
  header: {
    type: String,
    default: 'Profile'
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

const userDataObj: IProfileUser = JSON.parse(props.userData)
const inactiveFieldsArr: string[] = JSON.parse(props.inactiveFields)
const cookies = useCookies(['locale'])

onMounted(() => {
  const cookieLang = cookies.get('locale')
  setLanguage(cookieLang || props.currentLanguage)
  checkRoute()
  debugEcho('TSXUserProfile userProfileData', userDataObj)
})

</script>

<template>
  <div class="@container/tsxupmain tsxUserProfile flex flex-col gap-2">
    <ProfileNaming
      v-if="!inactiveFieldsArr.includes('naming')"
      :user-data="userDataObj"
      :open="boxToOpen === 'naming'"
    />
    <ProfilePassword
      v-if="!inactiveFieldsArr.includes('password')"
      id="password"
      :user-data="userDataObj"
      :open="boxToOpen === 'password'"
    />
    <ProfileTimezone
      v-if="!inactiveFieldsArr.includes('timezone')"
      id="timezone"
      :user-data="userDataObj"
    />
    <ProfileConsent
      v-if="!inactiveFieldsArr.includes('consent')"
      id="consent"
      :user-data="userDataObj"
    />
    <ProfileRemove
      v-if="!inactiveFieldsArr.includes('removeAccount')"
      id="remove"
      :user-data="userDataObj"
      :open="boxToOpen === 'remove'"
    />
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
