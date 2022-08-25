<script lang="ts">
  throw new Error(
    '@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)'
  )

  import { page } from '$app/stores'
  import { browser } from '$app/env'

  // the demos rendered colored html content
  export let demosCodeHTML: any = {}

  // the components api json data
  export let componentAPI: any = {}

  // in the browser pass demos to session
  if (browser) {
    $page = { demos, componentAPI, demosCodeHTML }
  }
</script>

<svelte:head>
  <title>{title} - Casual UI</title>
</svelte:head>
