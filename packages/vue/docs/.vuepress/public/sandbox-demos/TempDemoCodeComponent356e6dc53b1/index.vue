<script setup>
import { ref } from 'vue'
const checked = ref(false)
</script>
<template>
  <c-toggle v-model="checked" label="打开通知" />
</template>
