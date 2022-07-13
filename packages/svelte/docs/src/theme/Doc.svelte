<script lang="ts">
  import sandboxHtml from './sandbox.html?raw'
  import { onMount } from 'svelte'
  import { compile } from 'svelte/compiler'
  import defaultDocCode from './defaultDocCode'

  export let code = defaultDocCode

  export let title = ''
  let editor: any

  let monacoEditorInstance: any

  let sandbox: HTMLDivElement

  const createIframe = (css: string, js: string) => {
    const iframe = document.createElement('iframe')
    iframe.style.border = 'none'
    iframe.style.width = '100%'
    iframe.style.maxHeight = '40vh'

    iframe.srcdoc = sandboxHtml
      .replace(/\/\* COMPONENT-STYLE \*\//, css)
      .replace(
        /\/\* COMPONENT-SCRIPT \*\//,
        js.replace(/export default Component;/g, '')
      )

    sandbox.innerHTML = ''
    sandbox.append(iframe)
  }

  const render = () => {
    const { css, js } = compile(monacoEditorInstance?.getValue() || code)

    createIframe(css.code, js.code.replace(/export default Component;/g, ''))
  }

  onMount(() => {
    window.require(['vs/editor/editor.main'], function () {
      const monaco = window.monaco
      monaco.editor.setTheme('vs-dark')
      monacoEditorInstance = monaco.editor.create(editor, {
        value: code,
        language: 'html',
      })

      render()

      monacoEditorInstance.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        render
      )
    })
  })
</script>

<div border-e9e9e9 border-1 rounded-2 bg-white>
  <div
    flex
    justify-between
    items-center
    bg-f9f9f9
    rounded-t-2
    pt-4
    px-4
    text-5
    font-bold
    pb-5
  >
    <div>
      {title}
    </div>
    <div text-t-2 text-3 font-400>(Ctrl/Cmd + S) to reload</div>
  </div>
  <div bind:this={editor} min-h-40 />
  <div bind:this={sandbox} />
</div>
