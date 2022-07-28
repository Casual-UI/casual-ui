<script lang="ts">
  import { CToggle } from 'casual-ui-svelte'

  let on = false
  let on2 = true
</script>

<CToggle bind:value={on} label="Disabled uncheck" disabled />
<CToggle bind:value={on2} label="Disabled checked" disabled />
