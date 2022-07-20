<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit'
  import parseDemosFromEager from '$theme/utils/parseDemosFromEager'
  import { session } from '$app/stores'
  import { browser } from '$app/env'

  export async function load({ fetch }: LoadEvent) {
    const res = await fetch('/components/tooltip.json')
    const props = await res.json()
    return {
      status: res.status,
      props,
    }
  }
  export const title = 'Tooltip'

  const demos = parseDemosFromEager(
    import.meta.glob('./_demos/*.svelte', { eager: true })
  )
</script>

<script lang="ts">
  export let demosCodeHTML: any = {}

  export let componentAPI: any = {}

  if (browser) {
    $session = { demos, demosCodeHTML, componentAPI }
  }
</script>

<svelte:head>
  <title>{title} - Casual UI Svelte</title>
</svelte:head>
