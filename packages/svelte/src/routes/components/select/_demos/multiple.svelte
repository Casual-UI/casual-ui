<script lang="ts">
  import { CSelect } from 'casual-ui-svelte'

  let selectedValue: any[] = []

  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Banana', value: 'Banana' },
    { label: 'Orange', value: 'Orange' },
    { label: 'Peach', value: 'Peach' },
  ]
</script>

<p>
  <b> Selected values: </b>
  {selectedValue}
</p>

<CSelect
  multiple
  placheholder="Select something"
  bind:value={selectedValue}
  {options}
/>
