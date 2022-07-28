<script lang="ts">
  import { CCheckboxGroup } from 'casual-ui-svelte'

  let checkedValues: any = []

  const options = [
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
    { label: 'Orange', value: 3 },
    { label: 'Peach', value: 4 },
  ]
</script>

<p>
  <b>Checked values:</b>
  {checkedValues}
</p>

<CCheckboxGroup {options} bind:value={checkedValues} />
