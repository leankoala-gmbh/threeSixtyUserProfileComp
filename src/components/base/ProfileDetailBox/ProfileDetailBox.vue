<script lang="ts" setup>
const props = defineProps({
  withHover: {
    type: Boolean,
    default: true
  },
  isExpandable: {
    type: Boolean,
    default: true
  },
  headingForClosing: {
    type: String,
    default: 'blah blah blah'
  }
})

const isOpen = ref(true)
</script>

<template>
  <div class="profileDetail rounded px-6">
    <div class="py-6 flex justify-between items-center">
      <div
        v-if="!isOpen"
        :class="[
          withHover ? 'profilDetail--hover' : ''
        ]"
      >
        <slot>hello</slot>
      </div>
      <ProfileBoxHeader v-else>
        {{ headingForClosing }}
      </ProfileBoxHeader>
    </div>
    <div
      v-if="isExpandable"
      class="pb-6"
      :class="[
        isExpandable ? 'expandable' : '',
      ]"
    >
      <slot name="main" />
    </div>
  </div>
</template>

