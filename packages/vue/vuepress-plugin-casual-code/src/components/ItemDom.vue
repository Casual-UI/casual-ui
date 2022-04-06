<script setup lang="ts">
defineProps<{
  value: any
}>()
</script>
<template>
  <div class="c-py-md">
    <div class="c-flex c-items-center c-gutter-sm c-wrap">
      <div>
        <c-tag size="xs" :label="value.name" />
      </div>
      <slot name="after-name" />
    </div>
    <p class="description">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span class="description" v-html="value.description"></span>
    </p>
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.description {
  margin-bottom: 0;
}
</style>
