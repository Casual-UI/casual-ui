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
</script>

<Doc title="Install" id="install">
  <CopyBtn {code}>
    {@html installHTML}
  </CopyBtn>
</Doc>
