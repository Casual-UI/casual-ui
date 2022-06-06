<script setup>
import { useNotifications } from 'casual-ui-vue'
const { open } = useNotifications()

const openWithDynamicContent = () => {
  const { changeContent } = open({
    title: '标题',
    message: '信息',
    timeout: 7000,
  })
  setTimeout(() => {
    changeContent({
      title: '警告',
      message: '内容更改了哦',
      theme: 'warning',
    })
    setTimeout(() => {
      changeContent({
        title: '错误',
        message: '内容再次更改了哦',
        theme: 'negative',
      })
      setTimeout(() => {
        changeContent({
          title: '再见',
          message: '即将消失',
          theme: 'secondary',
        })
      }, 2000)
    }, 2000)
  }, 2000)
}
</script>
<template>
  <c-button label="打开通知" @click="openWithDynamicContent" />
</template>

