<script lang="ts">
  import CButton from '$lib/components/CButton.svelte'
  import CTooltip from '$lib/components/CTooltip.svelte'
</script>

<CTooltip>
  <CButton label="Hover me" slot="trigger" />

  <h3 text-primary ws-nowrap bg-white p-4 rounded-2 shadow-md>
    Here's some custom content
  </h3>
</CTooltip>
