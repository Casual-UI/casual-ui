<script setup lang="ts">
import { ionCopy, ionCodeOutline } from '@quasar/extras/ionicons-v5'
import {
  CIcon,
  useNotifications,
  CExpansion,
  CTooltip,
  CDialog,
} from 'casual-ui-vue'
import { onMounted, ref} from 'vue'
import { compileTemplate } from 'vue/compiler-sfc';
import createSandboxApp from './createSandboxApp'

const props = withDefaults(defineProps<{
  path?: string
  content?: string
}>(), {
  path: '',
  content: ''
})

const { open } = useNotifications()

const showReplDialog = ref(false)

const show = ref(false)

const sandbox = ref()

const editorDom = ref()

const copyCode = () => {
  // navigator.clipboard.writeText(props.code)
  open({
    title: '通知',
    message: '示例代码复制成功！',
  })
}

const customImportStatements = [`import CasualUI from 'casual-ui-vue'`]
const customAppUsageCodes = ['app.use(CasualUI)']
const customHeadTags = [
  '',
]
onMounted(() => {
  fetch(`/sandbox-demos/${props.path}.vue`).then(r => r.text()).then(r => {

    const editor = window.CodeMirror(editorDom!.value, {
      value: r,
      mode: 'htmlmixed',
      theme: 'material-darker',
      tabSize: 2,
      lineWrapping: true,
      lineNumbers: true,
      autoCloseBrackets: true,
      autoCloseTags: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    })

    const iframe = document.createElement('iframe')
    iframe.frameBorder = '0'
    iframe.srcdoc = createSandboxApp(props.path, r)
    iframe.width = '100%'
    iframe.height = '100%'
    sandbox.value.appendChild(iframe)
  })
})
</script>
<template>
  <div class="demo-code">
    <!-- <c-expansion v-model="show" title="查看/收起代码"> -->
      <div ref="sandbox" class="sandbox">

      </div>
      <div ref="editorDom" class="editor">

      </div>
      
  </div>
</template>
<style lang="scss" scoped>
.demo-code {
  position: relative;
  overflow: visible;
  .copy-btn {
    position: absolute;
    bottom: 12px;
    z-index: 9;
    font-size: 14px;
    right: 12px;
  }
}
.editor {
  font-size: 14px;
  line-height: 1.5em;
  max-height: 60vh;
  overflow: auto;
}
.sandbox {
  overflow: auto;
}
</style>
