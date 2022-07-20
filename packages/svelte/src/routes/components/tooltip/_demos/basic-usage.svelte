<script lang="ts">
  import CButton from '$lib/components/CButton.svelte'
  import CTooltip from '$lib/components/CTooltip.svelte'
</script>

<CTooltip content="Hi, there!">
  <CButton label="Hover Me" slot="trigger" />
</CTooltip>
