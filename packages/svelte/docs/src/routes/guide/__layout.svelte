<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit'
  export async function load({ fetch }: LoadEvent) {
    const res = await fetch('/guide.json')

    const props = await res.json()
    return {
      status: res.status,
      props,
    }
  }
</script>

<script lang="ts">
  import DocLayout from '$theme/DocLayout.svelte'
  import Sidebar from '$theme/Sidebar.svelte'

  export let sidebar: any = []
</script>

<DocLayout>
  <Sidebar slot="left" links={sidebar} />
  <slot />
</DocLayout>
