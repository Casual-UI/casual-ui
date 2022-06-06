<script setup>
import { ref } from 'vue'
const val = ref('md')
</script>
<template>
  <div class="c-row c-gutter-md c-items-center">
    <c-checkbox
      v-model="val"
      checked-value="xs"
      size="xs"
      label="超小尺寸" />
    <c-checkbox
      v-model="val"
      checked-value="sm"
      size="sm"
      label="小尺寸" />
    <c-checkbox v-model="val" checked-value="md" label="中等尺寸（默认）" />
    <c-checkbox
      v-model="val"
      checked-value="lg"
      size="lg"
      label="大尺寸" />
    <c-checkbox
      v-model="val"
      checked-value="xl"
      size="xl"
      label="超大尺寸" />
  </div>
  <div>当前值：{{ val }}</div>
</template>
