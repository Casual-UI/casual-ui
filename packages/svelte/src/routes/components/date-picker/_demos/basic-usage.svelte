<script lang="ts">
  import { CDatePicker } from 'casual-ui-svelte'

  let date: Date | null = null

  let formattedDate = ''
</script>

<p>
  <b> Selected date: </b>
  {date}
</p>
<p>
  <b> Selected date formatted: </b>
  {formattedDate}
</p>

<CDatePicker
  bind:value={date}
  bind:formattedValue={formattedDate}
  placeholder="Select date "
/>
