<script setup>
import { ref } from 'vue'
const val = ref('')
</script>
<template>
  <div class="c-row c-gutter-x-md c-items-center">
    <c-radio
      v-model="val"
      label="超小尺寸"
      value="xs"
      size="xs" />
    <c-radio
      v-model="val"
      label="小尺寸"
      value="sm"
      size="sm" />
    <c-radio v-model="val" label="中等尺寸（默认）" value="md" />
    <c-radio
      v-model="val"
      label="大尺寸"
      value="lg"
      size="lg" />
    <c-radio
      v-model="val"
      label="超大尺寸"
      value="xl"
      size="xl" />
  </div>
  <div class="c-mt-md">当前选中值：{{ val }}</div>
</template>
