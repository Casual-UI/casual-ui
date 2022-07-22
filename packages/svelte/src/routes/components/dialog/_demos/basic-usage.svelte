<script lang="ts">
  import { CButton, CDialog } from 'casual-ui-svelte'

  let show = false
</script>

<CButton label="Click to show dialog" on:click={() => (show = true)} />

<CDialog bind:show title="Hi, there!">some content</CDialog>
