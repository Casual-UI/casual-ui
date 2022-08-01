<script lang="ts">
  import { CDatePicker } from 'casual-ui-svelte'

  let rangeValue: [Date | null, Date | null] = [null, null]
</script>

<CDatePicker {rangeValue} placeholder="Select date range" range />
