<script context="module" lang="ts">
  throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

  // import parseDemosFromEager from '$theme/utils/parseDemosFromEager'

  // export const title = 'Tabs'

  // const demos = parseDemosFromEager(
  //   import.meta.glob('./_demos/*.svelte', { eager: true })
  // )
</script>

<script lang="ts">
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import { session } from '$app/stores'
  import { browser } from '$app/env'

  export let componentAPI: any = {}
  export let demosCodeHTML: any = {}

  if (browser) {
    $session = { demos, demosCodeHTML, componentAPI }
  }
</script>

<svelte:head>
  <title>{title} - Casual UI Svelte</title>
</svelte:head>
