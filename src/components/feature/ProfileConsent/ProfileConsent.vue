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
    class="profileConsent"
  >
    <div class="profileDetail--hover m-2 rounded px-4 py-5 cursor-pointer smoothGridBox">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora maiores sapiente natus quae laborum temporibus dolorem ipsam beatae. Ipsa nulla odit veritatis voluptate libero voluptates doloribus. Quod, minus. Iusto, nesciunt.
    </div>
  </ProfileDetailBox>
</template>
