<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit'
  import parseDemosFromEager from '$theme/utils/parseDemosFromEager'

  export async function load({ fetch }: LoadEvent) {
    const res = await fetch('/components/button.json')
    const props = await res.json()
    return {
      status: res.status,
      props,
    }
  }
  export const title = 'Button'

  const demos = parseDemosFromEager(import.meta.globEager('./_demos/*.svelte'))
</script>

<script lang="ts">
  import Attension from '$theme/Attension.svelte'
  import Doc from '$theme/Doc.svelte'
  import Link from '$theme/Link.svelte'

  export let demosCodeHTML: any = {}
</script>

<svelte:head>
  <title>{title} - Casual UI</title>
</svelte:head>

<div mb-8>
  <Attension title="Notice" type="secondary">
    In this documentation the <Link
      external
      to="https://github.com/unocss/unocss"
      label="UnoCSS"
    /> is used for icon button
  </Attension>
</div>

{#each demos as { title, name, comp }}
  <Doc {title} code={demosCodeHTML[name]} component={comp} id={name} />
{/each}
