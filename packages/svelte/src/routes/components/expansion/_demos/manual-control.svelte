<script lang="ts">
  import CButton from '$lib/components/CButton.svelte'
  import { CExpansion } from 'casual-ui-svelte'

  let expanded = false
</script>

<CButton
  rounded
  mb-4
  label="Click Me"
  on:click={() => (expanded = !expanded)}
/>
<CExpansion title="Click button above toggle expand status" bind:expanded>
  <p>Some content</p>
</CExpansion>
