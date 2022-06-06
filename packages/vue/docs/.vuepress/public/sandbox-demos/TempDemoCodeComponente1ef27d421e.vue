<script setup>
import { ref } from 'vue'
const date = ref(null)
const formattedValue = ref('')
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="超小尺寸"
      size="xs"
    />
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="小尺寸"
      size="sm"
    />
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="中等尺寸（默认）"
    />
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="大尺寸"
      size="lg"
    />
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="超大尺寸"
      size="xl"
    />
  </div>
  <p>
    <strong>date:</strong> {{ date }}
  </p>
  <p>
    <strong>formattedValue:</strong> {{ formattedValue }}
  </p>
</template>
