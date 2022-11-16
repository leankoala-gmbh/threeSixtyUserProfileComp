<script lang="ts" setup>
import { onMounted } from 'vue'
import mitt from 'mitt'
import { useCookies } from '@vueuse/integrations/useCookies'
import { setLanguage, translator } from '@/composables/translator'
import TSXUserProfileTimezone from '@/components/feature/TSXUserProfileTimezone/TSXUserProfileTimezone.vue'
import 'container-query-polyfill'
import TSXUserProfileInfos from '@/components/feature/TSXUserProfileInfos/TSXUserProfileInfos.vue'

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
  }
})

const userDataObj = JSON.parse(props.userData)
const inactiveFieldsArr: string[] = JSON.parse(props.inactiveFields)

const cookies = useCookies(['locale'])

const updateTimezone = (event: string) => {
  window.mitt.on('tsxUserProfile', {
    timezone: event
  })
}

onMounted(() => {
  const cookieLang = cookies.get('locale')
  setLanguage(cookieLang ||props.currentLanguage)
})
</script>

<template>
  <div class="@container/tsxupmain tsxUserProfile">
    <h2 class="text-3xl font-medium mb-6">
      {{ translator('AccountDetails') }}
    </h2>
    <TSXUserProfileInfos
      :user-data="userDataObj"
      :inactive-fields="inactiveFieldsArr"
    />
    <TSXUserProfileTimezone
      v-if="!inactiveFieldsArr.includes('timezone')"
      :user-data="userDataObj"
      @update-timezone="updateTimezone"
    />
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
