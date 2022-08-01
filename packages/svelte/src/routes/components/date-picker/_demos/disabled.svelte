<script lang="ts">
  import { CDatePicker } from 'casual-ui-svelte'

  let date: Date | null = null
</script>

<CDatePicker bind:value={date} placeholder="Select date" disabled />
