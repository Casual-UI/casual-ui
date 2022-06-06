<script setup>
import { ref } from 'vue'
const loading = ref(false)
const loadingConf = {
  fontSize: '4rem',
  color: 'cyan',
  backgroundColor: 'rgba(0, 0, 0, .7)'
}
</script>
<template>
  <c-toggle v-model="loading" label="点击打开/关闭Loading" />
  <div
    v-loading:[loadingConf]="loading"
    class="loading-container"
  >
  </div>
</template>
<style lang="scss" scoped>
.loading-container {
  height: 30vh;
}
</style>
