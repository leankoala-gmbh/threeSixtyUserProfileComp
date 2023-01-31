<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import TSXUserProfile from './components/feature/TSXUserProfile/TSXUserProfile.ce.vue'

const userData = { 'name':'Sascha Georg Fuchs', 'email':'features@leankoala.com' }
const inactiveFields = []
</script>


<template>
  <div class="p-12 bg-slate-600">
    <TSXUserProfile
      :user-data="JSON.stringify(userData)"
      :inactive-fields="JSON.stringify(inactiveFields)"
      base-api-url="https://monitoring.my-hosting.world/license"
    />
  </div>
</template>

