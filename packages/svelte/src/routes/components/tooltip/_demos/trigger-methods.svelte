<script lang="ts">
  import { CButton, CTooltip } from 'casual-ui-svelte'

  let show = false
</script>

<p>Hover (default)</p>
<CTooltip content="Hi, there">
  <CButton slot="trigger" label="Hover Me" />
</CTooltip>

<p>Click</p>
<CTooltip content="Hi, there" trigger="click">
  <CButton label="Click Me" slot="trigger" />
</CTooltip>

<p>Manual</p>

<CButton label="Click Me" on:click={() => (show = !show)} />

<CTooltip bind:show content="Hi, there" trigger="manual">
  <p slot="trigger">Click the left button to toggle</p>
</CTooltip>
