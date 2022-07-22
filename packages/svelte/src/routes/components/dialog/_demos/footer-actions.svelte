<script lang="ts">
  import { CButton, CDialog } from 'casual-ui-svelte'

  let show = false

  function onCancel() {
    show = false
  }
</script>

<CButton label="Click to show dialog" on:click={() => (show = true)} />

<CDialog
  bind:show
  title="Hi, there!"
  showCancelBtn
  showConfirmBtn
  on:cancel={onCancel}
>
  some content
</CDialog>
