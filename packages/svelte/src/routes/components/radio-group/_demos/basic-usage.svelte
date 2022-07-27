<script lang="ts">
  import { CRadioGroup } from 'casual-ui-svelte'

  let fruite = ''

  const options = [
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
    { label: 'Orange', value: 3 },
    { label: 'Peach', value: 4 },
  ]
</script>

<p>
  <b> Selected fruite: </b>
  {fruite}
</p>

<CRadioGroup bind:value={fruite} {options} />
