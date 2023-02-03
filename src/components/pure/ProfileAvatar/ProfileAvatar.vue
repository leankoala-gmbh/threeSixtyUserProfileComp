<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const nameInitials = computed(() => {
  if (props.userData.gravatar?.length || !props.userData.name?.length) {
    return ''
  }
  const name = props.userData.name.split(' ')
  return name.map((n) => n[0]).join('')
})
</script>

<template>
  <div
    v-if="userData.gravatar?.length"
    class="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center"
  >
    <img
      :src="userData.gravatar"
      alt="avatar"
      class="w-full"
    >
  </div>
  <div
    v-else
    class="h-10 w-10 flex items-center justify-center rounded-full customAvatar font-medium uppercase text-sm"
  >
    <div class="text-center">
      {{ nameInitials }}
    </div>
  </div>
</template>
