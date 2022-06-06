<script setup>
import { ref } from 'vue'
const loading = ref(false)
</script>
<template>
  <c-toggle v-model="loading" label="点击打开/关闭Loading" />
  <div
    v-loading="loading"
    class="loading-container"
  >
  </div>
</template>
<style scoped>
.loading-container {
  height: 30vh;
}
</style>
