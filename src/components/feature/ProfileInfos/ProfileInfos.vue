<script lang="ts" setup>
import { translator } from '@/composables/translator'
import { IProfileUser } from '@/types/general.interfaces'

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
</script>

<template>
  <div v-if="!inactiveFields.includes('avatar')" class="tsxUp-grid-formRow items-center mb-6">
    <div>{{ translator('Avatar') }}</div>
    <div>
      <div v-if="userData.avatar.includes('http')">
        <img :src="userData.avatar" alt="avatar">
      </div>
      <div v-else class="h-40 w-40 flex items-center justify-center rounded-full customAvatar font-medium uppercase">
        {{ userData.avatar }}
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
