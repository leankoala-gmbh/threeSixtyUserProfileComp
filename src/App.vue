<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import TSXUserProfile from './components/feature/TSXUserProfile/TSXUserProfile.ce.vue'

const userData = {
  nickName: 'blubb',
  gravatar: 'https://www.gravatar.com/avatar/1e45f0572fb68149199a0acb56ccc3dc?s=40&d=mp',
  email: 'blubb@blubber.de',
  firstName: 'Firstblubb',
  familyName: 'Lastblubb',
  timezone: 'Africa/Addis_Ababa'
}
const inactiveFields = []
</script>


<template>
  <div class="p-12 bg-slate-600">
    <TSXUserProfile
      :user-data="JSON.stringify(userData)"
      :inactive-fields="JSON.stringify(inactiveFields)"
      override-base-api-url="https://stage.monitoring360.io"
    />
  </div>
</template>

