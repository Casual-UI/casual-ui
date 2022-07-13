<script lang="ts">
  import sandboxHtml from './sandbox.html?raw'
  export let title = ''
  import { onMount, tick } from 'svelte'
  import { compile } from 'svelte/compiler'
  import defaultDocCode from './defaultDocCode'

  export let code = defaultDocCode

  let editor: any

  let sandbox: HTMLDivElement

  const render = () => {
    const { css, js } = compile(editor?.getValue() || code)

    const iframe = document.createElement('iframe')
    iframe.style.border = 'none'
    iframe.style.width = '100%'
    iframe.style.maxHeight = '40vh'

    iframe.srcdoc = sandboxHtml
      .replace(/\/\* COMPONENT-STYLE \*\//, css.code)
      .replace(/\/\* COMPONENT-SCRIPT \*\//, js.code)

    sandbox.innerHTML = ''
    sandbox.append(iframe)
  }

  onMount(() => {
    window.require(['vs/editor/editor.main'], function () {
      const monaco = window.monaco
      monaco.editor.setTheme('vs-dark')
      editor = monaco.editor.create(editor, {
        value: code,
        language: 'html',
      })
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, render)
    })

    render()
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
