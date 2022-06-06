<script setup>
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()

let count = 0
const openWithCount = () => {
  count++
  open({
    title: `标题${count}`,
    message: '内容',
  })
}
</script>
<template>
  <c-button label="打开通知" @click="openWithCount" />
</template>
