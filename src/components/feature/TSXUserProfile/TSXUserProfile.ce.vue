<script lang="ts" setup>
import type { IProfileUser } from '@/types/general.interfaces'
import { useCookies } from '@vueuse/integrations/useCookies'
import 'container-query-polyfill'
import mitt from 'mitt'
import { onMounted } from 'vue'
import { useApiAbstraction } from '@/composables/apiAbstraction/apiAbstraction'

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
  userEmail: {
    type: String,
    required: true
  },
  userGravatar: {
    type: String,
    required: true
  },
  overrideBaseApiUrl: {
    type: String,
    default: ''
  },
  inactiveFields: {
    type: String,
    default: '["removeAccount"]'
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

// const userDataObj: IProfileUser = JSON.parse(props.userData)
const userDataObj = ref({})

const getUserProfile = async () => {
  const data = await useApiAbstraction().getProfile()
  userDataObj.value = { ...data, email: props.userEmail, gravatar: props.userGravatar }
}

const inactiveFieldsArr: string[] = JSON.parse(props.inactiveFields)
const cookies = useCookies(['locale'])

onMounted(() => {
  getUserProfile()
  const cookieLang = cookies.get('locale')
  setLanguage(cookieLang || props.currentLanguage)
  checkRoute()
  debugEcho('TSXUserProfile userProfileData', userDataObj)
})

provide('overrideBaseApiUrl', props.overrideBaseApiUrl?.length ? props.overrideBaseApiUrl : null)

</script>

<template>
  <div class="@container/tsxupmain tsxUserProfile flex flex-col gap-2">
    <template v-if="Object.keys(userDataObj).length">
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
    </template>
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
