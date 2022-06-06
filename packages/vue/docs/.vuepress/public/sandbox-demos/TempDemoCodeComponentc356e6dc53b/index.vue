<script setup>
import { ref } from 'vue'

const selectedFruit = ref('Apple')
const fruits = [
  { label: '苹果', value: 'Apple' },
  { label: '香蕉', value: 'Banana' },
  { label: '桃子', value: 'Peach' },
  { label: '葡萄', value: 'Grape' },
]
</script>
<template>
  {{ selectedFruit }}
  <c-radio-group v-model="selectedFruit" :options="fruits" />
</template>
