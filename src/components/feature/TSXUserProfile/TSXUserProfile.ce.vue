<script lang="ts" setup>
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

const overrideBaseApiUrl = props.overrideBaseApiUrl?.length ? props.overrideBaseApiUrl : ''

const boxToOpen = ref<string|null>(null)

const checkRoute = () => {
  const query = window.location.hash?.length ? window.location.hash.slice(1) : null
  const routeTargets = ['naming', 'password', 'remove', 'license']
  if (query && routeTargets.includes(query)) {
    boxToOpen.value = query
  }
}

const userDataObj = ref({})

const getUserProfile = async () => {
  const data = await useApiAbstraction(overrideBaseApiUrl).getProfile()
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

</script>

<template>
  <div class="@container/tsxupmain tsxUserProfile flex flex-col gap-2">
    <template v-if="Object.keys(userDataObj).length">
      <ProfileNaming
        v-if="!inactiveFieldsArr.includes('naming')"
        :user-data="userDataObj"
        :open="boxToOpen === 'naming'"
        :override-base-api-url="overrideBaseApiUrl"
      />
      <ProfilePassword
        v-if="!inactiveFieldsArr.includes('password')"
        id="password"
        :user-data="userDataObj"
        :open="boxToOpen === 'password'"
        :override-base-api-url="overrideBaseApiUrl"
      />
      <ProfileTimezone
        v-if="!inactiveFieldsArr.includes('timezone')"
        id="timezone"
        :user-data="userDataObj"
        :override-base-api-url="overrideBaseApiUrl"
      />
      <ProfileConsent
        v-if="!inactiveFieldsArr.includes('consent')"
        id="consent"
        :user-data="userDataObj"
        :override-base-api-url="overrideBaseApiUrl"
      />
      <ProfileRemove
        v-if="!inactiveFieldsArr.includes('removeAccount')"
        id="remove"
        :user-data="userDataObj"
        :open="boxToOpen === 'remove'"
        :override-base-api-url="overrideBaseApiUrl"
      />
    </template>
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
