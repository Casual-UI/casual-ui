<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>
<template>
  <c-input v-model="inputValue" placeholder="请输入..." clearable />
</template>
