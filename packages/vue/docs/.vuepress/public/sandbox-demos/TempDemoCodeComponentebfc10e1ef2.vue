<script setup>
import { ref } from 'vue'
const val = ref(false)
</script>
<template>
  <c-checkbox v-model="val" label="同意协议" />
</template>
