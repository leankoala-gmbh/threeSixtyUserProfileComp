<script lang="ts" setup>
const props = defineProps({
  baseApiUrl: {
    type: String,
    required: true
  }
})

const licenseData = ref<null|unknown>(null)

const getLicense = async () => {
  try {

    const data = await useApiAbstraction().getLicenses()
    licenseData.value = data[0]
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
    {{ licenseData }}
  </div>
</template>
