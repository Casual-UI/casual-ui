<script lang="ts">
  import { CRadio } from 'casual-ui-svelte'

  let value = false
</script>

<CRadio bind:value label="Disabled" disabled />
