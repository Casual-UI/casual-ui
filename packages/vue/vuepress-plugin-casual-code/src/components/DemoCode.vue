<script setup lang="ts">
import { ionCopy, ionCodeOutline } from '@quasar/extras/ionicons-v5'
import {
  CIcon,
  useNotifications,
  CExpansion,
  CTooltip,
  CDialog,
} from 'casual-ui-vue'
import { ref } from 'vue'
import { Repl, ReplStore, File } from 'casual-vue-repl'
import App from './App'

const { open } = useNotifications()

const showReplDialog = ref(false)

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

const store = ref<ReplStore | null>(null)
const showRepl = ref(false)
const openRepl = () => {
  const codeContent =
    codeDom.value?.querySelector('pre.language-vue')?.textContent || ''
  store.value = new ReplStore()
  store.value.setImportMap({
    imports: {
      '@quasar/extras/material-icons':
        'https://unpkg.com/@quasar/extras/material-icons/index.mjs',
      'casual-ui-vue':
        'https://unpkg.com/casual-ui-vue/dist/casual-ui-vue.es.js',
    },
  })
  store.value.addFile(new File('App.vue', `${codeContent}\n${App}`))
  showReplDialog.value = true
}

const onReplDialogOpened = () => {
  showRepl.value = true
  setTimeout(() => {
    const iframe = document.querySelector<any>('.vue-repl iframe')
    if (iframe) {
      iframe.offsetHeight
    }
  }, 300)
}

const customImportStatements = [`import CasualUI from 'casual-ui-vue'`]
const customAppUsageCodes = ['app.use(CasualUI)']
const customHeadTags = [
  '<link rel="stylesheet" href="https://unpkg.com/casual-ui-vue/dist/style.css">',
]
</script>
<template>
  <div ref="codeDom" class="demo-code">
    <c-expansion v-model="show" title="查看/收起代码">
      <slot />
      <c-tooltip v-if="show" content="复制代码" class="copy-btn">
        <c-button icon outlined @click="copyCode">
          <c-icon :content="ionCopy" class="icon" />
        </c-button>
      </c-tooltip>
      <c-tooltip position="left" content="打开交互式Vue编辑器" class="repl-btn">
        <c-button icon outlined @click="openRepl">
          <c-icon :content="ionCodeOutline" />
        </c-button>
      </c-tooltip>
    </c-expansion>
    <c-dialog
      v-model="showReplDialog"
      title="在线示例"
      :custom-style="{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }"
      :custom-body-style="{
        flexGrow: 1,
        height: 'unset',
        overflowY: 'auto',
      }"
      width="100vw"
      @opened="onReplDialogOpened"
    >
      <Repl
        v-if="showRepl"
        class="vue-repl-container"
        :store="store"
        :custom-import-statements="customImportStatements"
        :custom-app-usage-codes="customAppUsageCodes"
        :custom-head-tags="customHeadTags"
        :clear-console="false"
      />
    </c-dialog>
  </div>
</template>
<style lang="scss" scoped>
.demo-code {
  position: relative;
  overflow: visible;
  .copy-btn,
  .repl-btn {
    position: absolute;
    bottom: 12px;
    z-index: 9;
    font-size: 14px;
  }
  .copy-btn {
    right: 12px;
  }
  .repl-btn {
    right: 48px;
  }
}
.vue-repl-container {
  height: 100%;
  overflow: auto;
}
:deep(.split-pane .left) {
  display: flex;
  flex-direction: column;
}
:deep(.file-selector) {
  flex-shrink: 0;
}
:deep(.editor-container) {
  flex-grow: 1;
  overflow: auto;
}
</style>
