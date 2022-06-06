<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dialog
    v-model="show"
    title="你好"
    show-confirm-btn
    show-cancel-btn
    confirm-btn-label="确认"
    cancel-btn-label="取消"
  >
    <div>你好，世界</div>
  </c-dialog>
  <c-button label="打开对话框" @click="show = true" />
</template>
