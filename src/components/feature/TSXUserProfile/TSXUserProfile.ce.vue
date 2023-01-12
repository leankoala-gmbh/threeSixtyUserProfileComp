<script lang="ts" setup>
import { onMounted } from 'vue'
import { Tabs, Tab } from 'vue3-tabs-component'
import mitt from 'mitt'
import { useCookies } from '@vueuse/integrations/useCookies'
import { setLanguage, translator } from '@/composables/translator'
import 'container-query-polyfill'
import { IProfileUser } from '@/types/general.interfaces'
import TabviewGeneral from '@/components/feature/TabviewGeneral/TabviewGeneral.vue'
import TabviewUserData from '@/components/feature/TabviewUserData/TabviewUserData.vue'
import TabviewLicense from '@/components/feature/TabviewLicense/TabviewLicense.vue'

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
      <tab name="General">
        <TabviewGeneral
          :user-data-obj="userDataObj"
          :inactive-fields-arr="inactiveFieldsArr"
        />
      </tab>
      <tab name="User Data">
        <TabviewUserData />
      </tab>
      <tab name="License">
        <TabviewLicense />
      </tab>
    </tabs>
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
