<script lang="ts" context="module">
  import type { LoadEvent } from '@sveltejs/kit'
  export async function load({ fetch }: LoadEvent) {
    const res = await fetch('/guide/1-install/npm.json')

    const props = await res.json()

    return {
      status: res.status,
      props,
    }
  }
  export const title = 'Install'
</script>

<script lang="ts">
  import CopyBtn from '$theme/CopyBtn.svelte'
  import Doc from '$theme/Doc.svelte'
  export let installHTML = ''
  export let code = ''
  export let importStyleCode = ''
  export let importStyleHTML = ''
  export let simpleUseHTML = ''
  export let simpleUseCode = ''
</script>

<Doc title="Install" id="install">
  <CopyBtn {code}>
    {@html installHTML}
  </CopyBtn>
</Doc>

<Doc title="Import Style" id="import-styles">
  <CopyBtn code={importStyleCode}>
    {@html importStyleHTML}
  </CopyBtn>
</Doc>

<Doc title="Use in .svelte files" id="usage">
  <CopyBtn code={simpleUseCode}>
    {@html simpleUseHTML}
  </CopyBtn>
</Doc>
