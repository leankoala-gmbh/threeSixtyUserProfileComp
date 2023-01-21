<script lang="ts" setup>
console.log('hello world')
const getLicense = async () => {
  try {
    const response = await fetch('https://monitoring.my-hosting.world/license/')
    console.log('🚀 ~ file: TabviewLicense.vue:5 ~ getLicense ~ response', JSON.stringify(response))
  } catch (error) {
    console.log('🚀 ~ file: TabviewLicense.vue:5 ~ getLicense ~ error', error)
  }
}

getLicense()
</script>

<template>
  <div class="tabviewLicense">
    <TabviewHeader>
      {{ translator('Sentence for license tab') }}
      <template #subline>
        hello world
      </template>
    </TabviewHeader>
  </div>
</template>
