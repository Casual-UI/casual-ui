<script setup>
import { ref } from 'vue'
const date = ref(null)
const formattedValue = ref('')
</script>
<template>
  <c-date-picker
    v-model="date"
    v-model:formattedValue="formattedValue"
    placeholder="请选择日期"
  />
  <p>
    <strong>date:</strong> {{ date }}
  </p>
  <p>
    <strong>formattedValue:</strong> {{ formattedValue }}
  </p>
</template>
