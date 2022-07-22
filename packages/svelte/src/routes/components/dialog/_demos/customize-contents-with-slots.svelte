<script lang="ts">
  import CButton from '$lib/components/CButton.svelte'
  import CDialog from '$lib/components/CDialog.svelte'

  let show = false
</script>

<CButton on:click={() => (show = true)} label="Click to show dialog" />

<CDialog bind:show>
  <div text-primary flex items-center slot="title">
    <div i-line-md-emoji-smile-wink text-8 mr-2 />
    <div>Hi, there</div>
  </div>

  <div i-mdi-progress-close hover:i-line-md-close slot="close-icon" />

  <div>Body content</div>

  <div slot="actions">
    <button on:click={() => (show = false)}> Custom action button </button>
  </div>
</CDialog>
