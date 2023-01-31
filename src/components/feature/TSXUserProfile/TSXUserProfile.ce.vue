<script lang="ts" setup>
import type { IProfileUser } from '@/types/general.interfaces'
import { useCookies } from '@vueuse/integrations/useCookies'
import 'container-query-polyfill'
import mitt from 'mitt'
import { onMounted } from 'vue'
import { Tab, Tabs } from 'vue3-tabs-component'

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
  <div class="@container/tsxupmain tsxUserProfile">
    <h2 v-if="header?.length" class="text-3xl font-medium mb-6">
      {{ translator('Profile') }}
    </h2>
    <tabs
      :options="{ useUrlFragment: false }"
    >
      <tab :name="translator('General Tab')">
        <TabviewGeneral
          :user-data-obj="userDataObj"
          :inactive-fields-arr="inactiveFieldsArr"
        />
      </tab>
      <tab
        v-if="!inactiveFields.includes('naming')"
        :name="translator('Name Tab')"
      >
        <TabviewUserData />
      </tab>
      <tab
        v-if="!inactiveFields.includes('password')"
        :name="translator('Password Tab')"
      >
        <TabviewPassword />
      </tab>
      <tab
        v-if="!inactiveFields.includes('license')"
        :name="translator('License Tab')"
      >
        <TabviewLicense :base-api-url="baseApiUrl" />
      </tab>
    </tabs>
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
