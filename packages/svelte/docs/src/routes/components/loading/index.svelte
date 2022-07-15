<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit'
  import parseDemosFromEager from '$theme/utils/parseDemosFromEager'

  export async function load({ fetch }: LoadEvent) {
    const res = await fetch('/components/loading.json')
    const props = await res.json()
    return {
      status: res.status,
      props,
    }
  }
  export const title = 'Loading'

  const demos = parseDemosFromEager(import.meta.globEager('./_demos/*.svelte'))
</script>

<script lang="ts">
  import Doc from '$theme/Doc.svelte'

  export let demosCodeHTML: any = {}
</script>

<svelte:head>
  <title>{title} - Casual UI</title>
</svelte:head>

{#each demos as { title, name, comp }}
  <Doc {title} code={demosCodeHTML[name]} component={comp} id={name} />
{/each}
