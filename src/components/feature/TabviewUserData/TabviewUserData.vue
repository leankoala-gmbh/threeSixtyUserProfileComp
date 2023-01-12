<script lang="ts">
import { translator } from '@/composables/translator'
import { defineComponent } from 'vue'

export default defineComponent({
  methods: { translator }
})

</script>

<template>
  <div>
    <h3 class="mb-4 font-medium">
      {{ translator('Change your First and Lastname') }}
    </h3>
    <form @submit="submitName">
      <div class="tsxUp-grid-formRow items-center mb-6">
        <div>{{ translator('Firstname') }}</div>
        <div><input type="text" class="border p-2 w-full"></div>
      </div>
      <div class="tsxUp-grid-formRow items-center mb-6">
        <div>{{ translator('Lastname') }}</div>
        <div><input type="text" class="border p-2 w-full"></div>
      </div>
    </form>
  </div>
</template>
