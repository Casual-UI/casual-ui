<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dropdown v-model="show" :width-within-parent="false">
    <c-button label="点击展开下拉" />
    <template #drop-content>
      <div class="custom-width">自定义内容宽度</div>
    </template>
  </c-dropdown>
</template>
<style scoped>
.custom-width {
  width: 400px;
  padding: 24px;
}
</style>
