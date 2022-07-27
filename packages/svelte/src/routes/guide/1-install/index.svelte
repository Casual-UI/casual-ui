<script lang="ts" context="module">
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

<Doc title="Install" id="install" hideSandboxIcon hideEditIcon>
  <CopyBtn {code}>
    {@html installHTML}
  </CopyBtn>
</Doc>

<Doc title="Import Style" id="import-styles" hideSandboxIcon hideEditIcon>
  <CopyBtn code={importStyleCode}>
    {@html importStyleHTML}
  </CopyBtn>
</Doc>

<Doc title="Use in .svelte files" id="usage" hideSandboxIcon hideEditIcon>
  <CopyBtn code={simpleUseCode}>
    {@html simpleUseHTML}
  </CopyBtn>
</Doc>
