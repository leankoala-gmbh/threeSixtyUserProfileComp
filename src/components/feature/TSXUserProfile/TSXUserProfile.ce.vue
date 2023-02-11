<script lang="ts" setup>
import { useCookies } from '@vueuse/integrations/useCookies'
import 'container-query-polyfill'
import mitt from 'mitt'
import { onMounted } from 'vue'
import { IProfileUser } from '@/types/general.interfaces'

type TViewTypes = 'profile' | 'license'

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
    default: '{}'
  },
  overrideBaseApiUrl: {
    type: String,
    default: ''
  },
  inactiveFields: {
    type: String,
    default: ''
  },
  view: {
    type: String as () => TViewTypes,
    default: 'profile'
  }
})

const overrideBaseApiUrl = props.overrideBaseApiUrl?.length ? props.overrideBaseApiUrl : ''

provide('overrideBaseApiUrl', overrideBaseApiUrl)

const userDataObj = ref<IProfileUser>({})
userDataObj.value = JSON.parse(props.userData)

debugEcho('TSXUserProfile userDataObj', userDataObj.value)

const inactiveFieldsArr: string[] = JSON.parse(props.inactiveFields)
const cookies = useCookies(['locale'])

onMounted(() => {
  const cookieLang = cookies.get('locale')
  setLanguage(cookieLang || props.currentLanguage)
  // checkRoute()
  debugEcho('TSXUserProfile userProfileData', userDataObj)
})

</script>

<template>
  <div class="@container/tsxupmain tsxUserProfile flex flex-col gap-2">
    {{ t('test' , {n: '299', m: '2w'}) }}
    <ViewProfile
      v-if="view === 'profile'"
      :user-data="userDataObj"
      :inactive-fields="inactiveFieldsArr"
    />
    <ViewLicense
      v-if="view === 'license'"
    />
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
