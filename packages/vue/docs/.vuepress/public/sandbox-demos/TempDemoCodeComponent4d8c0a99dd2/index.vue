<script setup>
import { ref } from 'vue'
const dateRange = ref([null, null])
const formattedRange = ref(['', ''])
</script>
<template>
  <c-date-picker
    v-model:dateRange="dateRange"
    v-model:formattedDateRange="formattedRange"
    range
    placeholder="请选择日期段"
  />
  <p>
    <strong>dateRange:</strong> {{ dateRange }}
  </p>
  <p>
    <strong>formattedRange:</strong> {{ formattedRange }}
  </p>
</template>
