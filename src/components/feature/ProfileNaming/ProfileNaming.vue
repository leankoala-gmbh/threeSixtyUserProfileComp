<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const isOpen = ref(false)
</script>

<template>
  <ProfileDetailBox
    :is-open="isOpen"
    class="profileNaming"
  >
    <div v-if="!isOpen" class="flex justify-between p-6">
      <div class="flex gap-4 items-center text-sm">
        <ProfileAvatar :user-data="userData" />
        <div>
          <div class="font-medium">
            {{ userData.name }}
          </div>
          <div class="text-gray-400">
            {{ userData.email }}
          </div>
        </div>
      </div>
      <GeneralButton variant="ghost" @click="isOpen = true">
        {{ translator('Edit') }}
      </GeneralButton>
    </div>
    <ProfileBoxHeader v-else @close="isOpen = false">
      {{ translator('editPersonalInformation') }}
    </ProfileBoxHeader>
    <template #body>
      <ProfileAvatar :user-data="userData" class="mb-6" />
      <NamingFormular :user-data="userData" />
    </template>
  </ProfileDetailBox>
</template>
