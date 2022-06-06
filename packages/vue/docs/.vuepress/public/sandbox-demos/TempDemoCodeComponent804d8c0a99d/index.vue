<script setup>
import { ref } from 'vue'
const date1 = ref(null)
const date2 = ref(new Date())
</script>
<template>
  <c-date-picker v-model="date1" disabled />
  <c-date-picker v-model="date2" disabled class="c-ml-md" />
</template>
