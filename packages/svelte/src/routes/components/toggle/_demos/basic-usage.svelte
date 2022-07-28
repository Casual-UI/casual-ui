<script lang="ts">
  import { CToggle } from 'casual-ui-svelte'

  let on = false
</script>

<CToggle bind:value={on} label="Open notification" />
