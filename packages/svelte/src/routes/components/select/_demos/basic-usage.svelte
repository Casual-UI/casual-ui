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

<div class="c-flex c-gutter-md c-wrap">
  <div flex items-center>
    <b mr-2> Normal </b>
    <CSelect
      placheholder="Select something"
      bind:value={selectedValue}
      {options}
    />
  </div>
  <div flex items-center>
    <b mr-2> Rounded </b>
    <CSelect
      placheholder="Select something"
      rounded
      bind:value={selectedValue}
      {options}
    />
  </div>
  <div flex items-center>
    <b mr-2> Disabled </b>
    <CSelect
      placheholder="Select something"
      disabled
      bind:value={selectedValue}
      {options}
    />
  </div>
</div>
