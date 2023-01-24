<script lang="ts" setup>
import type { IProfileUser } from '@/types/general.interfaces'

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
