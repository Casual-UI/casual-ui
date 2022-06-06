<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-button label="点击收起/展开下拉" @click="show = !show" />
  <c-dropdown v-model="show" manual :width-within-parent="false">
    <h3>
      点击左边按钮收起/展开下拉
    </h3>
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
