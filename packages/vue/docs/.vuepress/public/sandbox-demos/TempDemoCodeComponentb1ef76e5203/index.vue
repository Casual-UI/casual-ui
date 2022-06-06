<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dropdown v-model="show">
    <c-button label="点击展开下拉" />
    <template #drop-content>
      <p>一些下拉内容</p>
    </template>
  </c-dropdown>
</template>
