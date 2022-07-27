<script lang="ts">
  import { CSelect } from 'casual-ui-svelte'

  let selectedValue = ''

  const options = [
    { label: 'Apple', value: '1' },
    { label: 'Banana', value: '2' },
    { label: 'Orange', value: '3' },
    { label: 'Peach', value: '4' },
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
