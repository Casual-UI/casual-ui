<script setup lang="ts">
withDefaults(
  defineProps<{
    value: any
    descWrap?: boolean
    nameFormatter?: (value: any) => string
    descFormatter?: (value: any) => string
  }>(),
  {
    descWrap: true,
    nameFormatter: (value: any) => value.name,
    descFormatter: (value: any) => value.description,
  }
)
</script>
<template>
  <div class="c-pt-sm">
    <div class="c-flex c-items-center c-gutter-sm c-wrap">
      <div>
        <c-tag size="xs" :label="nameFormatter(value)" />
      </div>
      <slot name="after-name" />
      <span
        v-if="!descWrap"
        class="description"
        v-html="descFormatter(value)"
      ></span>
    </div>
    <p v-if="descWrap" class="description">
      <span class="description" v-html="descFormatter(value)"></span>
    </p>
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.description {
  margin-bottom: 0;
}
</style>
