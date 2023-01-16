<script lang="ts" setup>
import { translator } from '@/composables/translator'
import TabviewHeader from '@/components/pure/TabviewHeader/TabviewHeader.vue'
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
