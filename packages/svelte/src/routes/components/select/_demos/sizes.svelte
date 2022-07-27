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
<div class="c-flex c-gutter-md c-wrap c-items-center">
  <div>
    <CSelect bind:value={selectedValue} {options} placheholder="xs" size="xs" />
  </div>
  <div>
    <CSelect bind:value={selectedValue} {options} placheholder="sm" size="sm" />
  </div>
  <div>
    <CSelect bind:value={selectedValue} {options} placheholder="md (default)" />
  </div>
  <div>
    <CSelect bind:value={selectedValue} {options} placheholder="lg" size="lg" />
  </div>
  <div>
    <CSelect bind:value={selectedValue} {options} placheholder="xl" size="xl" />
  </div>
</div>
