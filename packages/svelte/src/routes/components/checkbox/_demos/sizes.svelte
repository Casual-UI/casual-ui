<script lang="ts">
  import { CCheckbox } from 'casual-ui-svelte'

  let checked = 'md'
</script>

<div class="c-flex c-gutter-x-md c-wrap c-items-center">
  <div>
    <CCheckbox bind:value={checked} label="xs" size="xs" checkedValue="xs" />
  </div>
  <div>
    <CCheckbox bind:value={checked} label="sm" size="sm" checkedValue="sm" />
  </div>
  <div>
    <CCheckbox
      bind:value={checked}
      label="md (default)"
      size="md"
      checkedValue="md"
    />
  </div>
  <div>
    <CCheckbox bind:value={checked} label="lg" size="lg" checkedValue="lg" />
  </div>
  <div>
    <CCheckbox bind:value={checked} label="xl" size="xl" checkedValue="xl" />
  </div>
</div>
