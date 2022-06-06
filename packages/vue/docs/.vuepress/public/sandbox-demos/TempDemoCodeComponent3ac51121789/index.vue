<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dialog
    v-model="show"
    title="你好"
    width="60vw"
    body-height="60vh"
    :close-icon="false"
  >
    <div>你好，世界</div>
  </c-dialog>
  <c-button label="打开对话框（按esc键关闭）" @click="show = true" />
</template>
