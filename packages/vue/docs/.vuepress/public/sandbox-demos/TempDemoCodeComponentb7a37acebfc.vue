<script setup>
import { ref } from 'vue'
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()

let close = ref(null)

const onClick = () => {
  if (!close.value) {
    close.value = open({
      title: '通知',
      message: '这是一个没有关闭图标的通知',
      timeout: 0,
      closeIcon: false,
    }).close
  } else {
    close.value()
    close.value = null
  }
}
</script>
<template>
  <c-button
    :label="close ? '关闭通知' : '打开通知'"
    :theme="close ? 'negative' : 'primary'"
    @click="onClick"
  />
</template>

