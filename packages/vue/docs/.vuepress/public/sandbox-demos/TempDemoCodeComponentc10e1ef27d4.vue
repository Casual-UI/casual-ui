<script setup>
import { ref } from 'vue'

const val = ref([])

const options = [
  { label: '苹果', value: 'Apple' },
  { label: '香蕉', value: 'Banana' },
  { label: '橘子', value: 'Orange' },
  { label: '桃子', value: 'Peach' },
]
</script>
<template>
  <c-checkbox-group
    v-model="val"
    :options="options"
    class="c-row c-item-center c-gutter-x-md"
  />
  <div>当前值：{{ val }}</div>
</template>
