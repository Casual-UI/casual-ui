<script lang="ts">
  import { CDatePicker } from 'casual-ui-svelte'

  let date: Date | null = null
</script>

<div class="c-flex c-items-center c-gutter-md c-wrap">
  <div>
    <CDatePicker size="xs" bind:value={date} placeholder="xs" />
  </div>
  <div>
    <CDatePicker size="sm" bind:value={date} placeholder="sm" />
  </div>
  <div>
    <CDatePicker bind:value={date} placeholder="md (default)" />
  </div>
  <div>
    <CDatePicker size="lg" bind:value={date} placeholder="lg" />
  </div>
  <div>
    <CDatePicker size="xl" bind:value={date} placeholder="xl" />
  </div>
</div>
