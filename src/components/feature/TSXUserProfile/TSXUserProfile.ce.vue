<script lang="ts" setup>
import { onMounted } from 'vue'
import mitt from 'mitt'
import { useCookies } from '@vueuse/integrations/useCookies'
import { setLanguage, translator } from '@/composables/translator'
import Timezone from '@/components/feature/Timezone/Timezone.vue'
import 'container-query-polyfill'
import ProfileInfos from '@/components/feature/ProfileInfos/ProfileInfos.vue'
import { IProfileUser } from '@/types/general.interfaces'

window.mitt = window.mitt || mitt()

const props = defineProps({
  /**
   * Current language of the application
   */
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

const updateTimezone = (event: string) => {
  window.mitt.emit('tsxUserProfile', {
    timezone: event
  })
}

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
    <ProfileInfos
      :user-data="userDataObj"
      :inactive-fields="inactiveFieldsArr"
    />
    <Timezone
      v-if="!inactiveFieldsArr.includes('timezone')"
      :user-data="userDataObj"
      @update-timezone="updateTimezone"
    />
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
