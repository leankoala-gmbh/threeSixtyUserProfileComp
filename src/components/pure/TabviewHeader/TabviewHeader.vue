<template>
  <header class="tabviewHeader mb-4">
    <h3 class="font-medium mb-1 text-lg">
      <slot />
    </h3>
    <p v-if="$slots.subline">
      <slot name="subline" />
    </p>
  </header>
</template>
