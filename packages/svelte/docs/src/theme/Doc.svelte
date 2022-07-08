<script lang="ts">
  export let title = ''
  import { onMount } from 'svelte'

  export let code = '<h3>Hello world</h3>'

  let editor: any

  onMount(() => {
    window.require(['vs/editor/editor.main'], function () {
      const monaco = window.monaco
      monaco.editor.setTheme('vs-dark')
      monaco.editor.create(editor, {
        value: code,
        language: 'html',
      })
    })
  })
</script>

<div>
  <h3>
    {title}
  </h3>
  <div bind:this={editor} min-h-100 />
</div>
