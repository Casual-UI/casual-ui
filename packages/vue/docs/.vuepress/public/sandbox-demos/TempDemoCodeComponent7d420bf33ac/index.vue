<script setup>
import { ref } from 'vue'
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const items = [
  { label: '香蕉' },
  { label: '橘子' },
  { label: '苹果' },
  { label: '葡萄' },
]
const size = ref('md')
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <div
      v-for="s in sizes"
      :key="s">
      <c-radio
        v-model="size"
        :label="s"
        :value="s" />
    </div>
  </div>
  <c-list :items="items" :size="size" />
</template>
