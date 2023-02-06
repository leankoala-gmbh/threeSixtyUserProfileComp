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
      user-email="features@leankoala.com"
      :inactive-fields="JSON.stringify(inactiveFields)"
      override-base-api-url="https://stage.monitoring360.io"
    />
  </div>
</template>

