<script lang="ts">
  import { CSelect } from 'casual-ui-svelte'

  let selectedValue = ''

  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Banana', value: 'Banana' },
    { label: 'Orange', value: 'Orange' },
    { label: 'Peach', value: 'Peach' },
  ]
</script>

<p>
  <b> Selected value: </b>
  {selectedValue}
</p>

<CSelect
  clearable
  placheholder="Clearable"
  bind:value={selectedValue}
  {options}
/>
