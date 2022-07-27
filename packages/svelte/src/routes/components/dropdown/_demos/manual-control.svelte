<script lang="ts">
  import { CButton, CDropdown } from 'casual-ui-svelte'
  let show = false
</script>

<CButton label="Click to show dropdown" on:click={() => (show = !show)} />

<CDropdown manual bind:show>
  <div>Click the left button to show dropdown</div>
  <div slot="drop-content" p-4>Here's some drop content</div>
</CDropdown>
