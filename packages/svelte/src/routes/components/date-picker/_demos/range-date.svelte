<script lang="ts">
  import { CDatePicker } from 'casual-ui-svelte'

  let rangeValue: [Date | null, Date | null] = [null, null]

  let rangeFormattedValue: [string, string] = ['', '']
</script>

<p>
  <b> Selected date range: </b>
  {rangeValue}
</p>
<p>
  <b> Selected date range formatted: </b>
  {rangeFormattedValue}
</p>

<CDatePicker
  bind:rangeValue
  bind:formattedRangeValue={rangeFormattedValue}
  placeholder="Select date range"
  range
/>
