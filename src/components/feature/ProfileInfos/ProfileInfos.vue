<script lang="ts" setup>
import { translator } from '@/composables/translator'
import { IProfileUser } from '@/types/general.interfaces'
import { debugEcho } from '@/utils/echo'
import { computed } from 'vue'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  },
  inactiveFields: {
    type: Array as () => string[],
    default: () => []
  }
})
const nameInitials = computed(() => {
  if (!props.userData?.name?.length) {
    return ''
  }
  const name = props.userData.name.split(' ')
  return name.map((n) => n[0]).join('')
})

debugEcho('ProfileInfos UserData', props.userData)
</script>

<template>
  <div v-if="!inactiveFields.includes('avatar') && (userData.avatar || userData.name)" class="tsxUp-grid-formRow items-center mb-6">
    <div>{{ translator('Avatar') }}</div>
    <div>
      <div
        v-if="userData.avatar"
        class="h-40 w-40 rounded-full overflow-hidden flex items-center justify-center"
      >
        <img
          :src="userData.avatar"
          alt="avatar"
          class="w-full"
        >
      </div>
      <div v-else-if="userData.name" class="h-40 w-40 flex items-center justify-center rounded-full customAvatar font-medium uppercase">
        <div class="text-center">
          {{ nameInitials }}
        </div>
      </div>
    </div>
  </div>
  <div v-if="!inactiveFields.includes('email') && userData.email?.length" class="tsxUp-grid-formRow items-center mb-6">
    <div>{{ translator('Email') }}</div>
    <div class="font-medium">
      {{ userData.email }}
    </div>
  </div>
</template>
