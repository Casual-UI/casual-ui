<script context="module" lang="ts">
  export const title = 'Button'
  import basic from './_demos/basic.svelte?raw'
</script>

<script lang="ts">
  import Doc from '$theme/Doc.svelte'
</script>

<svelte:head>
  <title>{title} - Casual UI</title>
</svelte:head>

<Doc title="Basic Usage" code={basic} />
