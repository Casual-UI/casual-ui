<script setup>
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()

const openWithTheme = (theme) => {
  open({
    title: `${theme}主题`,
    message: '内容',
    theme,
  })
}
</script>
<template>
  <div class="c-row c-items-center c-wrap c-gutter-md">
    <div>
      <c-button label="打开通知" @click="openWithTheme('primary')" />
    </div>
    <div>
      <c-button
        theme="secondary"
        label="打开通知"
        @click="openWithTheme('secondary')"
      />
    </div>
    <div>
      <c-button
        theme="warning"
        label="打开通知"
        @click="openWithTheme('warning')"
      />
    </div>
    <div>
      <c-button
        theme="negative"
        label="打开通知"
        @click="openWithTheme('negative')"
      />
    </div>
  </div>
</template>
