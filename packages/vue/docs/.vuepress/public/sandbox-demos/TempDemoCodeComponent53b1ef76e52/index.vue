<script setup>
import { ref } from 'vue'

const selectedValue = ref([])

const options = [
  { label: '0 - 50', value: 0 },
  { label: '50 - 100', value: 1 },
  { label: '100 - 200', value: 2 },
  { label: '200 - 500', value: 3 },
  { label: '500 - 1000', value: 4 },
]
</script>
<template>
  <c-select
    v-model="selectedValue"
    placeholder="请选择"
    :options="options"
    clearable
    multiple
  />
</template>
