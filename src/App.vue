<script lang="ts" setup>
import TSXUserProfile from './components/feature/TSXUserProfile/TSXUserProfile.ce.vue'

const userData = {
  avatar: 'sf',
  email: 'gisu2onic@gmail.com'
}
const inactiveFields = []
</script>


<template>
  <div class="p-12">
    <TSXUserProfile :user-data="JSON.stringify(userData)" :inactive-fields="JSON.stringify(inactiveFields)" />
  </div>
</template>

