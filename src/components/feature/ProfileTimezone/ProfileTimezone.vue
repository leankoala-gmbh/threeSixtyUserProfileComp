<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

</script>

<template>
  <ProfileDetailBox
    class="profilePassword"
  >
    <div class="p-6">
      <div class="text-base font-medium">
        {{ translator('updateTimezone') }}
      </div>
    </div>
  </ProfileDetailBox>
</template>
