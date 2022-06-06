<script setup>
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()
</script>
<template>
  <c-button
    label="打开通知"
    @click="
      open({
        title: '通知',
        message: '这是一个不会自动关闭的通知',
        timeout: 0,
        alignX: 'end',
        alignY: 'center',
      })
    "
  />
</template>
