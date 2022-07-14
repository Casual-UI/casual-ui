<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit'

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  export async function load({ fetch }: LoadEvent) {
    const res = await fetch('/components/button.json')
    const props = await res.json()
    return {
      status: res.status,
      props,
    }
  }
  export const title = 'Button'

  const demos = Object.entries(import.meta.globEager('./_demos/*.svelte')).map(
    ([k, v]) => {
      const name = k.replace(/(^\.\/_demos\/)|(\.svelte$)/g, '') as string
      return {
        name,
        title: name.split('-').map(capitalizeFirstLetter).join(' '),
        comp: v.default,
      }
    }
  )
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
