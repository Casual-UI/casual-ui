<script context="module" lang="ts">
  throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

  // import parseDemosFromEager from '$theme/utils/parseDemosFromEager'

  // export const title = 'Tag'

  // const demos = parseDemosFromEager(
  //   import.meta.glob('./_demos/*.svelte', { eager: true })
  // )
</script>

<script lang="ts">
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import { session } from '$app/stores'
  import { browser } from '$app/env'

  // the demos rendered colored html content
  export let demosCodeHTML: any = {}

  // the components api json data
  export let componentAPI: any = {}

  // in the browser pass demos to session
  if (browser) {
    $session = { demos, componentAPI, demosCodeHTML }
  }
</script>

<svelte:head>
  <title>{title} - Casual UI</title>
</svelte:head>
