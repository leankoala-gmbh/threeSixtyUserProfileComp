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
    class="profileRemove"
  >
    <div v-if="!isOpen" class="profileDetail--hover m-2 rounded px-4 py-5 cursor-pointer">
      <div class="flex justify-between">
        <div>
          <div class="text-base font-medium mb-2">
            {{ translator('removeAccount') }}
          </div>
          <p class="text-sm text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa vel aliquid dolorem sint accusantium quo facere nobis nam quasi, fugit voluptate nulla labore enim quis expedita nemo doloribus. Dolor, veniam!
          </p>
        </div>

        <button
          class="w-10 h-10 flex items-center justify-center"
          @click="isOpen = true"
        >
          <svg
            class="w-4 h-4"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.25 12.875C1.00391 12.875 0.785156 12.793 0.621094 12.6289C0.265625 12.3008 0.265625 11.7266 0.621094 11.3984L5.24219 6.75L0.621094 2.12891C0.265625 1.80078 0.265625 1.22656 0.621094 0.898438C0.949219 0.542969 1.52344 0.542969 1.85156 0.898438L7.10156 6.14844C7.45703 6.47656 7.45703 7.05078 7.10156 7.37891L1.85156 12.6289C1.6875 12.793 1.46875 12.875 1.25 12.875Z" fill="#677489" />
          </svg>
        </button>
      </div>
    </div>
    <ProfileBoxHeader
      v-else
      class="my-1"
      @close="isOpen = false"
    >
      {{ translator('removeAccount') }}
    </ProfileBoxHeader>
    <template #body>
      cccc
    </template>
  </ProfileDetailBox>
</template>

<style>
  .profileRemove {}
</style>
