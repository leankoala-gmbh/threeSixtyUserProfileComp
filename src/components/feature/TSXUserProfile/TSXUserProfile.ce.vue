<script lang="ts" setup>
import type { IProfileUser } from '@/types/general.interfaces'
import { useCookies } from '@vueuse/integrations/useCookies'
import 'container-query-polyfill'
import mitt from 'mitt'
import { onMounted } from 'vue'

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

const userDataObj: IProfileUser = JSON.parse(props.userData)
const inactiveFieldsArr: string[] = JSON.parse(props.inactiveFields)
const cookies = useCookies(['locale'])
useApiAbstraction().setBaseUrl(props.baseApiUrl)

onMounted(() => {
  const cookieLang = cookies.get('locale')
  setLanguage(cookieLang || props.currentLanguage)
  debugEcho('TSXUserProfile userProfileData', userDataObj)
})

</script>

<template>
  <div class="@container/tsxupmain tsxUserProfile flex flex-col gap-2">
    <ProfileNaming
      v-if="!inactiveFields.includes('naming')"
      :user-data="userDataObj"
    />
    <ProfilePassword
      v-if="!inactiveFields.includes('password')"
      :user-data="userDataObj"
    />
    <ProfileTimezone
      v-if="!inactiveFields.includes('timezone')"
      :user-data="userDataObj"
    />
    <ProfileConsent
      v-if="!inactiveFields.includes('consent')"
      :user-data="userDataObj"
    />
    <ProfileRemove
      v-if="!inactiveFields.includes('removeAccount')"
      :user-data="userDataObj"
    />
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
