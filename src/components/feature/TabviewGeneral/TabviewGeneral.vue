<script lang="ts" setup>
import TabviewHeader from '@/components/pure/TabviewHeader/TabviewHeader.vue'
import ProfileInfos from '@/components/feature/ProfileInfos/ProfileInfos.vue'
import Timezone from '@/components/feature/Timezone/Timezone.vue'
import { translator } from '@/composables/translator'
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userDataObj: {
    type: Object as () => IProfileUser,
    required: true
  },
  inactiveFieldsArr: {
    type: Array as () => string[],
    default: () => ['removeAccount']
  }
})

const updateTimezone = (event: string) => {
  window.mitt.emit('tsxUserProfile', {
    timezone: event
  })
}
</script>

<template>
  <div class="tabviewGeneral">
    <TabviewHeader>
      {{ translator('Sentence for general Tab') }}
    </TabviewHeader>
    <ProfileInfos :user-data="userDataObj" :inactive-fields="inactiveFieldsArr" />
    <Timezone
      v-if="!inactiveFieldsArr.includes('timezone')"
      :user-data="userDataObj"
      @update-timezone="updateTimezone"
    />
  </div>
</template>
