<script setup lang="ts">
withDefaults(
  defineProps<{
    value: any
    descWrap?: boolean
  }>(),
  {
    descWrap: true,
  }
)
</script>
<template>
  <div class="c-pt-sm">
    <div class="c-flex c-items-center c-gutter-sm c-wrap">
      <div>
        <c-tag size="xs" :label="value.name" />
      </div>
      <slot name="after-name" />
      <span
        v-if="!descWrap"
        class="description"
        v-html="value.description"
      ></span>
    </div>
    <p v-if="descWrap" class="description">
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
