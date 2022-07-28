<script lang="ts">
  import { CCheckbox } from 'casual-ui-svelte'

  let checked = false

  let checked2 = true
</script>

<CCheckbox disabled bind:value={checked} label="Disabled (not check)" />
<CCheckbox disabled bind:value={checked2} label="Disabled (checked)" />
