<script lang="ts">
  import sandboxHtml from './sandbox.html?raw'
  export let title = ''
  import { onMount } from 'svelte'
  import { compile } from 'svelte/compiler'
  import defaultDocCode from './defaultDocCode'

  export let code = defaultDocCode

  let editor: any

  let sandbox: HTMLDivElement

  const render = () => {
    const iframe = document.createElement('iframe')

    const { css, js } = compile(code)

    iframe.srcdoc = sandboxHtml
      .replace(/\/\* COMPONENT-STYLE \*\//, css.code)
      .replace(/\/\* COMPONENT-SCRIPT \*\//, js.code)
      .replace(/\/\* COMPONENT-INIT-SCRIPT \*\//, `import Svel`)
    iframe.style.border = 'none'
    iframe.style.width = '100%'
    iframe.style.height = '30vh'
    sandbox.append(iframe)
  }

  onMount(() => {
    window.require(['vs/editor/editor.main'], function () {
      const monaco = window.monaco
      monaco.editor.setTheme('vs-dark')
      monaco.editor.create(editor, {
        value: code,
        language: 'html',
      })
    })

    render()
  })
</script>

<div bg-white rounded-2 p-4>
  <div text-6 font-bold mb-3>
    {title}
  </div>
  <div bind:this={editor} min-h-40 />
  <div bind:this={sandbox} />
</div>
