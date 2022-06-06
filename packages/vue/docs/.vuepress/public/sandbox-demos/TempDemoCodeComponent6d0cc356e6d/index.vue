<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <div class="c-row c-gutter-x-md">
    <div>
      <c-input v-model="value" loading placeholder="加载中..." />
    </div>
    <div>
      <c-input v-model="value" loading placeholder="加载中...">
        <template #loading>
          <c-loading-bar color="cyan" />
        </template>
      </c-input>
    </div>
  </div>
</template>
