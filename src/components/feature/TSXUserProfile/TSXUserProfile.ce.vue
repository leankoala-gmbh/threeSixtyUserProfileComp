<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'
import { useCookies } from '@vueuse/integrations/useCookies'
import 'container-query-polyfill'
import mitt from 'mitt'
import { onMounted } from 'vue'
import { Tab, Tabs } from 'vue3-tabs-component'

window.mitt = window.mitt || mitt()

const props = defineProps({
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

onMounted(() => {
  const cookieLang = cookies.get('locale')
  setLanguage(cookieLang || props.currentLanguage)
})
</script>

<template>
  <div class="@container/tsxupmain tsxUserProfile">
    <h2 v-if="header?.length" class="text-3xl font-medium mb-6">
      {{ translator('Profile') }}
    </h2>
    <tabs>
      <tab :name="translator('General Tab')">
        <TabviewGeneral
          :user-data-obj="userDataObj"
          :inactive-fields-arr="inactiveFieldsArr"
        />
      </tab>
      <tab :name="translator('Name Tab')">
        <TabviewUserData />
      </tab>
      <tab :name="translator('Password Tab')">
        <TabviewPassword />
      </tab>
      <tab :name="translator('License Tab')">
        <TabviewLicense />
      </tab>
    </tabs>
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
