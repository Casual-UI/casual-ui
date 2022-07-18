<script lang="ts">
  import CButton from '$casual/src/components/CButton.svelte'

  export let code = ''

  let copyDone = false

  function onCopy() {
    navigator.clipboard.writeText(code)
    copyDone = true
    setTimeout(() => {
      copyDone = false
    }, 3000)
  }
</script>

<div relative>
  <slot />
  <div absolute top-4 right-4>
    <CButton icon style="font-size: 1.2rem;" on:click={onCopy} outlined>
      {#if copyDone}
        <div i-material-symbols-done />
      {:else}
        <div i-material-symbols-content-copy />
      {/if}
    </CButton>
  </div>
</div>
