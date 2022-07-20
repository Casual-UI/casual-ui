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
  import SlugNav from '$theme/SlugNav.svelte'
  import { session } from '$app/stores'

  $: anchors = ($session as any).anchors || []
  export let sidebar: any = []
</script>

<DocLayout pages={sidebar}>
  <Sidebar slot="left" links={sidebar} />
  <slot />

  <SlugNav slot="right" addtionItems={anchors} />
</DocLayout>
