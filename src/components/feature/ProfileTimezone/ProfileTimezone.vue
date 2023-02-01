<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const updateTimezone = (event: string) => {
  window.mitt.emit('tsxUserProfile', {
    timezone: event
  })
}
</script>

<template>
  <ProfileDetailBox
    class="profilePassword"
  >
    <div class="p-6">
      <div class="text-base font-medium mb-4">
        {{ translator('timezone') }}
      </div>
      <div class="smoothGridBox">
        <Timezone
          :user-data="userData"
          @update-timezone="updateTimezone"
        />
      </div>
    </div>
  </ProfileDetailBox>
</template>
