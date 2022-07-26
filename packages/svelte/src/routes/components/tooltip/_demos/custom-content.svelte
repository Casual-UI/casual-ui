<script lang="ts">
  import { CButton, CTooltip } from 'casual-ui-svelte'
</script>

<CTooltip>
  <CButton label="Hover me" slot="trigger" />

  <h3 text-primary ws-nowrap bg-white p-4 rounded-2 shadow-md>
    Here's some custom content
  </h3>
</CTooltip>
