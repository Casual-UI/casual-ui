<script setup>
import { ref } from 'vue'
import { matPeople } from '@quasar/extras/material-icons'
const show = ref(false)
</script>
<template>
  <c-dialog v-model="show">
    <template #title>
      <img class="title-icon" src="/logo-dark.svg" />
    </template>
    <template #close-icon>
      <c-icon :content="matPeople" />
    </template>
    <template #footer-actions>
      <div>
        <c-button
          size="sm"
          label="关闭"
          theme="negative"
          @click="show = false"
        />
        <c-button
          size="sm"
          label="关闭"
          theme="warning"
          @click="show = false"
        />
      </div>
    </template>
  </c-dialog>
  <c-button label="打开对话框" @click="show = true" />
</template>
<style scoped>
.title-icon {
  width: 80px;
}
</style>
