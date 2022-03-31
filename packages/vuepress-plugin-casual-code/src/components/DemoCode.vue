<script setup lang="ts">
import { ionCopy } from '@quasar/extras/ionicons-v5'
import { CIcon, useNotifications } from 'casual-ui-vue'
import { ref } from 'vue'

const { open } = useNotifications()

const show = ref(false)

const codeDom = ref<HTMLDivElement | null>(null)

const copyCode = () => {
  const codeTag = codeDom.value?.querySelector('pre.language-vue')
  navigator.clipboard.writeText(codeTag?.textContent || '')
  open({
    title: '通知',
    message: '示例代码复制成功！',
  })
}
</script>
<template>
  <div ref="codeDom" class="demo-code">
    <c-expansion v-model="show" title="查看/收起代码">
      <slot />
      <c-button v-if="show" icon outlined class="copy-btn" @click="copyCode">
        <c-icon :content="ionCopy" class="icon" />
      </c-button>
    </c-expansion>
  </div>
</template>
<style lang="scss" scoped>
.demo-code {
  position: relative;
  .copy-btn {
    position: absolute;
    bottom: 12px;
    z-index: 9;
    right: 12px;
    font-size: 18px;
  }
}
</style>
