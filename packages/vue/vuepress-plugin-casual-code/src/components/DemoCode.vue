<script setup lang="ts">
import { ionCodeOutline } from '@quasar/extras/ionicons-v5'
import { matPlayArrow } from '@quasar/extras/material-icons'
import { ref} from 'vue'
import createSandboxApp from './createSandboxApp'
import { usePageFrontmatter } from '@vuepress/client'
import { CExpansion, CButton, CDialog, CIcon, CTooltip } from 'casual-ui-vue'

const props = withDefaults(defineProps<{
  path?: string
  content?: string
}>(), {
  path: '',
  content: ''
})

const showDialog = ref(false)

const show = ref(false)

const editorDom = ref()

const frontmatter = usePageFrontmatter()

const sandbox = ref()

let editor: any
let iframe: any
const run = () => {
  iframe.srcdoc = createSandboxApp(props.path, editor.getValue())
}

const onReplDialogOpened = () => {
  // @ts-ignore
  window.require(['vs/editor/editor.main'], function () {
    const monaco = window.monaco
    const source = (frontmatter.value.sandboxCodes as any)[props.path]
    iframe = document.createElement('iframe')
    monaco.editor.setTheme('vs-dark')
    editor = monaco.editor.create(editorDom.value, {
      value: source,
      language: 'html',
      tabSize: 4,
      lineHeight: 1.5,
    })
  
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, run)
  
    iframe.frameBorder = '0'
    iframe.width = '100%'
    iframe.style.flexGrow = '1'
    iframe.srcdoc = createSandboxApp(props.path, source)
    sandbox.value.appendChild(iframe)
  })
}
</script>
<template>
  <div class="demo-code">
    <div class="c-pa-md">
      <slot />
    </div>
    <c-expansion v-model="show">
      <template #title>
        <div class="c-flex c-items-center c-justify-between">
          <div>
            点击打开/折叠代码
          </div>
          <c-tooltip content="点击打开交互式编辑器" @click.native.stop>
            <c-button icon outlined @click="showDialog = true">
              <c-icon :content="ionCodeOutline" />
            </c-button>
          </c-tooltip>
        </div>
      </template>
      <div>
        <slot name="code" />
      </div>
    </c-expansion>
  </div>
  <c-dialog 
    v-model="showDialog" 
    :custom-style="{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }" 
    :custom-body-style="{
      backgroundColor: 'var(--c-bg)',
      flexGrow: 1,
      height: 'unset',
      overflowY: 'auto',
    }"
    :close-on-esc="false"
    width="100vw" 
    @opened="onReplDialogOpened"
  >
    <template #title>
      <c-button @click="run">
        <c-icon :content="matPlayArrow" />
        点击运行（Ctrl + S）
      </c-button>
    </template>
    <div class="c-flex repl c-items-stretch">
      <div class="editor-wrapper">
        <div class="editor" ref="editorDom">

        </div>
      </div>
      <div class="c-flex-grow c-pa-md sandbox" ref="sandbox">

      </div>
    </div>
  </c-dialog>
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
.repl {
  height: 100%;
}
.editor-wrapper {
  font-size: 14px;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.5em;
  overflow: auto;
  width: 50%;
  position: relative;
}
.editor {
  height: 100%;
}
.sandbox {
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: #fefefe;
}
</style>
