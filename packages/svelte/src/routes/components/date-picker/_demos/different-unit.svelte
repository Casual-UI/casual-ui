<script lang="ts">
  import { CDatePicker } from 'casual-ui-svelte'

  let month: Date | null = null

  let formattedMonth = ''

  let year: Date | null = null

  let yearFormatted = ''
</script>

<p>
  <b> Selected month: </b>
  {month}
</p>
<p>
  <b> Selected month formatted: </b>
  {formattedMonth}
</p>

<CDatePicker
  bind:value={month}
  bind:formattedValue={formattedMonth}
  format="MM/YYYY"
  unit="month"
  placeholder="Select month"
/>

<p>
  <b> Selected year: </b>
  {year}
</p>
<p>
  <b> Selected year formatted: </b>
  {yearFormatted}
</p>

<CDatePicker
  bind:value={year}
  bind:formattedValue={yearFormatted}
  format="YYYY"
  unit="year"
  placeholder="Select year"
/>
