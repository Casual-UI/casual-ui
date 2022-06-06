<script setup>
import { ref } from 'vue'
const items = [
  { label: '香蕉' },
  { label: '橘子' },
  { label: '苹果' },
  { label: '葡萄' },
]
const activeItem = ref('香蕉')
</script>
<template>
  <c-list
    :items="items"
    clickable
    :active-fn="item => item.label === activeItem"
    @item-click="item => activeItem = item.label" />
</template>
