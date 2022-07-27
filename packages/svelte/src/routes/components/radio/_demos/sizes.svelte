<script lang="ts">
  import { CRadio } from 'casual-ui-svelte'

  let size = 'md'
</script>

<p>
  <b>Selected size: </b>
  {size}
</p>

<div class="c-flex c-gutter-md c-wrap c-items-center">
  <div>
    <CRadio bind:value={size} label="xs" selectedValue="xs" size="xs" />
  </div>
  <div>
    <CRadio bind:value={size} label="sm" selectedValue="sm" size="sm" />
  </div>
  <div>
    <CRadio bind:value={size} label="md (default)" selectedValue="md" />
  </div>
  <div>
    <CRadio bind:value={size} label="lg" selectedValue="lg" size="lg" />
  </div>
  <div>
    <CRadio bind:value={size} label="xl" selectedValue="xl" size="xl" />
  </div>
</div>
