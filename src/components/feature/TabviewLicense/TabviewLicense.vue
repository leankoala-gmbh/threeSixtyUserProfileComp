<script lang="ts" setup>
console.log('hello world')
const getLicense = async () => {
  const response = await fetch('https://monitoring.my-hosting.world/license/')
  const data = response
  console.log(data)
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
